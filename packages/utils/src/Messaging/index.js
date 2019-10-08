import moment from 'moment';

export const DEFAULT_LANGUAGE_ID = 1;
export const DEFAULT_TIMEOUT = 300000;
export const DEFAULT_URL = '';
export const DEFAULT_PATH = '/messaging/';
export const DEFAULT_VERSION_PATH = 'MessagingVersions.json';
export const DEFAULT_FILE_NAME_FORMAT = 'BOA.Messaging.{0}.json';
export const DEFAULT_THRESOLD = 1; // minutes

const store = { versions: [], messages: {} };

const messagingOptions = {
  url: DEFAULT_URL,
  path: DEFAULT_PATH,
  versionPath: DEFAULT_VERSION_PATH,
  fileNameFormat: DEFAULT_FILE_NAME_FORMAT,
  timeout: DEFAULT_TIMEOUT,
  languageId: DEFAULT_LANGUAGE_ID,
  refreshThresold: DEFAULT_THRESOLD,
};

function isCrossDomain() {
  return messagingOptions.url !== DEFAULT_URL;
}

function getUrl(path) {
  return isCrossDomain() ? messagingOptions.url + path : path;
}

export function serviceCallSync(request) {
  const result = { data: null, isSuccess: false, error: null };
  const path = request.baseUrl + request.servicePath;
  const requestString = JSON.stringify(request.data);
  const requestObj = {
    url: getUrl(path),
    data: requestString,
    type: request.method,
    timeout: messagingOptions.timeout,
    async: false,
    crossDomain: isCrossDomain(),
    cache: request.cache,
    processData: false,
    dataType: request.dataType || 'json',
    contentType: 'application/json; charset=utf-8',
    headers: request.headers,
    success(response) {
      result.isSuccess = true;
      result.data = response;
    },
    error(jqXhr, textStatus, errorThrown) {
      result.isSuccess = false;
      result.error = errorThrown;
    },
  };

  $.ajax(requestObj); // eslint-disable-line no-undef
  return result;
}

function getMessagesVersion() {
  const now = new Date();
  // eslint-disable-next-line max-len
  const dateString = `${now.getFullYear()}.${now.getMonth()}.${now.getDate()}.${now.getHours()}.${now.getMinutes()}`;

  const request = {
    servicePath: `${messagingOptions.versionPath}?v=${dateString}`,
    baseUrl: messagingOptions.path,
    async: false,
    cache: true,
    method: 'GET',
  };

  const response = serviceCallSync(request);
  if (response.isSuccess) {
    store.lastReadDate = now;
  }
  return response;
}

function getVersionOfMessagingGroup(groupName) {
  if (store.versions && store.versions.length > 0) {
    const group = store.versions.find(x => x.ClassName === groupName);
    return group ? group.Version : undefined;
  }
  return null;
}

function loadMessagesByGroup(groupName, languageId) {
  const version = getVersionOfMessagingGroup(groupName);
  const fileName = `${messagingOptions.fileNameFormat.replace('{0}', groupName)}?v=${version}`;
  let baseUrl = messagingOptions.path;

  switch (languageId) {
    case 1:
      baseUrl += 'tr/';
      break;
    /* istanbul ignore next */
    case 2:
      baseUrl += 'en/';
      break;
    /* istanbul ignore next */
    case 3:
      baseUrl += 'de/';
      break;
    /* istanbul ignore next */
    case 4:
      baseUrl += 'ru/';
      break;
    /* istanbul ignore next */
    case 5:
      baseUrl += 'ar/';
      break;
    /* istanbul ignore next */
    default:
      baseUrl += 'en/';
  }

  const request = {
    servicePath: fileName,
    baseUrl,
    async: false,
    cache: true,
    method: 'GET',
  };

  const responseLanguage = serviceCallSync(request);

  if (responseLanguage.isSuccess) {
    if (!store.messages[groupName]) {
      store.messages[groupName] = {};
    }
    store.messages[groupName][languageId] = responseLanguage.data;
  }
}

function isVersionCheckRequired() {
  if (!store.versions || store.versions.length === 0) return true;
  let lastReadDate = store.lastReadDate;
  lastReadDate = moment(lastReadDate)
    .add(messagingOptions.refreshThresold, 'm')
    .toDate();
  return lastReadDate < new Date();
}

function getMessageFromCache(groupName, propertyName, languageId) {
  const messages = store.messages;
  const messageGroup = messages && messages[groupName] ? messages[groupName] : null;

  if (messages && messageGroup && messageGroup[languageId]) {
    const message = messageGroup[languageId].find(x => x.PropertyName === propertyName);
    if (message) {
      return message;
    }
  }
  return null;
}

export function setMessagingOptions(options) {
  /* istanbul ignore next */
  if (options) {
    const newOptions = Object.assign({}, messagingOptions, options);
    messagingOptions.url = newOptions.url || DEFAULT_URL;
    messagingOptions.path = newOptions.path || DEFAULT_PATH;
    messagingOptions.versionPath = newOptions.versionPath || DEFAULT_VERSION_PATH;
    messagingOptions.fileNameFormat = newOptions.fileNameFormat || DEFAULT_FILE_NAME_FORMAT;
    messagingOptions.timeout = newOptions.timeout || DEFAULT_TIMEOUT;
    messagingOptions.languageId = newOptions.languageId || DEFAULT_LANGUAGE_ID;
    messagingOptions.refreshThresold = newOptions.refreshThresold || DEFAULT_THRESOLD;
    messagingOptions.localMessages = newOptions.localMessages;
  }
}

export function getMessage(groupName, propertyName, languageId) {
  const versionCheckRequired = isVersionCheckRequired();
  let messagesRefreshRequired = false;
  let clientVersion;
  let serverVersion;

  if (!languageId) {
    languageId = messagingOptions.languageId;
  }

  if (messagingOptions.localMessages) {
    // eslint-disable-next-line
    const messageGroup = messagingOptions.localMessages[groupName];
    if (messageGroup) {
      const message = messageGroup.find(
        x =>
          x.PropertyName === propertyName &&
          x.LanguageId === languageId,
      );
      /* istanbul ignore next */
      if (message) {
        return message;
      }
    }
  }

  if (versionCheckRequired) {
    const responseVersion = getMessagesVersion();
    if (!responseVersion.isSuccess) {
      return getMessageFromCache(groupName, propertyName, languageId) ||
        { Description: `${groupName}.${propertyName}`, Code: propertyName };
    }

    const responseGroup = responseVersion.data.find(x => x.ClassName === groupName);
    clientVersion = getVersionOfMessagingGroup(messagingOptions.store, groupName);
    serverVersion = responseGroup && responseGroup.Version ? responseGroup.Version : -1;
    messagesRefreshRequired = clientVersion !== serverVersion;
    if (messagesRefreshRequired && responseVersion.data && responseVersion.data.length > 0) {
      store.versions = responseVersion.data;
    }
  }

  const messages = store.messages;
  let messageGroup = messages && messages[groupName] ? messages[groupName] : null;
  const messagesNotExists = !messages || !messageGroup;
  const languageNotExists = messages && messageGroup && messageGroup[languageId] === undefined;

  if (messagesNotExists || languageNotExists || messagesRefreshRequired) {
    loadMessagesByGroup(groupName, languageId);
    messageGroup = messages && messages[groupName] ? messages[groupName] : null;
  }

  return getMessageFromCache(groupName, propertyName, languageId)
    || { Description: `${groupName}.${propertyName}` };
}

export function clearMessages() {
  store.messages = {};
  store.versions = [];
}

export function getMessagingOptions() {
  return messagingOptions;
}

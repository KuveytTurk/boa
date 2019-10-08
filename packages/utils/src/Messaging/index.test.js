import { assert } from 'chai';
import sinon from 'sinon';
import * as Messaging from '..';
import LocalMessages from './test-messages/index.test';

function serviceCallSync(request, versions, messages) {
  if (typeof versions === 'boolean' && versions === false) {
    request.error();
  } else if (request.url.includes('Version')) {
    request.success(versions);
  } else {
    request.success(messages);
  }
}

describe('Messaging', () => {
  describe('Configuration', () => {
    it('should contains default values ', () => {
      const options = Messaging.getMessagingOptions();
      assert.strictEqual(options.url, Messaging.DEFAULT_URL);
      assert.strictEqual(options.path, Messaging.DEFAULT_PATH);
      assert.strictEqual(options.versionPath, Messaging.DEFAULT_VERSION_PATH);
      assert.strictEqual(options.fileNameFormat, Messaging.DEFAULT_FILE_NAME_FORMAT);
      assert.strictEqual(options.timeout, Messaging.DEFAULT_TIMEOUT);
      assert.strictEqual(options.languageId, Messaging.DEFAULT_LANGUAGE_ID);
      assert.strictEqual(options.refreshThresold, Messaging.DEFAULT_THRESOLD);
    });

    it('should set messaging options ', () => {
      const testOptions = {
        url: 'test',
        path: 'test',
        versionPath: 'test',
        fileNameFormat: 'test',
        timeout: 1,
        languageId: 1,
        refreshThresold: 2,
      };

      Messaging.setMessagingOptions(testOptions);
      const options = Messaging.getMessagingOptions();
      assert.strictEqual(options.url, testOptions.url);
      assert.strictEqual(options.path, testOptions.path);
      assert.strictEqual(options.versionPath, testOptions.versionPath);
      assert.strictEqual(options.fileNameFormat, testOptions.fileNameFormat);
      assert.strictEqual(options.timeout, testOptions.timeout);
      assert.strictEqual(options.languageId, testOptions.languageId);
      assert.strictEqual(options.refreshThresold, 2);
    });
  });

  describe('Online messaging', () => {
    it('should get message when service call success', () => {
      const versions = [{ id: 1, name: 'test', ClassName: 'test', Version: 1 }];
      const messages = [
        {
          Code: 'test',
          Description: 'test',
          GroupName: 'test',
          LanguageId: 1,
          PropertyName: 'test',
        },
      ];

      // eslint-disable-next-line
      const stub = sinon.stub($, 'ajax').callsFake(request => {
        return serviceCallSync(request, versions, messages);
      });
      const message = Messaging.getMessage('test', 'test', 1);
      stub.restore();
      assert.strictEqual(message.Description, 'test');
    });

    it('should get message when service call in refresh thresold', () => {
      const versions = [];
      const messages = [];

      // eslint-disable-next-line
      const stub = sinon.stub($, 'ajax').callsFake(request => {
        return serviceCallSync(request, versions, messages);
      });
      const message = Messaging.getMessage('test', 'test', 1);
      stub.restore();
      assert.strictEqual(message.Description, 'test');
    });

    it('should get message when service call after refresh thresold', () => {
      Messaging.setMessagingOptions({ refreshThresold: -1 });
      const versions = [{ id: 1, name: 'test', ClassName: 'test', Version: 2 }];
      const messages = [
        {
          Code: 'test',
          Description: 'test-new',
          GroupName: 'test',
          LanguageId: 1,
          PropertyName: 'test',
        },
      ];

      // eslint-disable-next-line
      const stub = sinon.stub($, 'ajax').callsFake(request => {
        return serviceCallSync(request, versions, messages);
      });
      const message = Messaging.getMessage('test', 'test');
      stub.restore();
      assert.strictEqual(message.Description, 'test-new');
    });

    it('should clear messages', () => {
      Messaging.setMessagingOptions({ refreshThresold: -1 });
      const versions = [{ id: 1, name: 'test', ClassName: 'test', Version: 2 }];
      const messages = [
        {
          Code: 'test',
          Description: 'test-clear',
          GroupName: 'test',
          LanguageId: 1,
          PropertyName: 'test',
        },
      ];

      // eslint-disable-next-line
      const stub = sinon.stub($, 'ajax').callsFake(request => {
        return serviceCallSync(request, versions, messages);
      });
      let message = Messaging.getMessage('test', 'test');
      stub.restore();
      assert.strictEqual(message.Description, 'test-clear');
      Messaging.clearMessages();
      message = Messaging.getMessage('test', 'test');
      assert.strictEqual(message.Description, 'test.test');
    });

    it('should get message when service return empty response', () => {
      Messaging.setMessagingOptions({ refreshThresold: -1 });
      const versions = [];
      const messages = [];

      // eslint-disable-next-line
      const stub = sinon.stub($, 'ajax').callsFake(request => {
        return serviceCallSync(request, versions, messages);
      });
      const message = Messaging.getMessage('test', 'test', 1);
      stub.restore();
      assert.strictEqual(message.Description, 'test.test');
    });

    it('should get message when service return error', () => {
      Messaging.setMessagingOptions({ refreshThresold: -1 });

      // eslint-disable-next-line
      const stub = sinon.stub($, 'ajax').callsFake(request => {
        return serviceCallSync(request, false);
      });
      const message = Messaging.getMessage('test', 'test', 1);
      stub.restore();
      assert.strictEqual(message.Description, 'test.test');
    });
  });

  describe('Offline messaging', () => {
    before(() => {
      Messaging.setMessagingOptions({ localMessages: LocalMessages });
    });

    it('should get message from file', () => {
      const message = Messaging.getMessage('offline', 'test', 1);
      // eslint-disable-next-line
      assert.strictEqual(message.Description, LocalMessages.offline[0].Description);
    });

    it('should get message from service when file not contains', () => {
      const message = Messaging.getMessage('test', 'online', 1);
      assert.strictEqual(message.Description, 'test.online');
    });
  });
});

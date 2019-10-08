import { Localization, setMessagingOptions } from '@kuveytturk/boa-utils';

export default function setLocalization(options) {
  setMessagingOptions(options);
  Localization.staticConstructor(options.languageId);
}

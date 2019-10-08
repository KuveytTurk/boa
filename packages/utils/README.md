# @kuveytturk/boa-utils

@kuveytturk/boa-utils package has Localization and Messaging utilities.

## Installation


```sh
// with npm
npm install @kuveytturk/boa-utils

// with yarn
yarn add @kuveytturk/boa-utils
```

## API Reference

### Localization

We're using [*moment*](https://github.com/moment/moment) and [*numeral*](https://github.com/adamwdraper/Numeral-js) for localization to dates and numbers. Localization utility provides some functionality to format the variables.

#### Initialization
Localization class has a staticConstructor method to contsturct Localization instance.

```js
import { Localization, Language } from @kuveytturk/boa-utils;
Localization.staticConstructor(Language.EN);
```

#### Languages 
```js
export const Language = {
  TR: 1,
  EN: 2,
  DE: 3,
  RU: 4,
  AR: 5,
};
```

#### createLocalizationContext
To provide the context prop for the components. Check out [ComponentBase](/packages/base#componentbase) to see how the context prop works.

#### changeLocalizationLanguage
Changes the localization context and registers locales to numeral and moment.

### Messaging

We're receiving messages from a backend dynamically. The messaging utility receives messages and versions and caches them.

#### getMessage
ComponentBase has a function called [getMessage](/packages/base/src/ComponentBase/index.js#L114). It takes two parameters: *groupName*, *propertyName*

We group messages by domain at our pages like *CoreBanking*, *Loans* etc. And each group has own messages with propertyName. 

#### Initialization
```setMessagingOptions``` function provides to configure messaging library.

```js
export function setMessagingOptions(options)
````

Options:
- **url:** messaging service url (if empty, use window.location)
- **path:** messaging service path 
- **versionPath:** messaging versions path
- **fileNameFormat:** messaging file name formats
- **timeout:** timeout for HTTP request (minutes)
- **languageId:** message languages
- **refreshThresold:** messaging version check thresold
- **localMessages:** for offline working (please refer to test-messages folder)

```js
export const DEFAULT_LANGUAGE_ID = 1;
export const DEFAULT_TIMEOUT = 300000;
export const DEFAULT_URL = '';
export const DEFAULT_PATH = '/messaging/';
export const DEFAULT_VERSION_PATH = 'MessagingVersions.json';
export const DEFAULT_FILE_NAME_FORMAT = 'BOA.Messaging.{0}.json';
export const DEFAULT_THRESOLD = 1; // minutes
```

Our storybook container has a sample usage of @kuveytturk/boa-utils with @kuveytturk/boa-base

```jsx
import React, { Component } from 'react';

import { AppProvider, ComponentBase, setLocalization, getTheme } from '@kuveytturk/boa-base';
import { Localization, Language } from '@kuveytturk/boa-utils';
import { context } from '@kuveytturk/boa-test/utils';
import detectSize from './utils/detectSize';

export default class Container extends ComponentBase {
  constructor(props) {
    super(props);
    this.onThemeChange = this.onThemeChange.bind(this);
    this.onLanguageChange = this.onLanguageChange.bind(this);
    this.onResize = this.onResize.bind(this);

    setLocalization({
      url: 'http://boaonedev',
      path: '/messaging/',
      versionPath: 'MessagingVersions.json',
      fileNameFormat: 'BOA.Messaging.{0}.json',
      timeout: 3000,
      languageId: Language.TR,
    });

    context.deviceSize = detectSize();
    window.addEventListener('resize', this.onResize);
    this.state = { context };
  }

  onResize() {
    const deviceSize = detectSize();
    this.setState({ context: Object.assign({}, this.state.context, { deviceSize }) });
  }

  onThemeChange(themeName) {
    const theme = getTheme({ themeName: themeName });
    if (theme) {
      this.setState({ context: Object.assign({}, this.state.context, { theme }) });
    }
  }

  onLanguageChange(value) {
    const localization = { isRightToLeft: value === 5 ? true : false };
    Localization.changeLocalizationLanguage(value);
    this.setState({
      context: Object.assign({}, this.state.context, {
        language: value,
        localization: localization,
        messagingContext: {},
      }),
    });
  }

  render() {
    const { story, context } = this.props;
    context.props = { context: this.state.context };
    context.props.onThemeChange = this.onThemeChange;
    context.props.onLanguageChange = this.onLanguageChange;

    return <AppProvider theme={this.state.context.theme}>{story(context)}</AppProvider>;
  }
}
```

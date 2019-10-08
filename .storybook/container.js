import React, { Component } from 'react';

import { AppProvider, ComponentBase, setLocalization, getTheme } from '@kuveytturk/boa-base';
import { Localization, Language } from '@kuveytturk/boa-utils';
import { context } from '@kuveytturk/boa-test/utils';
import detectSize from './utils/detectSize';
import Messages from './messages';

export default class Container extends ComponentBase {
  constructor(props) {
    super(props);
    this.onThemeChange = this.onThemeChange.bind(this);
    this.onLanguageChange = this.onLanguageChange.bind(this);
    this.onResize = this.onResize.bind(this);

    context.language = Language.EN;

    setLocalization({
      url: 'http://boaonedev',
      path: '/messaging/',
      versionPath: 'MessagingVersions.json',
      fileNameFormat: 'BOA.Messaging.{0}.json',
      timeout: 3000,
      languageId: context.language,
      localMessages: Messages,
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
    Localization.staticConstructor(value);

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

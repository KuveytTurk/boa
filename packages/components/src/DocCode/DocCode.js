/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import hljs from 'highlight.js';
import { ComponentBase, ComponentComposer } from '@kuveytturk/boa-base';
import styles from './styles';

const editorTypes = [
  'androidStudio',
  'atomOneDark',
  'atomOneLight',
  'github',
  'monokaiSublime',
  'rainbow',
  'vs',
  'xcode',
];
/**
 * This component highlights the codes.
 * It provides different color themes.
 * */
@ComponentComposer
class DocCode extends ComponentBase {
  static propTypes = {
    /**
     * Base properties from ComponentBase.
     */
    ...ComponentBase.propTypes,
    /**
     * Code that will be highlighted.
     */
    content: PropTypes.string.isRequired,
    /**
     * Editor theme.
     */
    editorType: PropTypes.oneOf(editorTypes),
    /**
     * If `true`, the code will be highlighted.
     */
    highlight: PropTypes.bool,
    /**
     * Programming language of the code,
     */
    lang: PropTypes.string,
  };

  static defaultProps = {
    content: "console.log('Hello world');",
    highlight: true,
    lang: 'js',
    editorType: 'github',
  };

  render() {
    return <div dangerouslySetInnerHTML={{ __html: this.getMarkup() }} />;
  }

  getMarkup() {
    const { lang, highlight, content } = this.props;
    const language = hljs.getLanguage(lang);
    let contentHighlighted;
    if (highlight && language) {
      contentHighlighted = hljs.highlight(lang, content).value;
    } else if (highlight) {
      contentHighlighted = hljs.highlightAuto(this.props.content).value;
    } else {
      contentHighlighted = content;
    }

    const css = this.props.highlight ? this.getHighlightCSS() : null;

    return `
      <pre>
        <code class="hljs">${contentHighlighted}</code>
      </pre>
      ${css}
    `;
  }

  getHighlightCSS() {
    const codeStyle = styles[this.props.editorType];
    return `
      <style>
        ${codeStyle}
      </style>
    `;
  }
}

export default DocCode;

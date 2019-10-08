/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import hljs from 'highlight.js';
import { ComponentBase, ComponentComposer } from '@kuveytturk/boa-base';
import marked from './marked';
import CodeStyles from './styles';

const editorTypes = [
  'androidStudio',
  'atomOneDark',
  'atomOneLight',
  'github',
  'monokaiSublime',
  'raiinbow',
  'vs',
  'xcode',
];

/**
 * This component renders the markdown documents. It supports all markdown features.
 */
@ComponentComposer
class DocViewer extends ComponentBase {
  static propTypes = {
    /**
     * Markdown content of documentation.
     */
    content: PropTypes.string.isRequired,
    /**
     * Editor type that will be colored.
     */
    editorType: PropTypes.oneOf(editorTypes),
  };

  static defaultProps = {
    content: '',
    editorType: 'atomOneDark',
  };

  static getTableOfContent(source) {
    let cap;
    let src = source.replace(/^ +$/gm, '');
    const exp = /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/;
    const tokens = [];
    while (src) {
      cap = exp.exec(src);
      if (cap) {
        src = src.substring(cap[0].length);
        tokens.push({
          level: cap[1].length,
          content: cap[2],
          id: cap[2]
            .toString()
            .toLowerCase()
            .trim()
            .replace(/&/g, '-and-')
            .replace(/[\s\W-]+/g, '-'),
        });
      } else {
        src = src.replace(/.*/, '').substr(1);
      }
    }
    return tokens;
  }

  state = {
    editorType: this.props.editorType,
  };

  constructor(props, context) {
    super(props, context);
    marked.setOptions({
      highlight(str, lang) {
        /* istanbul ignore else */
        if (lang && hljs.getLanguage(lang)) {
          return hljs.highlight(lang, str).value;
        }
        return hljs.highlightAuto(str).value;
      },
      context: props.context,
    });
    this.changeEditorType = this.changeEditorType.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    /* istanbul ignore else */
    if (this.props.editorType !== nextProps.editorType) {
      this.setState({ editorType: nextProps.editorType });
    }
  }

  changeEditorType(event) {
    this.setState({ editorType: event.target.value });
  }

  render() {
    marked.setOptions({
      context: this.props.context,
    });
    marked.setEditorTypes(editorTypes);
    marked.setEditorType(this.state.editorType);
    let rawMarkup = marked(this.props.content);
    rawMarkup = this.getStyle() + rawMarkup;
    return (
      <div
        style={{ width: '100%' }}
        dangerouslySetInnerHTML={{ __html: rawMarkup }}
        onInput={this.changeEditorType}
      />
    );
  }

  /* eslint-disable max-len, class-methods-use-this */
  getStyle() {
    return `
    <style>
      ${CodeStyles[this.state.editorType]}
      .customPre{display:block;position:relative;background-color:transparent;border:0px solid #ccc;border-radius:0px; padding:0px; margin:0px;}
    </style>
    `;
  }

  getTableOfContent() {
    return marked.getTableOfContent();
  }
  /* eslint-enable max-len, class-methods-use-this */
}

export default DocViewer;

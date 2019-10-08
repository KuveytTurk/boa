import React from 'react';
import PropTypes from 'prop-types';
import { ComponentBase, ComponentComposer } from '@kuveytturk/boa-base';
import parseFontSize from './parseFontSize';

/**
 * This component allows fitting label contents to the specified width by changing the font size.
 */
@ComponentComposer
class Label extends ComponentBase {
  constructor(props, context) {
    super(props, context);

    const minFontSize = parseFontSize(this.props.minFontSize);
    const maxFontSize = parseFontSize(this.props.maxFontSize);
    let fontSize = 12;
    if (minFontSize && minFontSize > fontSize) {
      fontSize = minFontSize;
    }
    if (maxFontSize && maxFontSize < fontSize) {
      fontSize = maxFontSize;
    }

    this.state = {
      fontSize,
    };
  }

  static propTypes = {
    /**
     * Max font size of the label element.
     */
    maxFontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Max width of the label container element.
     */
    maxWidth: PropTypes.number,
    /**
     * Min font size of the label element.
     */
    minFontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * Override style of the element.
     */
    style: PropTypes.object,
    /**
     * Text of the label element.
     */
    text: PropTypes.string,
    /**
     * Position of the text of the label.
     * It applies given position to text if label width is greater than the text width.
     */
    textPosition: PropTypes.oneOf(['center', 'left', 'right']),
  };

  static defaultProps = {
    minFontSize: Number.NEGATIVE_INFINITY,
    maxFontSize: Number.POSITIVE_INFINITY,
  };

  componentDidMount() {
    this.checkLabelFontSize(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkLabelFontSize(nextProps);
  }

  checkLabelFontSize(props) {
    if (!props) {
      props = this.props;
    }
    if (props.maxWidth && this.label && this.label.offsetWidth > props.maxWidth) {
      const labelFontSize = this.label.style ? this.label.style.fontSize : 12;
      const currentFontSize = parseFontSize(labelFontSize) || 12;
      const minFontSize = parseFontSize(props.minFontSize);
      const maxFontSize = parseFontSize(props.maxFontSize);

      let newFontSize = (currentFontSize * props.maxWidth) / this.label.offsetWidth;
      newFontSize = Math.max(Math.min(newFontSize, maxFontSize), minFontSize);
      this.setState({ fontSize: newFontSize });
    }
  }

  render() {
    let styleDiv;
    const style = Object.assign(
      {
        fontSize: this.state.fontSize,
      },
      this.props.context.theme.label,
      this.props.style,
    );
    if (!this.props.context.localization.isRightToLeft) {
      if (this.props.maxWidth) {
        styleDiv = { textAlign: 'left', width: this.props.maxWidth };
      } else {
        styleDiv = { textAlign: 'left' };
      }
    } else if (this.props.maxWidth) {
      styleDiv = { textAlign: 'right', width: this.props.maxWidth };
    } else {
      styleDiv = { textAlign: 'right' };
    }

    if (this.props.textPosition) {
      Object.assign(styleDiv, { textAlign: this.props.textPosition });
    }

    return (
      <div style={Object.assign(styleDiv, style)}>
        <label
          ref={r => {
            this.label = r;
          }}
        >
          {this.props.text}
        </label>
      </div>
    );
  }
}
export default Label;

import React from 'react';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import MuiButton from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { ComponentBase, ComponentComposer } from '@kuveytturk/boa-base';
import { Localization } from '@kuveytturk/boa-utils';
import { Icon } from '../Icon';
import { IconButton } from '../IconButton';

const styles = () => ({
  label: {
    pointerEvents: 'none',
  },
});

/**
 * Buttons allow users to take actions, and make choices, with a single tap.
 * This component is wrapped from `@material-ui/core/Button`.
 * It also renders an `<IconButton />` when the "type" prop is "icon".
 */
@ComponentComposer
@withStyles(styles)
class Button extends ComponentBase {
  static propTypes = {
    /**
     * Base properties from ComponentBase.
     */
    ...ComponentBase.propTypes,
    /**
     * If `false`, content of the button is shown uppercase.
     */
    allowLabelCase: PropTypes.bool,
    /**
     * Predefined sizes of the button.
     */
    buttonSize: PropTypes.oneOf(['small', 'medium', 'large']),
    /**
     * Color of the component.
     * It supports the theme colors that make sense for this component.
     */
    colorType: PropTypes.oneOf(['default', 'primary', 'secondary']),
    /**
     * Icon name from BOA icon library.
     */
    dynamicIcon: PropTypes.string,
    /**
     * Font icon name from font icon's library.
     * @ignore
     */
    fontIcon: PropTypes.string,
    /**
     * If true, the button has the full width of its container.
     */
    fullWidth: PropTypes.bool,
    /**
     * Custom icon element to be rendered inside the button.
     */
    icon: PropTypes.any,
    /**
     * Icon props that are passed to the `<Icon />` element.
     */
    iconProperties: PropTypes.object,
    /**
     * If `true`, and `variant` is `'fab'`, will use mini floating action button styling.
     */
    mini: PropTypes.bool,
    /**
     * @ignore
     */
    onClick: PropTypes.func,
    /**
     * SVG Icon name from material svg icon library.
     * @ignore
     */
    svgIcon: PropTypes.string,
    /**
     * Button content.
     */
    text: PropTypes.string,
    /**
     * Position of the text in the button.
     * It assigns given position to text if button width is greater than the text width.
     */
    textPosition: PropTypes.oneOf(['center', 'left', 'right']),
    /**
     * Styles applied to the span element that wraps the children.
     */
    textStyle: PropTypes.object,
    /**
     * If type is 'icon', a tooltip is generated on the icon button.
     */
    tooltip: PropTypes.string,
    /**
     * Position of the button tooltip.
     */
    tooltipPosition: PropTypes.string,
    /**
     * Button type should be `contained`, `text`, `fab` or `icon`.
     */
    type: PropTypes.oneOf(['contained', 'text', 'fab', 'icon']).isRequired,
  };

  static defaultProps = {
    ...ComponentBase.defaultProps,
    type: 'contained',
    allowLabelCase: false,
    textPosition: 'center',
    buttonSize: 'medium',
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      disabled: props.disabled,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.disabled !== this.props.disabled) {
      this.setDisable(nextProps.disabled);
    }
  }

  setDisable(value) {
    this.setState({ disabled: value });
  }

  getLabel() {
    const { allowLabelCase, text, textStyle } = this.props;
    const label = allowLabelCase ? text : Localization.stringUpperCase(!text ? '' : text);
    return textStyle ? <div style={textStyle}>{label}</div> : label;
  }

  createButtonElement(variant) {
    let props = this.props;
    const { textPosition, allowLabelCase, style } = this.props;

    /* istanbul ignore else  */
    if (variant !== 'fab') {
      props = Object.assign({}, props);
      const iconStyle = !this.getLabel() ? null : { marginRight: 8 };
      if (props.iconProperties && props.iconProperties.style) {
        props.iconProperties.style = merge(iconStyle, props.iconProperties.style);
      } else {
        props.iconProperties = { style: iconStyle };
      }
    }

    const icon = Icon.getIcon(props);
    const buttonStyle = {
      justifyContent: textPosition === 'right' ? 'flex-end' : textPosition,
      textAlign: textPosition,
      textTransform: allowLabelCase ? 'none' : '',
      ...style,
    };

    return (
      <MuiButton
        id={this.props.id}
        classes={{
          label: props.classes.label,
        }}
        style={buttonStyle}
        fullWidth={this.props.fullWidth}
        color={this.props.colorType}
        disabled={this.state.disabled}
        disableRipple={this.state.disabled}
        onClick={this.props.onClick}
        variant={variant}
        size={this.props.buttonSize}
        mini={this.props.mini}
      >
        {icon}
        {this.getLabel()}
        {this.props.children}
      </MuiButton>
    );
  }

  createIconButtonElement() {
    return (
      <IconButton
        {...this.props}
        disabled={this.state.disabled}
        disableRipple={this.state.disabled}
        onClick={this.props.onClick}
      />
    );
  }

  createButton() {
    if (this.props.type && this.props.type === 'icon') {
      return this.createIconButtonElement();
    }
    return this.createButtonElement(this.props.type);
  }

  render() {
    return this.createButton();
  }
}

export default Button;

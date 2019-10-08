import React from 'react';
import PropTypes from 'prop-types';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { ComponentBase, ComponentComposer } from '@kuveytturk/boa-base';
import { Icon } from '../Icon';
import { Label } from '../Label';
import merge from 'lodash/merge';

const styles = theme => ({
  root: {
    margin: 0,
    width: '100%',
    height: 36,
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    direction: 'ltr',
  },
  label: {
    color: theme.boaPalette.base400,
  },
  isRTL: {
    flexDirection: 'row',
  },
  labelReverse: {
    justifyContent: 'flex-start',
  },
});

/**
 * A toggle switch is used as an on/off control.
 */
@ComponentComposer
@withStyles(styles)
class Toggle extends ComponentBase {
  static propTypes = {
    /**
     * Base properties from ComponentBase.
     */
    ...ComponentBase.propTypes,
    /**
     * The default value of the toggle.
     */
    defaultToggled: PropTypes.bool,
    /**
     * Indicates style of the element.
     */
    elementStyle: PropTypes.object,
    /**
     * Indicates the error text.
     */
    errorText: PropTypes.string,
    /**
     * Indicates the icon properties.
     */
    iconProperties: PropTypes.object,
    /**
     * Indicates style of the icon.
     */
    iconStyle: PropTypes.object,
    /**
     * Indicates the icon information text.
     */
    informationText: PropTypes.string,
    /**
     * Indicates style of the input.
     */
    inputStyle: PropTypes.object,
    /**
     * Label of the toggle component.
     */
    label: PropTypes.node,
    /**
     * Position of the toggle label.
     */
    labelPosition: PropTypes.oneOf(['left', 'right']),
    /**
     * Indicates style of the label.
     */
    labelStyle: PropTypes.object,
    /**
     * Event to handle the toggle.
     */
    onToggle: PropTypes.func,
    /**
     * Indicates style of the ripple.
     */
    rippleStyle: PropTypes.object,
    /**
     * Indicates whether the component is toggled or not.
     */
    toggled: PropTypes.bool,
    /**
     * Indicates style of the track switched.
     */
    trackSwitchedStyle: PropTypes.object,
    /**
     * Indicates value of the link.
     */
    valueLink: PropTypes.object,
  };

  static defaultProps = {
    /**
     * Base default properties from ComponentBase.
     */
    ...ComponentBase.defaultProps,
    defaultToggled: false,
    toggled: false,
    labelPosition: 'left',
  };

  state = {
    disabled: this.props.disabled,
    toggled: this.props.defaultToggled || this.props.toggled,
  };

  componentWillReceiveProps(nextProps) {
    super.componentWillReceiveProps(nextProps);
    if (nextProps.disabled !== this.state.disabled) {
      this.setDisable(nextProps.disabled);
    }

    if (this.props.toggled !== nextProps.toggled && nextProps.toggled !== this.state.toggled) {
      this.setState({ toggled: nextProps.toggled });
    }
  }

  getValue() {
    return this.state.toggled;
  }

  setValue(value) {
    this.setState({ toggled: value });
  }

  resetValue() {
    this.setState({ toggled: this.props.defaultToggled });
  }

  setDisable(value) {
    this.setState({ disabled: value });
  }

  handleOnToggle(event, value) {
    this.setValue(value);

    if (this.props.onChange) {
      this.props.onChange(event, value);
    }
    if (this.props.onToggle) {
      this.props.onToggle(event, value);
    }
  }

  render() {
    const errorStyle = {
      color: this.props.context.theme.boaPalette.error500,
      fontSize: 11,
      marginTop: 2,
      height: 16,
      textAlign: this.props.context.localization.isRightToLeft ? 'right' : 'left',
    };
    const { classes } = this.props;
    const props = Object.assign({}, this.props);
    const { isRightToLeft } = this.props.context.localization;

    const iconProperties = {
      style: {
        width: 20,
        height: 20,
        marginLeft: isRightToLeft ? 10 : 0,
        marginRight: isRightToLeft ? 0 : 10,
        disabled: this.state.disabled,
      },
    };
    props.iconProperties = merge(iconProperties, props.iconProperties || {});
    const toggleIcon = Icon.getIcon(props);

    const rootClass = classNames(classes.root, {
      [classes.labelReverse]: this.props.labelPosition === 'right' ? 1 : 0,
      // eslint-disable-next-line
      [classes.isRTL]: isRightToLeft
        ? this.props.labelPosition === 'right'
          ? 0
          : 1
        : this.props.labelPosition === 'right'
          ? 1
          : 0,
    });

    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {toggleIcon && <div>{toggleIcon}</div>}
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
          <FormControlLabel
            control={
              <Switch
                checked={this.state.toggled}
                disabled={this.state.disabled}
                color="primary"
                onChange={(event, value) => {
                  this.handleOnToggle(event, value);
                }}
              />
            }
            classes={{
              root: rootClass,
              label: classes.label,
            }}
            label={this.props.label}
          />
          {this.props.errorText ? (
            <Label style={errorStyle} context={this.props.context} text={this.props.errorText} />
          ) : null}
          {this.props.informationText ? (
            <Label
              style={{
                height: 16,
                fontSize: '11px',
                color: this.props.context.theme.boaPalette.base400,
              }}
              context={this.props.context}
              text={this.props.informationText}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

export default Toggle;

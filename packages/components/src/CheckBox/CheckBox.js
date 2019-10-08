import React from 'react';
import PropTypes from 'prop-types';
import merge from 'lodash/merge';
import MuiFormControlLabel from '@material-ui/core/FormControlLabel';
import MuiCheckbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import { Label } from '../Label';
import { ComponentBase, ComponentComposer } from '@kuveytturk/boa-base';

const styles = theme => ({
  root: {
    margin: 0,
    height: 30,
  },
  checked: {
    margin: 0,
    color: theme.boaPalette.pri500,
  },
  disabled: {
    margin: 0,
    color: theme.boaPalette.base250,
  },
  labelLTR: {
    color: theme.boaPalette.base450,
    fontSize: 14,
    marginLeft: 12,
    marginRight: 0,
    marginTop: -3,
  },
  labelRTL: {
    color: theme.boaPalette.base450,
    fontSize: 14,
    marginLeft: 0,
    marginRight: 12,
    marginTop: -3,
  },
});

/**
 * A CheckBox represents a button with two states, selected and unselected.
 * This component is wrapped from `@material-ui/core/Checkbox`.
 * If the label prop is specified, the component renders `@material-ui/core/FormControlLabel`.
 * If not, it renders a `@material-ui/core/Checkbox`.
 * Also, it renders an error text with a label if the errorText prop is specified.
 */
@ComponentComposer
@withStyles(styles)
class CheckBox extends ComponentBase {
  static propTypes = {
    /**
     * Base properties from ComponentBase.
     */
    ...ComponentBase.propTypes,
    /**
     * If `true`, the component is checked.
     */
    checked: PropTypes.bool,
    /**
     * Icon to display when the component is checked.
     */
    checkedIcon: PropTypes.node,
    /**
     * @ignore
     */
    classes: PropTypes.object,
    /**
     * Color of the component.
     * It supports the theme colors that make sense for this component.
     */
    color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
    /**
     * Default value of the component.
     */
    defaultChecked: PropTypes.bool,
    /**
     * If `true`, the ripple effect is disabled.
     */
    disableRipple: PropTypes.bool,
    /**
     * Error message of the component.
     */
    errorText: PropTypes.string,
    /**
     * If `true` and the component has a label and an errorText, the errorText is visible.
     */
    errorTextVisible: PropTypes.bool,
    /**
     * Icon to display when the component is unchecked.
     */
    icon: PropTypes.node,
    /**
     * If `true`, the component appears indeterminate.
     */
    indeterminate: PropTypes.bool,
    /**
     * If exists, checkbox renders with a `<Label>` component.
     */
    label: PropTypes.string,
    /**
     * @ignore
     */
    name: PropTypes.string,
    /**
     * @ignore
     */
    onChange: PropTypes.func,
    /**
     * The value of the component.
     */
    value: PropTypes.string,
  };

  static defaultProps = {
    ...ComponentBase.defaultProps,
    color: 'primary',
    indeterminate: false,
    errorTextVisible: true,
  };

  state = {
    isChecked: this.props.checked || this.props.defaultChecked || false,
    disabled: this.props.disabled,
  };

  constructor(props, context) {
    super(props, context);
    this.onCheck = this.onCheck.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { checked, defaultChecked, disabled } = nextProps;
    if (checked !== this.props.checked || disabled !== this.props.disabled) {
      this.setState({ isChecked: checked, disabled });
    } else if (defaultChecked !== this.props.defaultChecked || disabled !== this.props.disabled) {
      this.setState({ isChecked: defaultChecked, disabled });
    }
  }

  getValue() {
    return this.state.isChecked;
  }

  setValue(value) {
    this.setState({ isChecked: value });
  }

  resetValue() {
    this.setState({ isChecked: this.props.defaultChecked });
  }

  setDisable(value) {
    this.setState({ disabled: value });
  }

  onCheck(event, isInputChecked) {
    this.setState({ isChecked: isInputChecked },
      () => {
        if (this.props.onCheck) {
          this.props.onCheck(event, isInputChecked, this.props.value);
        }
        if (this.props.onChange) {
          this.props.onChange(event, isInputChecked, this.props.value);
        }
      });
  }

  render() {
    const style = { height: 24, width: 24, marginTop: -3 };
    const boxStyle = merge(style, this.props.style ? this.props.style : {});
    const { classes, label, context } = this.props;
    const { localization } = context;
    const errorStyle = {
      color: this.props.context.theme.boaPalette.error500,
      fontSize: 11,
      marginTop: 2,
      height: 16,
      textAlign: this.props.context.localization.isRightToLeft ? 'right' : 'left',
    };
    const checkBox = (
      <MuiCheckbox
        name={this.props.name}
        checked={this.state.isChecked}
        disabled={this.state.disabled}
        disableRipple={this.props.disableRipple}
        checkedIcon={this.props.checkedIcon ? this.props.checkedIcon : undefined}
        icon={this.props.icon}
        color={this.props.color}
        style={boxStyle}
        indeterminate={this.props.indeterminate}
        classes={{
          checked: classes.checked,
          disabled: classes.disabled,
        }}
        onChange={this.onCheck}
      />
    );

    if (label) {
      return (
        <div style={{ display: 'inline-flex' }}>
          <MuiFormControlLabel
            control={checkBox}
            classes={{
              label: localization.isRightToLeft ? classes.labelRTL : classes.labelLTR,
              root: classes.root,
            }}
            label={label}
          />
          {this.props.errorText && this.props.errorTextVisible ? (
            <Label style={errorStyle} context={this.props.context} text={this.props.errorText} />
          ) : null}
        </div>
      );
    }

    return checkBox;
  }
}

export default CheckBox;

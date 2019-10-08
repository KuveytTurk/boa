import React from 'react';
import PropTypes from 'prop-types';
import PredefinedMask from './constants';
import { EditorBase, ComponentComposer } from '@kuveytturk/boa-base';
import { Input } from '../Input';
import detectCopyPaste from './detectCopyPaste';

/**
 * Text fields let users enter and edit text with the specified mask.
 */
@ComponentComposer
class InputMask extends EditorBase {
  static propTypes = {
    /**
     * Base properties from Input.
     */
    ...Input.propTypes,
    /**
     * Country code for the masked IBAN input elements.
     */
    countryCode: PropTypes.string,
    /**
     * If true, the width property of the field is assigned 100%. Default is false.
     */
    fullWidth: PropTypes.bool,
    /**
     * Specifies the type of input to display
     * such as "password" or "text".
     */
    inputType: PropTypes.string,
    /**
     * Mask of the input element. If the type is selected 'Custom', you can define your own mask.
     */
    mask: PropTypes.string.isRequired,
    /**
     * Limit of the input text’s character length.
     */
    maxLength: PropTypes.number,
    /**
     * If true, the text inside the input does not go bottom line. Default is true.
     */
    noWrap: PropTypes.bool,
    /**
     * Shows the counter label if set to true. Default is false.
     */
    showCounter: PropTypes.bool,
    /**
     * Specifies type of the mask to display
     * such as "CreditCard", "PhoneNumber", etc.
     */
    type: PropTypes.oneOf(['CreditCard', 'IBAN', 'MobilePhoneNumber', 'PhoneNumber', 'Custom'])
      .isRequired,
  };

  static defaultProps = {
    ...Input.defaultProps,
    countryCode: 'TR',
    fullWidth: true,
    maxLength: -1,
    noWrap: true,
    value: '',
    type: 'Custom',
    mask: 'aa nnn',
    inputType: 'text',
    showCounter: true,
  };

  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
    this.onClearClick = this.onClearClick.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.currentMask = '';
    this.errorText = '';
    this.helperText = '';
    this.maxLength = -1;
    this.maskedMaxLength = -1;
    this.specialKey = false;
    this.isCorrectFormat = false;
    this.disabledCounterCharacter = ' ';
    this.setProps(props);
  }

  state = {
    value: this.props.value,
    saltValue: '',
    disabled: this.props.disabled,
    focussed: false,
  };

  setProps(props) {
    this.currentMask = props.type === 'Custom' ? props.mask : PredefinedMask.Type[props.type];
    this.helperText = props.helperText || this.generateHelperText();
    this.errorText = props.errorText || this.helperText;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.mask !== this.props.mask || nextProps.type !== this.props.type) {
      this.setProps(nextProps);
    }
    if (nextProps.value != null && nextProps.value !== this.props.value) {
      this.setState({ value: nextProps.value });
    }
    if (nextProps.disabled !== this.props.disabled) {
      this.setDisable(nextProps.disabled);
    }
    if (nextProps.mask !== this.props.mask || nextProps.type !== this.props.type) {
      this.setState({ value: '', saltValue: '' });
    }
  }

  isCorrectFormatText(mask, text) {
    let newText = '';
    let saltText = '';
    let count = 0;

    this.isCorrectFormat = text === undefined || text == null || text.length > 0;

    if (text) {
      for (let i = 0; i < mask.length; i++) {
        const m = mask[i];
        const isExist = PredefinedMask.Regex[m] !== undefined;
        const t = text[i - count];
        if (isExist === true && t !== undefined) {
          saltText += t;
        }
        if (isExist === false) {
          if (t !== undefined && t !== m) {
            newText += m;
            count += 1;
            if (PredefinedMask.AllowSpecialKeys.indexOf(m) >= 0) {
              continue; // eslint-disable-line
            }
            this.isCorrectFormat = false;
          } else if (t !== undefined) {
            newText += t;
          }
        } else if (t !== undefined) {
          newText += t;
        }
      }
    }

    return { value: newText, saltValue: saltText };
  }

  onChange(e) {
    const value = e.target.value;
    const result = this.isCorrectFormatText(this.currentMask, value);
    const { currentMask, isCorrectFormat } = this;

    const compareValue = this.snapshotValue || result.value;

    if (isCorrectFormat === true && compareValue && compareValue.length !== currentMask.length) {
      this.isCorrectFormat = false;
    }

    this.setState({ value: result.value, saltValue: result.saltValue }, () => this.runRender());

    /* istanbul ignore else */
    if (this.props.onChange) {
      this.props.onChange(e, result.value, result.saltValue, this.isCorrectFormat);
    }

    /* istanbul ignore if */
    if (this.props.onDynamicChange) {
      this.props.onDynamicChange(e);
    }
  }

  onClearClick(e) {
    const v = '';
    this.setState({ value: v });

    /* istanbul ignore else */
    if (this.props.onClearClick) {
      this.props.onClearClick(e);
    }
  }

  onKeyDown(e) {
    const key = e.key;
    const keyCode = e.keyCode || e.which;
    this.specialKey = PredefinedMask.AllowKeys.indexOf(keyCode) !== -1;

    const pressShortcut = detectCopyPaste(keyCode, e);

    if (pressShortcut === true) {
      this.setTestResult(false);
      return;
    }

    const currentValue = this.binput.getInstance().getValue();
    let currentValueLength = currentValue.length;

    if (this.currentMask.length === currentValueLength && this.specialKey === false) {
      e.preventDefault();
      this.setTestResult(false);
      return;
    }

    let typeOfMask = this.currentMask[currentValueLength];

    for (let i = currentValueLength; i < this.currentMask.length; i++) {
      typeOfMask = this.currentMask[i];
      const isExist = PredefinedMask.Regex[typeOfMask] !== undefined;
      if (isExist) {
        currentValueLength = i;
        break;
      }
    }

    const regex = PredefinedMask.Regex[typeOfMask];

    if (this.specialKey === false && (!regex || regex.test(key) === false)) {
      e.preventDefault();
      this.setTestResult(false);
      return;
    }

    this.setTestResult(true);

    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }
  }

  setDisable(value) {
    this.setState({ disabled: value });
  }

  getValue() {
    return { value: this.state.value, saltValue: this.state.saltValue };
  }

  resetValue() {
    return this.setState({ value: this.props.defaultValue });
  }

  onFocus(e) {
    this.setState({ focussed: true });

    if (this.props.type === 'IBAN' && this.state.value === '') {
      this.setState({ value: this.props.countryCode });
    }

    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }

  onBlur(e) {
    this.setState({ focussed: false });

    if (this.props.type === 'IBAN' && this.state.value === this.props.countryCode) {
      this.setState({ value: '' });
    }

    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }

  setCounter() {
    if (this.props.type === 'MobilePhoneNumber') {
      this.maxLength = undefined;
      return;
    }

    if (this.props.maxLength === -1) {
      const text = this.currentMask.split(this.disabledCounterCharacter).join('');
      this.maxLength = this.currentMask.length;
      this.maskedMaxLength = text.length;
    } else {
      this.maxLength = this.props.maxLength;
    }
  }

  generateHelperText() {
    let text = this.currentMask;
    PredefinedMask.MaskCharacter.forEach(element => {
      text = text.split(element);
      text = text.join('#');
    });
    return text;
  }

  runRender() {
    if (this.specialKey === false) {
      this.forceUpdate();
    }
  }

  render() {
    const { context, inputStyle, type, ...other } = this.props;
    const { value, focussed } = this.state;

    let inputValue = this.snapshotValue || this.state.value;
    let errorTextResult;

    const result = this.isCorrectFormatText(this.currentMask, inputValue);
    const compareValue = this.snapshotValue || result.value;

    inputValue = result.value || inputValue;

    if (this.isCorrectFormat && compareValue && compareValue.length !== this.currentMask.length) {
      this.isCorrectFormat = false;
    }

    if (this.isCorrectFormat === false && value !== '' && focussed === false) {
      errorTextResult = this.errorText;
    }

    let inputStyle2 = Object.assign({}, inputStyle);

    if (type === 'IBAN' && this.state.value !== '' && this.isCorrectFormat === true) {
      const filledTextSize = 13;
      inputStyle2 = Object.assign({ fontSize: filledTextSize }, inputStyle);
    }

    // iban ve kredi kartı için bilgi metni olmayacak.
    if (type === 'IBAN' || (type === 'CreditCard' && this.props.helperText === '')) {
      this.helperText = '';
    }

    this.setCounter();

    return (
      <Input
        context={context}
        ref={r => (this.binput = r)}
        {...other}
        type={this.props.inputType}
        disabled={this.state.disabled}
        errorText={this.props.errorText || errorTextResult}
        helperText={this.state.focussed ? this.helperText : ''}
        hintText={this.props.hintText || this.props.floatingLabelText}
        inputStyle={inputStyle2}
        maxLength={this.maxLength}
        maskedMaxLength={this.maskedMaxLength}
        value={inputValue}
        onChange={this.onChange}
        onClearClick={this.onClearClick}
        onKeyDown={this.onKeyDown}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        disabledCounterCharacter=" "
        showCounter={this.props.showCounter}
      />
    );
  }

  setTestResult(value) {
    /* istanbul ignore else */
    if (process.env.NODE_ENV === 'test') {
      this.testResult = value;
    }
  }
}

export default InputMask;

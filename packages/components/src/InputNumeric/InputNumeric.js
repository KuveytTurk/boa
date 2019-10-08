/* eslint-disable no-restricted-globals, max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { ComponentComposer, EditorBase } from '@kuveytturk/boa-base';
import { Input } from '../Input';
import { Localization } from '@kuveytturk/boa-utils';
import KeyboardEnum from './KeyboardEnum';

/**
 * Text field letting users enter and edit numeric inputs.
 */
@ComponentComposer
class InputNumeric extends EditorBase {
  static propTypes = {
    /**
     * Base properties from Input.
     */
    ...Input.propTypes,
    /**
     * Indicator for the text insertion point.
     */
    caretPosition: PropTypes.number,
    /**
     * Format for the numeric value such as 'D' for decimal.
     */
    format: PropTypes.string,
    /**
     * Max value for the numeric field.
     */
    maxValue: PropTypes.number,
    /**
     * Min value for the numeric field.
     */
    minValue: PropTypes.number,
    /**
     * Define increment size of the arrow keys.
     */
    step: PropTypes.number,
  };

  static defaultProps = {
    ...Input.defaultProps,
    format: 'D',
    step: 1,
  };

  state = {
    formattedValue: null,
    caretPosition: null,
    disabled: this.props.disabled,
  };

  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    const tempValue = (this.props.value || this.props.value === 0) ? this.props.value : this.props.defaultValue;
    this.state.formattedValue = this.getFormattedValue(tempValue);
  }

  componentWillReceiveProps(nextProps) {
    // null ise kasıtlı siliniyordur, silmeli.
    // undefined ise value geçilmemiştir, değişmemeli.
    // diğer durumlarda prop yada state'ten farklı gelmişse değişmeli.
    const { format, value, disabled, caretPosition } = nextProps;
    let shouldValueChange = false;

    if (value === null) {
      shouldValueChange = true;
    } else if (value !== undefined && (value !== this.props.value || value !== this.getValue())) {
      shouldValueChange = true;
    }

    if (shouldValueChange) {
      this.setValue(value, format);
    }

    if (disabled !== this.props.disabled) {
      this.setState({ disabled });
    }

    if (this.props.caretPosition !== caretPosition) {
      this.setState({ caretPosition });
    }
  }

  componentDidUpdate() {
    if (this.state.caretPosition !== null) {
      const inputElement = this.binput.getInstance().textField;
      /* istanbul ignore else */
      if (inputElement) {
        inputElement.setSelectionRange(this.state.caretPosition, this.state.caretPosition);
      }
    }
  }

  onKeyDown(e) {
    /* istanbul ignore next */
    const keyCode = e.keyCode || e.charCode || e.which;
    const delimiters = Localization.getDelimiters();
    const isTextCursorMoveKey = [
      KeyboardEnum.HOME,
      KeyboardEnum.END,
      KeyboardEnum.LEFT_ARROW,
      KeyboardEnum.RIGHT_ARROW,
    ].includes(keyCode);
    const isModifierKey = e.shiftKey || e.altKey || e.ctrlKey || e.metaKey;
    const isModifierUsedForClipboard =
      [KeyboardEnum.KEY_A, KeyboardEnum.KEY_C, KeyboardEnum.KEY_V].includes(keyCode) &&
      (e.ctrlKey === true || e.metaKey === true);

    const isModifierUsedForSelection = e.shiftKey && isTextCursorMoveKey;
    const isNumPadNumber = keyCode >= KeyboardEnum.NUMPAD_0 && keyCode <= KeyboardEnum.NUMPAD_9;
    const isBoardNumber = keyCode >= KeyboardEnum.KEY_0 && keyCode <= KeyboardEnum.KEY_9;
    const isNumberKey = isBoardNumber || isNumPadNumber;
    const isTextModifyKey = keyCode === KeyboardEnum.BACKSPACE || keyCode === KeyboardEnum.DELETE;
    const islostFocusKey = keyCode === KeyboardEnum.TAB;
    const isNotAffectingValidKey = keyCode === KeyboardEnum.INSERT;
    const isSignChangeKey = keyCode === KeyboardEnum.DASH || keyCode === KeyboardEnum.SUBTRACT;
    const isIncreaseDecreaseKey =
      e.keyCode === KeyboardEnum.UP_ARROW || e.keyCode === KeyboardEnum.DOWN_ARROW;

    let caretPosition;
    let isSeperatorKey = false;
    let returnValue = false;
    let tempValue;

    if (
      (keyCode === KeyboardEnum.COMMA || keyCode === KeyboardEnum.DECIMAL) &&
      delimiters.decimal === ','
    ) {
      isSeperatorKey = true;
    } else if (keyCode === KeyboardEnum.PERIOD && delimiters.decimal === '.') {
      isSeperatorKey = true;
    }

    if (isModifierKey) {
      if (isModifierUsedForClipboard || isModifierUsedForSelection) {
        returnValue = true;
      } else {
        returnValue = false;
      }
    } else if (isNumberKey) {
      const characterCode = isNumPadNumber ? keyCode - 48 : keyCode;
      const addedNumber = String.fromCharCode(characterCode);
      const oldValue = this.state.formattedValue || '';
      const newFormattedValue =
        oldValue.substring(0, e.target.selectionStart) +
        addedNumber +
        oldValue.substring(e.target.selectionEnd);

      const formattedValue = this.getFormattedValue(this.state.formattedValue);

      if (formattedValue !== this.getFormattedValue(newFormattedValue)) {
        const numericNewValue = this.getParsedValue(newFormattedValue);
        if (this.checkNumberRangeIsValid(numericNewValue)) {
          returnValue = true;
        }
      }
    } else if (islostFocusKey || isNotAffectingValidKey || isTextCursorMoveKey) {
      returnValue = true;
    } else if (isTextModifyKey) {
      tempValue = this.binput.getInstance().getValue();
      if (e.target.selectionStart === e.target.selectionEnd) {
        caretPosition = e.target.selectionStart;
        if (keyCode === KeyboardEnum.BACKSPACE) {
          if (caretPosition === 0) {
            // if cursor is at the first character, then do nothing
            returnValue = false;
          } else if (tempValue[caretPosition - 1] === delimiters.thousands) {
            // if the cursor on delimiters do nothing and jump cursor over it
            returnValue = false;
            this.setState({ caretPosition: caretPosition - 1 });
          } else {
            returnValue = true;
          }
        } else if (tempValue[caretPosition] === delimiters.thousands) {
          // if the key is delete again jump over delimiters
          returnValue = false;
          this.setState({ caretPosition: caretPosition + 1 });
        } else {
          returnValue = true;
        }
      } else {
        returnValue = true;
      }
    } else if (isSeperatorKey && this.props.format !== 'D') {
      // if format needs seperator then check it
      tempValue = this.binput.getInstance().getValue();
      if (!tempValue || tempValue.indexOf(delimiters.decimal) !== -1) {
        // seperator cannot be first character and cannot be more than one
        returnValue = false;
      } else {
        returnValue = true;
      }
    } else if (isSignChangeKey) {
      // if sign key pressed add it
      tempValue = null;
      if (this.state.formattedValue.indexOf('-') !== -1) {
        tempValue = this.state.formattedValue.replace('-', '');
      } else {
        tempValue = `-${this.state.formattedValue}`;
      }

      const numericNewValue = this.getParsedValue(tempValue);
      caretPosition = e.target.selectionStart;
      if (this.checkNumberRangeIsValid(numericNewValue)) {
        if (tempValue.indexOf('-') !== -1) {
          this.setState({ caretPosition: caretPosition + 1 });
        }
        this.setState({ formattedValue: tempValue });
      }
    } else if (isIncreaseDecreaseKey && this.state.formattedValue !== null && this.props.step) {
      let numericValue = this.getParsedValue(this.state.formattedValue);
      numericValue += e.keyCode === KeyboardEnum.UP_ARROW ? this.props.step : -1 * this.props.step;
      if (this.checkNumberRangeIsValid(numericValue)) {
        this.setState({ formattedValue: this.getFormattedValue(numericValue) });
      }
    }

    /* istanbul ignore else */
    if (process.env.NODE_ENV === 'test') {
      this.onKeyDownResult = returnValue;
    }

    if (this.props.onKeyDown) {
      this.props.onKeyDown(e);
    }

    if (!returnValue && e.preventDefault) {
      e.preventDefault();
    }

    return returnValue;
  }

  onChange(e) {
    const val = e.target.value;
    const caretPosition = e.target.selectionStart;
    const delimiters = Localization.getDelimiters();
    let formattedValue = null;

    if (this.checkNumberFormatIsValid(val)) {
      formattedValue = this.getFormattedValue(val);
    }

    this.setState({ formattedValue });

    if (formattedValue) {
      const delimetersArray = val.substring(0, caretPosition).match(new RegExp(`[${delimiters.thousands}]`, 'g')) || [];
      const delimitersCount = delimetersArray.length;

      const delimitersCountAfterFormat = (
        formattedValue
          .substring(0, caretPosition)
          .match(new RegExp(`[${delimiters.thousands}]`, 'g')) || []
      ).length;
      const newCaretPosition = caretPosition + delimitersCountAfterFormat - delimitersCount;
      this.setState({ caretPosition: newCaretPosition });
    } else {
      this.binput.getInstance().textField.value = '';
      this.forceUpdate();
    }

    if (this.props.onChange) {
      this.props.onChange(e, this.getParsedValue(formattedValue));
    }
  }

  onBlur(e) {
    e.persist();
    this.setState({ caretPosition: null }, (() => {
      /* istanbul ignore else */
      if (this.props.onBlur) {
        this.props.onBlur(e);
      }
    }));
  }

  getValue() {
    let inputValue;
    if (this.binput) {
      inputValue = this.binput.getInstance().getValue();
    }

    return this.getParsedValue(inputValue);
  }

  setValue(value, format) {
    if (!format) {
      format = this.props.format;
    }
    this.setState({ formattedValue: this.getFormattedValue(value, format) });
  }

  resetValue() {
    this.setState({
      formattedValue: this.getFormattedValue(this.props.defaultValue),
    });
  }

  setDisable(value) {
    this.setState({ disabled: value });
  }

  getSnapshot() {
    return this.state.formattedValue;
  }

  setSnapshot(snapshot) {
    this.setState({ formattedValue: snapshot });
  }

  checkNumberFormatIsValid(value) {
    if (!value || value === '' || value === '-' || value === '-0') {
      return true;
    }

    if (typeof value === 'string') {
      const delimiters = Localization.getDelimiters();

      if (value.indexOf(delimiters.thousands + delimiters.thousands) !== -1) {
        return false;
      }
      const tempValue = value.replace(new RegExp(`[${delimiters.thousands}]`, 'g'), '');

      if (this.props.format !== 'D' && tempValue.indexOf(delimiters.decimal) !== -1) {
        const splittedValues = tempValue.split(delimiters.decimal);

        if (
          splittedValues.length === 2 &&
          !isNaN(Number(splittedValues[0])) &&
          (splittedValues[1] === '' || !isNaN(Number(splittedValues[1])))
        ) {
          return true;
        }
        return false;
      }

      return !isNaN(Number(tempValue));
    }
    return true;
  }

  checkNumberRangeIsValid(value) {
    return (this.props.minValue === undefined || value >= this.props.minValue) &&
      (this.props.maxValue === undefined || value <= this.props.maxValue);
  }

  getParsedValue(value) {
    if (value) {
      const delimiters = Localization.getDelimiters();
      const tempValue =
        typeof value === 'number'
          ? value
          : value.replace(new RegExp(`[${delimiters.thousands}]`, 'g'), '');
      const numberValue =
        this.props.format === 'D'
          ? Localization.getIntegerValue(tempValue)
          : Localization.getFloatValue(tempValue);
      /* istanbul ignore else */
      if (!isNaN(numberValue)) {
        return numberValue;
      }
    }
    return null;
  }

  getFormattedValue(value, format) {
    const nextFormat = format || this.props.format;

    if (value === undefined) {
      return null;
    }

    if (value === null || value === '') {
      if (this.binput) {
        // I also dont want to do this :) Bc of paste non numeric string this is done.
        this.binput.getInstance().textField.value = '';
        this.forceUpdate();
        return '';
      }
    }
    const delimiters = Localization.getDelimiters();

    if (typeof value === 'string') {
      if (!value || value === '' || value === '-' || value.indexOf('-0') !== -1) {
        return value;
      }
      if (nextFormat !== 'D') {
        let tempValue = value.replace(new RegExp(`[${delimiters.thousands}]`, 'g'), '');
        if (tempValue.indexOf(delimiters.decimal) !== -1) {
          const splittedValues = tempValue.split(delimiters.decimal);
          const formatted = Localization.formatCurrency(splittedValues[0], nextFormat);
          const splittedAfterFormat = formatted.split(delimiters.decimal);

          return (
            splittedAfterFormat[0] +
            delimiters.decimal +
            (splittedAfterFormat[1].length > splittedValues[1].length
              ? splittedAfterFormat[1]
              : splittedValues[1].substring(0, splittedAfterFormat[1].length))
          );
        }

        tempValue = Localization.formatCurrency(tempValue, nextFormat);
        if (tempValue.indexOf(delimiters.decimal) !== -1) {
          return tempValue.substring(0, tempValue.indexOf(delimiters.decimal));
        }
        return tempValue;
      }

      return Localization.formatCurrency(value, nextFormat);
    }

    return Localization.formatCurrency(value, nextFormat);
  }

  focus() {
    this.binput.getInstance().focus();
  }

  validateConstraint() {
    return this.binput.getInstance().validateConstraint();
  }

  render() {
    const { context, ...others } = this.props;
    return (
      <Input
        ref={r => (this.binput = r)}
        context={context}
        {...others}
        type="text"
        errorText={this.props.errorText}
        value={this.state.formattedValue}
        onChange={this.onChange}
        onFocus={this.props.onFocus}
        onBlur={this.onBlur}
        onKeyDown={this.onKeyDown}
        disabled={this.state.disabled}
      />
    );
  }
}

export default InputNumeric;

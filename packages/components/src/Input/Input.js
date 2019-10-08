import React from 'react';
import PropTypes from 'prop-types';
import uniqueId from 'lodash/uniqueId';
import { findDOMNode } from 'react-dom';
import MuiInput from '@material-ui/core/Input';
import MuiInputLabel from '@material-ui/core/InputLabel';
import MuiInputAdornment from '@material-ui/core/InputAdornment';
import MuiFormControl from '@material-ui/core/FormControl';
import MuiFormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';
import { ComponentComposer, EditorBase } from '@kuveytturk/boa-base';
import { getTimeInfo, hasValue } from './utils';
import { IconButton } from '../IconButton';

function baseStyles(theme) {
  const { boaPalette } = theme;
  return {
    input: {
      color: boaPalette.base450,
      fontSize: 14,
      caretColor: boaPalette.pri500,
      padding: 0,
      marginBottom: 3,
      // minHeight: 19,
    },
    inputLabel: {
      fontSize: 14,
      width: '100%',
    },

    inputLabeRootBase: {
      fontSize: 14,
      width: '100%',
      marginTop: -3,
      transformOrigin: `top ${theme.direction === 'ltr' ? 'left' : 'right'}`,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      lineHeight: '16px',
    },
  };
}

const styles = theme => {
  const { boaPalette } = theme;
  return {
    input: Object.assign(baseStyles(theme).input, {
      marginRight: theme.direction === 'rtl' ? 0 : null,
      marginLeft: theme.direction === 'ltr' ? 0 : null,
    }),
    multiline: Object.assign(baseStyles(theme).input, {
      padding: '3px 0 3px',
      marginTop: '13px !important',
      lineHeight: '16px',
    }),

    inputDisabled: {
      // underline da kullandığı için içi boş olsa da gerekli
    },

    inputfocused: {
      // underline da kullandığı için içi boş olsa da gerekli
    },

    inputError: Object.assign(baseStyles(theme).input, {}),

    inputUnderline: {
      '&:after': {
        borderBottom: `2px solid ${boaPalette.pri500}`,
      },

      '&:before': {
        borderBottom: `1px solid ${boaPalette.base250}`,
      },

      '&:hover:not($inputDisabled):not($inputfocused):not($inputError):before': {
        borderBottom: `1px solid ${theme.boaPalette.base400}`,
      },
    },

    inputUnderlineRequired: {
      '&:after': {
        borderBottom: `2px solid ${boaPalette.pri500}`,
      },

      '&:before': {
        borderBottom: `1px solid ${boaPalette.obli400}`,
      },

      '&:hover:not($inputDisabled):not($inputfocused):not($inputError):before': {
        borderBottom: `2px solid ${theme.boaPalette.obli400}`,
      },
    },

    inputType: {
      height: 'auto', // pasword fix
    },

    inputLabelShink: Object.assign(baseStyles(theme).inputLabel, {
      paddingTop: '2px !important',
      marginTop: '0px !important',
      color: boaPalette.pri500,
    }),

    inputLabelRoot: Object.assign(baseStyles(theme).inputLabeRootBase, {}),

    inputLabelRootTransparent: Object.assign(baseStyles(theme).inputLabeRootBase, {
      color: 'transparent',
    }),
    inputLabelRootDisabled: Object.assign(baseStyles(theme).inputLabeRootBase, {
      color: boaPalette.base250,
    }),
  };
};

/**
 * Text fields let users enter and edit text.
 */
@ComponentComposer
@withStyles(styles)
class Input extends EditorBase {
  static propTypes = {
    /**
     * Base properties from EditorBase.
     */
    ...EditorBase.propTypes,
    /**
     * Information text that is located in bottom left side of the input element.
     */
    bottomLeftInfo: PropTypes.string,
    /**
     * If `true`, the bottomLeftInfo is shown.
     */
    bottomLeftInfoEnable: PropTypes.bool,
    /**
     * Information text that is located in bottom right side of the input element.
     */
    bottomRightInfo: PropTypes.string,
    /**
     * If `true`, the bottomRightInfo is shown.
     */
    bottomRightInfoEnable: PropTypes.bool,
    /**
     * The text string used as the default value.
     */
    defaultValue: PropTypes.any,
    /**
     * Character that is not involved in counting operation.
     */
    disabledCounterCharacter: PropTypes.string,
    /**
     * Styles applied to the input element in the error state.
     */
    errorStyle: PropTypes.object,
    /**
     *  Message to display when the input is in an error state.
     *  When this is present, the component is also visually highlighted to indicate it is in error.
     */
    errorText: PropTypes.string,
    /**
     * The style object to use to override floating label styles.
     */
    floatingLabelStyle: PropTypes.object,
    /**
     * The content to use for the floating label element.
     */
    floatingLabelText: PropTypes.string,
    /**
     * Override the inline-styles of the root element.
     */
    formControlStyle: PropTypes.object,
    /**
     * If `false`, the width property of the field is assigned 100.
     */
    fullWidth: PropTypes.bool,
    /**
     * The content to use for the helper text element.
     */
    helperText: PropTypes.string,
    /**
     * The hint content to display.
     */
    hintText: PropTypes.string,
    /**
     * The id prop for the text field.
     */
    id: PropTypes.string,
    /**
     * If `true`, the component transforms itself into grid mode.
     */
    inlineGridMode: PropTypes.bool,
    /**
     * Alingment of the text in the input element.
     */
    inputAlign: PropTypes.oneOf(['left', 'right', 'center']),
    /**
     * Attributes applied to the input element.
     */
    inputProps: PropTypes.object,
    /**
     * Override the inline-styles of the TextField's input element.
     * When multiLine is false: defines the style of the input element.
     * When multiLine is true: defines the style of the container of the textarea.
     */
    inputStyle: PropTypes.object,
    /**
     * Maximum character count of masked input element.
     */
    maskedMaxLength: PropTypes.number,
    /**
     * Maximum character count of input element.
     */
    maxLength: PropTypes.number,
    /**
     * If true, a textarea element is rendered.
     * The textarea also expands and shrinks according to the number of lines.
     */
    multiLine: PropTypes.bool,
    /**
     * Name applied to the input.
     */
    name: PropTypes.string,
    /**
     * If `true`, the element is not wrapped.
     */
    noWrap: PropTypes.bool,
    /**
     * Callback function for the input blur.
     */
    onBlur: PropTypes.func,
    /**
     * Callback function when the input changed.
     */
    onChange: PropTypes.func,
    /**
     * Callback function when the input is changed sync.
     */
    onChangeSync: PropTypes.func,
    /**
     * Callback function when clear button of the input is clicked.
     */
    onClearClick: PropTypes.func,
    /**
     * Callback function when the input is focused.
     */
    onFocus: PropTypes.func,
    /**
     * Callback function when a key is down.
     */
    onKeyDown: PropTypes.func,
    /**
     * Callback function when a key is up.
     */
    onKeyUp: PropTypes.func,
    /**
     * Callback function when the timer ends.
     */
    onTimerFinished: PropTypes.func,
    /**
     * Shows prefix text of the input element text.
     */
    prefixText: PropTypes.any,
    /**
     * Number of rows to display when multiLine option is set to true.
     */
    rows: PropTypes.number,
    /**
     * Maximum number of rows to display when
     * multiLine option is set to true.
     */
    rowsMax: PropTypes.number,
    /**
     * Shows clear button on the right side of the component.
     */
    showClearButton: PropTypes.bool,
    /**
     * Shows counter on the right bottom info.
     */
    showCounter: PropTypes.bool,
    /**
     * Shows suffix text of the input element text.
     */
    suffixText: PropTypes.any,
    /**
     * Sets start and end positions of the current text selection.
     */
    textSelection: PropTypes.object,
    /**
     * Timer shown on the right bottom info, showing duration in seconds.
     */
    timerDuration: PropTypes.number,
    /**
     * Specifies type of the input to display
     * such as "password" or "text".
     */
    type: PropTypes.oneOf(['password', 'text', 'numeric']),
    /**
     * If true, the underline is shown.
     */
    underlineShow: PropTypes.bool,
    /**
     * Value of the text field.
     */
    value: PropTypes.any,
  };

  static defaultProps = {
    ...EditorBase.defaultProps,
    fullWidth: true,
    multiLine: false,
    rows: 1,
    defaultValue: '',
    bottomLeftInfoEnable: true,
    bottomRightInfoEnable: true,
    disabledCounterCharacter: '',
    showCounter: false,
    showClearButton: false,
    inlineGridMode: false,
    underlineShow: true,
  };

  state = {
    value: this.props.defaultValue ? this.props.defaultValue : this.props.value,
    disabled: this.props.disabled,
  };

  constructor(props, context) {
    super(props, context);
    this.onBlur = this.onBlur.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.setTimer = this.setTimer.bind(this);
    this.validationResult = this.props.validationResult || [];
  }

  componentWillReceiveProps(nextProps) {
    const { value, disabled, timerDuration } = nextProps;
    this.counterUpdate(nextProps);
    if (timerDuration !== this.props.timerDuration) {
      this.setTimer(timerDuration);
    }

    if (value === null) {
      this.setState({ value: '' });
    } else if (value !== undefined && (value !== this.props.value || value !== this.state.value)) {
      this.setState({ value });
    }

    if (disabled !== this.props.disabled) {
      this.setState({ disabled });
    }
  }

  counterUpdate(props, value) {
    const bottomRightInfoSpan = findDOMNode(this.bottomRightInfoSpan);
    if (bottomRightInfoSpan && props.maxLength && !props.bottomRightInfo && !props.timerDuration) {
      let counterText = 0;
      let text = '';
      if (value) {
        text = value;
      } else if (props.value) {
        text = props.value.toString();
      }
      if (text !== '') {
        if (this.props.disabledCounterCharacter !== '') {
          text = text.split(this.props.disabledCounterCharacter);
          text = text.join('');
        }
      }
      counterText = text.length;
      findDOMNode(this.bottomRightInfoSpan).innerText = counterText;
    }
  }

  componentDidUpdate() {
    const textSelection = this.props.textSelection;
    if (textSelection && textSelection.start && textSelection.end) {
      // eslint-disable-next-line
      this.textField && this.textField.setSelectionRange(textSelection.start, textSelection.end);
    }
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  componentDidMount() {
    this.counterUpdate(this.props, this.props.defaultValue);
    if (this.props.timerDuration) {
      this.setTimer(this.props.timerDuration);
    }
  }

  getValue() {
    return this.state.value;
  }

  setValue(value) {
    this.setState({ value });
  }

  resetValue() {
    this.setState({ value: this.props.defaultValue });
  }

  setDisable(value) {
    this.setState({ disabled: value });
  }

  onBlur(e) {
    this.setState({ focussed: false });
    // this.validateConstraint();
    /* istanbul ignore else */
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }

  onChange(e, v) {
    v = e.target.value;
    this.counterUpdate(this.props, v);
    this.setState({ value: v }, () => {
      /* istanbul ignore if */
      if (this.props.onChangeSync) {
        this.props.onChangeSync(e, v);
      }
    });
    /* istanbul ignore else */
    if (this.props.onChange) {
      this.props.onChange(e, v);
    }
    /* istanbul ignore if */
    if (this.props.onDynamicChange) {
      this.props.onDynamicChange(e);
    }
  }

  onFocus(e) {
    this.setState({ focussed: true });
    /* istanbul ignore else */
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
  }

  setTimer(duration) {
    let timer = duration;
    const self = this;

    if (this.intervalId) {
      clearInterval(self.intervalId);
    }

    this.intervalId = setInterval(() => {
      const bottomSpan = findDOMNode(self.bottomRightInfoSpan);
      if (bottomSpan) {
        bottomSpan.innerText = getTimeInfo(timer);
        if (--timer < 0) {
          clearInterval(self.intervalId);
          /* istanbul ignore else */
          if (self.props.onTimerFinished) {
            self.props.onTimerFinished();
          }
        }
      }
    }, 1000);
  }

  focus() {
    this.textField.focus();
  }

  render() {
    const {
      name,
      context,
      timerDuration,
      bottomLeftInfo,
      bottomLeftInfoEnable,
      bottomRightInfo,
      bottomRightInfoEnable,
      floatingLabelText,
      helperText,
      inputAlign,
      maxLength,
      fullWidth,
      rows,
      type,
      rowsMax,
      prefixText,
      showClearButton,
      showCounter,
      inputProps,
      underlineShow,
    } = this.props;

    let { errorText, hintText, suffixText } = this.props;
    const { value, disabled, focussed } = this.state;

    if (showClearButton && hasValue(value) && !disabled) {
      suffixText = (
        <div style={{
          display: 'inline-flex',
        }}>
          <IconButton
            dynamicIcon="Close"
            iconProperties={{
              style: { color: this.props.context.theme.boaPalette.base300 },
            }}
            onClick={e => {
              const v = '';
              this.counterUpdate(this.props, v);
              this.setState({ value: v }, () => {
                /* istanbul ignore if */
                if (this.props.onChangeSync) {
                  this.props.onChangeSync(e, v);
                }
              });
              /* istanbul ignore else */
              if (this.props.onClearClick) {
                this.props.onClearClick(e, v);
              }
              /* istanbul ignore else */
              if (this.props.onChange) {
                this.props.onChange(e, v);
              }
              /* istanbul ignore if */
              if (this.props.onDynamicChange) {
                this.props.onDynamicChange(e);
              }
            }}
            style={{
              width: 24,
              height: 24,
            }}
            context={this.props.context}
            disabled={this.state.disabled}
            tabIndex="-1"
          />
          {suffixText}
        </div>
      );
    }

    const bottomTextSize = 11;
    const infoTextColor = context.theme.boaPalette.base300;
    const errorTextColor = context.theme.boaPalette.error500;

    if (this.validationResult && this.validationResult.length > 0) {
      errorText = this.validationToString();
    }

    const isRtl = this.props.context.localization.isRightToLeft;

    const textAlignStyle = inputAlign || (isRtl ? 'right' : 'left');
    const inputStyleProp = this.props.inputStyle ? Object.assign({}, this.props.inputStyle) : {};
    const inputStyle = Object.assign(inputStyleProp, { textAlign: textAlignStyle });

    // hint değeri atanmamış ise floating atanıyor.
    if (hintText == null) {
      hintText = floatingLabelText;
    }

    // bottomInfo section
    let bottomLeftInfoSpace;
    const lastBottomLeftInfo = bottomLeftInfo || helperText;
    if (bottomLeftInfoEnable && lastBottomLeftInfo && this.state.disabled === false) {
      const bottomLeftInfoStyle = {
        fontSize: bottomTextSize,
        color: infoTextColor,
        display: errorText ? 'none' : '', // if errorText is visible, hide helperText
        marginTop: 1,
      };
      if (!isRtl) {
        bottomLeftInfoStyle.left = 0;
        bottomLeftInfoStyle.float = 'left';
      } else {
        bottomLeftInfoStyle.right = 0;
        bottomLeftInfoStyle.float = 'right';
      }
      bottomLeftInfoSpace = (
        <span style={bottomLeftInfoStyle}>
          <span ref={r => (this.bottomLeftInfoSpan = r)}>{lastBottomLeftInfo}</span>
        </span>
      );
    }

    let bottomRightInfoSpace;
    if (bottomRightInfoEnable && this.state.disabled === false) {
      const bottomRightInfoStyle = {
        fontSize: bottomTextSize,
        color: infoTextColor,
        marginTop: errorText ? -9 : 3,
      };
      if (!isRtl) {
        bottomRightInfoStyle.right = 0;
        bottomRightInfoStyle.float = 'right';
      } else {
        bottomRightInfoStyle.left = 0;
        bottomRightInfoStyle.float = 'left';
      }
      if (bottomRightInfo) {
        bottomRightInfoSpace = (
          <span style={bottomRightInfoStyle}>
            <span ref={r => (this.bottomRightInfoSpan = r)}>{bottomRightInfo}</span>
          </span>
        );
      } else if (timerDuration) {
        bottomRightInfoSpace = (
          <span style={bottomRightInfoStyle}>
            <span ref={r => (this.bottomRightInfoSpan = r)}>
              {getTimeInfo(this.props.timerDuration)}
            </span>
          </span>
        );
      } else if (showCounter && maxLength) {
        bottomRightInfoSpace = (
          <span style={bottomRightInfoStyle}>
            <span ref={r => (this.bottomRightInfoSpan = r)}>0</span>/
            {this.props.maskedMaxLength || maxLength}
          </span>
        );
      }
    }

    const errorStyle = {
      color: errorTextColor,
      fontSize: bottomTextSize,
      marginTop: 6,
      marginBottom: 10,
      textAlign: isRtl ? 'right' : 'left',
      ...this.props.errorStyle,
    };

    const bottomInfoStyle = {
      marginTop: 2,
    };

    const inputPropsMerged = Object.assign(
      {},
      {
        ref: r => {
          this.textField = r;
        },
        maxLength,
        style: inputStyle,
      },
      inputProps,
    );
    const id = this.props.id || uniqueId();

    // error validation
    let error = false;
    if (errorText) {
      error = true;
    }

    const baseRootStyle = {
      width: '100%',
      display: 'inline-block',
      position: 'relative',
      paddingTop: 10,
      marginTop: 0,
    };
    const rootStyle = Object.assign(baseRootStyle, this.props.style);
    let visibleLabel = true;

    if (!focussed) {
      visibleLabel = true;
    } else if (focussed && (value == null || value === undefined || value === '')) {
      visibleLabel = false;
    }

    let shink = false;
    if (focussed) {
      shink = true;
    } else if (value != null && value !== undefined && value !== '') {
      shink = true;
    }

    const floatingLabelRootStyle = Object.assign(
      { display: visibleLabel === false ? 'none' : undefined },
      this.props.floatingLabelStyle || {},
      hasValue(value) === false ? { textAlign: textAlignStyle } : {},
      isRtl ? { transformOrigin: 'top right' } : { transformOrigin: 'top left' },
    );

    const { classes } = this.props;

    let underlineClass = classes.inputUnderline;
    const valueConstraint = this.props.valueConstraint;

    if (valueConstraint && valueConstraint.required) {
      if (!this.getValue()) {
        underlineClass = classes.inputUnderlineRequired;
      }
    }

    const { inputLabelRootDisabled, inputLabelRoot } = classes;
    let formHelperText;

    if (!this.props.inlineGridMode) {
      if (error) {
        formHelperText = (
          <MuiFormHelperText style={errorStyle} disabled={this.state.disabled}>
            {errorText}
          </MuiFormHelperText>
        );
      } else if (bottomLeftInfoSpace || bottomRightInfoSpace) {
        formHelperText = (
          <div style={bottomInfoStyle}>
            <MuiFormHelperText style={{ marginTop: 0 }} disabled={this.state.disabled}>
              {bottomLeftInfoSpace}
              {bottomRightInfoSpace}
            </MuiFormHelperText>
          </div>
        );
      } else {
        formHelperText = (
          <MuiFormHelperText
            style={{ marginTop: 0 }}
            disabled={this.state.disabled} />
        );
      }
    } else {
      formHelperText = null;
    }

    return (
      <div style={rootStyle}>
        <MuiFormControl
          disabled={this.state.disabled}
          fullWidth={this.props.fullWidth}
          style={this.props.formControlStyle}
        >
          {floatingLabelText && !this.props.inlineGridMode && (
            <MuiInputLabel
              classes={{
                shrink: classes.inputLabelShink,
                root: this.state.disabled ? inputLabelRootDisabled : inputLabelRoot,
              }}
              margin={'dense'}
              htmlFor={id}
              // gelen style inline olarak uygulanır, sınıflardan geleni ezer.
              style={floatingLabelRootStyle}
              disabled={this.state.disabled}
              shrink={shink}
            >
              {this.props.floatingLabelText}
            </MuiInputLabel>
          )}
          <MuiInput
            classes={{
              input: classes.input,
              underline: underlineClass,
              multiline: classes.multiline,
              inputType: classes.inputType,
              disabled: classes.inputDisabled,
            }}
            name={name}
            id={id}
            rows={rows}
            rowsMax={rowsMax}
            inputProps={inputPropsMerged}
            inputRef={this.props.inputRef}
            fullWidth={fullWidth}
            type={type}
            // style={this.props.inputStyle}
            value={this.state.value}
            disabled={this.state.disabled}
            disableUnderline={!underlineShow}
            multiline={this.props.multiLine}
            error={!this.state.disabled && error}
            onBlur={this.onBlur}
            onChange={this.onChange}
            onFocus={this.onFocus}
            onKeyDown={this.props.onKeyDown}
            onKeyUp={this.props.onKeyUp}
            placeholder={hintText}
            startAdornment={
              prefixText && (
                <MuiInputAdornment
                  style={{
                    marginTop: -11,
                    marginRight: this.props.context.localization.isRightToLeft ? -4 : 0,
                    ...this.props.startAdornmentStyle,
                  }}
                  position="start"
                >
                  {prefixText}
                </MuiInputAdornment>
              )
            }
            endAdornment={
              suffixText && (
                <MuiInputAdornment
                  style={{
                    marginTop: -11,
                    marginLeft: this.props.context.localization.isRightToLeft ? -4 : 0,
                    ...this.props.endAdornmentStyle,
                  }}
                  position="end"
                >
                  {suffixText}
                </MuiInputAdornment>
              )
            }
          />
          {formHelperText}
        </MuiFormControl>
      </div>
    );
  }

  validationToString() {
    return this.validationResult[0].message;
  }
}

export default Input;

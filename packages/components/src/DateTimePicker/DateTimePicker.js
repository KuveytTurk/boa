import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from './DatePicker';
import { ComponentBase, ComponentComposer } from '@kuveytturk/boa-base';
import { IconButton } from '../IconButton';
import {
  getFormatDecomposition,
  receiveFormat,
  momentFormat,
  isEqualDateTime,
  getDatePickerStyle,
  getDefaultDate,
  getDateToString,
  checkDateForBusiness,
} from './dateUtils';

let maxHour;
let maxMinute;
let maxSecond;
let minHour;
let minMinute;
let minSecond;

/**
 * The DateTimePicker allows users to enter a date and time by choosing a datetime.
 * It is created using several components and directives that work together.
 * */
@ComponentComposer
class DateTimePicker extends ComponentBase {
  static propTypes = {
    /**
     * Base properties from ComponentBase.
     */
    ...ComponentBase.propTypes,
    /**
     * Cancel label.
     */
    cancelLabel: PropTypes.string,
    /**
     * If `false`, selecting past dates is not allowed.
     */
    canSelectOldDates: PropTypes.bool,
    /**
     * If `false`, selecting special days is not allowed.
     */
    canSelectSpecialDays: PropTypes.bool,
    /**
     * If `false`, selecting weekend days is not allowed.
     */
    canSelectWeekendDays: PropTypes.bool,
    /**
     * @ignore
     */
    dateOnChange: PropTypes.func,
    /**
     * Default selected value for uncontrolled usage.
     * Prop can be a Date object or a UTC formatted string.
     */
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    /**
     * Error text for the date part of the component.
     */
    errorTextDate: PropTypes.string,
    /**
     * Error text for the time part of the component.
     */
    errorTextTime: PropTypes.string,
    /**
     * First day of the week. Default: 1, Monday.
     */
    firstDayOfWeek: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),
    /**
     * Floating label text for the date input.
     */
    floatingLabelTextDate: PropTypes.string,
    /**
     * Floating label text for the text input.
     */
    floatingLabelTextTime: PropTypes.string,
    /**
     * Picker format
     */
    format: PropTypes.string.isRequired,
    /**
     * If `false`, width property of the field is assigned 100.
     */
    fullWidth: PropTypes.bool,
    /**
     * Hint text for the date input.
     */
    hintTextDate: PropTypes.string,
    /**
     * Hint text for the text input.
     */
    hintTextTime: PropTypes.string,
    /**
     * OK
     */
    inlineGridMode: PropTypes.bool,
    /**
     * @ignore
     */
    isBusiness: PropTypes.bool,
    /**
     * isFlexMode
     */
    isFlexMode: PropTypes.bool,
    /**
     * Selectable max date. Prop can be a Date object or a UTC formatted string.
     */
    maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    /**
     * Selectable minimum date. Prop can be a Date object or a UTC formatted string.
     */
    minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    /**
     * Calendar dialog type.
     */
    mode: PropTypes.oneOf(['portrait', 'landscape']),
    /**
     * If `true`, the dialog will render inline mode.
     */
    noDialog: PropTypes.bool,
    /**
     * OK
     */
    okLabel: PropTypes.string,
    /**
     * @ignore
     */
    onChange: PropTypes.func,
    /**
     * @ignore
     */
    openBoaCalendar: PropTypes.bool,
    /**
     * @ignore
     */
    pageType: PropTypes.oneOf(['browse', 'transactional']),
    /**
     * @ignore
     */
    timeOnChange: PropTypes.func,
    /**
     * Selected date. Prop can be a Date object or a UTC formatted string.
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
  };

  static defaultProps = {
    ...ComponentBase.defaultProps,
    firstDayOfWeek: 1,
    mode: 'portrait',
    hintTextDate: '',
    hintTextTime: '',
    floatingLabelTextDate: '',
    floatingLabelTextTime: '',
    fullWidth: true,
    defaultValue: null,
    isBusiness: false,
    format: 'DDMMYYYY hmmss',
    canSelectOldDates: true,
    canSelectWeekendDays: false,
    canSelectSpecialDays: false,
    pageType: 'browse',
    inlineGridMode: false,
    noDialog: false,
    minDate: new Date(1950, 0, 1, 1, 3, 5),
    maxDate: new Date(2099, 11, 30, 20, 3, 14),
    isFlexMode: false,
  };

  formats = getFormatDecomposition(this.props.format);

  state = {
    formats: this.formats,
    dateFormat: this.formats.dateFormat,
    timeFormat: this.formats.timeFormat,
    value: getDateToString(
      this.props.value || getDefaultDate(this.props),
      getDefaultDate(this.props),
    ), // eslint-disable-line max-len
    autoOk: false,
    disableYearSelection: false,
    datetimeOption: {
      isHour: this.formats.timeFormat !== undefined,
      isMinute: this.formats.timeFormat !== undefined,
      isSecond: !(
        this.formats.timeFormat === undefined ||
        this.formats.timeFormat === momentFormat.hourAndMinute
      ), // eslint-disable-line max-len
    },
    mode: this.props.mode,
    container: 'inline',
    canSelectOldDates: this.props.canSelectOldDates,
    canSelectWeekendDays: this.props.canSelectWeekendDays,
    canSelectSpecialDays: this.props.canSelectSpecialDays,
    disabled: this.props.disabled,
    minDate: getDateToString(this.props.minDate, Date(1950, 0, 1)),
    maxDate: getDateToString(this.props.maxDate, new Date(2099, 11, 30)),
  };

  constructor(props, context) {
    super(props, context);
    this.onChange = this.onChange.bind(this);
    this.dateOnChange = this.dateOnChange.bind(this);
    this.timeOnChange = this.timeOnChange.bind(this);
    this.handleRemoveDate = this.handleRemoveDate.bind(this);
    this.handleAddDate = this.handleAddDate.bind(this);
    this.dateUpdate = this.dateUpdate.bind(this);
  }

  onChange(event, value) {
    if (this.props.onChange) {
      this.props.onChange(event, value);
    }
    if (this.props.onDynamicChange) {
      this.props.onDynamicChange(event);
    }
  }

  /* eslint-disable no-unused-vars */
  dateOnChange(event, value, addTimezoneOffset = true) {
    this.setState({ value }, () => {
      if (this.props.dateOnChange) {
        this.props.dateOnChange(event, this.getValue());
      }
      this.onChange(event, this.getValue());
    });
  }

  timeOnChange(event, value) {
    this.setState({ value }, () => {
      if (this.props.timeOnChange) {
        this.props.timeOnChange(event, this.getValue());
      }
      this.onChange(event, this.getValue());
    });
  }

  handleRemoveDate(e) {
    let handleDate;
    if (this.getValue()) {
      const oldDate = new Date(this.getValue());
      handleDate = new Date(this.getValue());
      handleDate.setDate(handleDate.getDate() - 1);
      handleDate = this.dateUpdate(oldDate, handleDate, -1);
      this.dateOnChange(e, handleDate, false);
    } else {
      handleDate = new Date();
      handleDate.setDate(handleDate.getDate() - 1);
      handleDate = this.dateUpdate(handleDate, handleDate, -1);
      this.dateOnChange(e, handleDate, true);
    }
  }

  handleAddDate(e) {
    let handleDate;
    if (this.getValue()) {
      const oldDate = new Date(this.getValue());
      handleDate = new Date(this.getValue());
      handleDate.setDate(handleDate.getDate() + 1);
      handleDate = this.dateUpdate(oldDate, handleDate, 1);
      this.dateOnChange(e, handleDate, false);
    } else {
      handleDate = new Date();
      handleDate.setDate(handleDate.getDate() + 1);
      handleDate = this.dateUpdate(handleDate, handleDate, 1);
      this.dateOnChange(e, handleDate, true);
    }
  }

  dateUpdate(oldDate, newDate, changeType, isSetState) {
    const setNewDate = checkDateForBusiness(this.props, oldDate, newDate, changeType, isSetState);
    if (isSetState) {
      this.setState({ dialogNewSelectDate: setNewDate });
    }
    if (this.props.dateUpdate) {
      this.props.dateUpdate(oldDate, setNewDate, changeType);
    }
    return setNewDate;
  }

  getValue() {
    if (this.state.value) {
      const formats = getFormatDecomposition(this.props.format);
      const returnDate = this.state.value;
      if (formats.timeFormat === undefined) {
        return returnDate;
      }
      return returnDate;
      // return clearTimeZone(returnDate);
    }
    return this.state.value;
  }

  resetValue() {
    this.setState({
      value: getDefaultDate(this.props),
    });
  }

  setDisable(value) {
    this.setState({ disabled: value });
  }

  getSnapshot() {
    return { state: this.state };
  }

  setSnapshot(snapshot) {
    const { state } = snapshot;
    this.setState({ ...state });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.format !== this.props.format ||
      nextProps.canSelectOldDates !== this.props.canSelectOldDates ||
      nextProps.canSelectWeekendDays !== this.props.canSelectWeekendDays ||
      nextProps.canSelectSpecialDays !== this.props.canSelectSpecialDays ||
      nextProps.disabled !== this.props.disabled ||
      !isEqualDateTime(nextProps.value, this.props.value) ||
      !isEqualDateTime(this.props.minDate, nextProps.minDate) ||
      !isEqualDateTime(this.props.maxDate, nextProps.maxDate) ||
      nextProps.mode !== this.props.mode
    ) {
      const date = getDateToString(nextProps.value, new Date());
      const minDate = getDateToString(nextProps.minDate, this.props.minDate);
      const maxDate = getDateToString(nextProps.maxDate, this.props.maxDate);
      const formats = getFormatDecomposition(nextProps.format);
      const datetimeOption = {
        isHour: formats.timeFormat !== undefined,
        isMinute: formats.timeFormat !== undefined,
        isSecond: !(
          formats.timeFormat === undefined || formats.timeFormat === momentFormat.hourAndMinute
        ), // eslint-disable-line max-len
      };

      this.setState({
        value: date,
        formats,
        dateFormat: formats.dateFormat,
        timeFormat: formats.timeFormat,
        canSelectOldDates: nextProps.canSelectOldDates,
        canSelectWeekendDays: nextProps.canSelectWeekendDays,
        canSelectSpecialDays: nextProps.canSelectSpecialDays,
        disabled: nextProps.disabled,
        datetimeOption,
        mode: nextProps.mode,
        minDate,
        maxDate,
      });
    }
  }

  validateConstraint() {
    return this.picker ? this.picker.validateConstraint() : true;
  }

  render() {
    maxHour = 23;
    maxMinute = 59;
    maxSecond = 59;
    minHour = 0;
    minMinute = 0;
    minSecond = 0;

    const datePicker = getDatePickerStyle(this.props.context);

    const dialogContentStyle = {
      minWidth: this.state.mode === 'landscape' ? 479 : 300,
    };
    const containerStyle = {
      minHeight: this.state.mode === 'landscape' ? 330 : 370,
      minWidth: this.state.mode === 'landscape' ? 479 : 300,
    };
    const isRtl = this.props.context.localization.isRightToLeft;
    let datePaddingLeft = 0;
    let timePaddingLeft = 0;
    if (isRtl) {
      datePaddingLeft = 24;
    } else {
      timePaddingLeft = 24;
    }

    const baseContainerIconStyle = {
      width: 16,
      height: 16,
      marginTop: 5,
    };

    const style = {
      dateTimePickerContainer: {
        display: datePicker.equalWidthContainerDisplay,
        flexWrap: 'wrap',
        alignItems: 'baseline',
      },
      dateSection: {
        flex: '2 1',
        paddingLeft: datePaddingLeft,
      },
      timeSection: {
        flex: datePicker.equalWidthItemFlex,
        paddingLeft: timePaddingLeft,
      },
      datetimeListTitle: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        background: datePicker.datetimeBaseTitleBackgroundColor,
        color: datePicker.datetimeBaseTitleColor,
        fontSize: datePicker.datetimeBaseTitleFontSize,
        height: 24,
        borderTop: `1px solid ${datePicker.datetimeBaseTitleBorderColor}`,
      },
      datetimeListContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: 272,
        overflow: 'hidden',
        borderRight: this.props.context.theme.boaPalette.base200,
        borderRightStyle: 'solid',
        borderRightWidth: isRtl ? 0 : 1,

        borderLeft: this.props.context.theme.boaPalette.base200,
        borderLeftStyle: 'solid',
        borderLeftWidth: isRtl ? 1 : 0,

        borderBottom: `1px solid ${this.props.context.theme.boaPalette.base200}`,
      },
      datetimeItemSpan: {
        marginTop: 'auto',
        marginBottom: 'auto',
      },
      datetimeContainer: {
        display: datePicker.equalWidthContainerDisplay,
        flexWrap: datePicker.equalWidthContainerFlexWrap,
      },
      datetimeItem: {
        flex: datePicker.equalWidthItemFlex,
      },
      inputContainer: {
        display: datePicker.equalWidthContainerDisplay,
        flexWrap: datePicker.equalWidthContainerFlexWrap,
      },
      inputDateItem: {
        flex: '2 1',
        marginBottom: -2,
        marginTop: 9,
      },
      inputTimeItem: {
        flex: datePicker.equalWidthItemFlex,
      },
      todayButton: {
        fontWeight: 'bold',
        fontSize: 13,
      },
      transitionSlide: {
        minHeight: 252,
        // margin: -7,
        /* position: 'relative', */
      },
      transitionChildSlide: {
        /* position: 'relative', */
      },
      anchorOrigin: {
        horizontal: 'middle',
        vertical: 'bottom',
      },
      transformOrigin: {
        horizontal: 'middle',
        vertical: 'top',
      },
      baseContainerIconStyle,

      inputAlign: this.props.pageType === 'browse' ? 'center' : null,
    };

    const iconStyle = {
      color: this.props.context.theme.boaPalette.pri500,
      width: 16,
      height: 16,
    };

    let suffix = (
      <IconButton
        iconProperties={{ style: iconStyle }}
        context={this.props.context}
        dynamicIcon="AddCircleOutline"
        style={{
          width: 16,
          height: 16,
          marginTop: 7,
        }}
        onClick={this.handleAddDate}
        disabled={this.state.disabled}
      />
    );

    let prefix = (
      <IconButton
        iconProperties={{ style: iconStyle }}
        context={this.props.context}
        dynamicIcon="RemoveCircleOutline"
        style={{
          width: 16,
          height: 16,
          marginTop: 7,
        }}
        onClick={this.handleRemoveDate}
        disabled={this.state.disabled}
      />
    );

    if (this.props.pageType !== 'browse') {
      prefix = null;
      suffix = (
        <IconButton
          iconProperties={{
            style: {
              color: this.props.context.theme.boaPalette.base400,
              width: 24,
              height: 24,
            },
          }}
          context={this.props.context}
          dynamicIcon="ArrowDropDown"
          style={{
            width: 24,
            height: 24,
            marginTop: 7,
          }}
          // onClick={this.handleAddDate.bind(this)} todo: open popover
          disabled={this.state.disabled}
        />
      );
    }

    const okLabel = this.props.okLabel || this.getMessage('BOA', 'Ok');
    const cancelLabel = this.props.cancelLabel || this.getMessage('BOA', 'Cancel');

    return (
      <div>
        <DatePicker
          ref={r => (this.picker = r)}
          suffixText={suffix}
          prefixText={prefix}
          context={this.props.context}
          valueConstraint={this.props.valueConstraint}
          onChange={this.onChange}
          dateOnChange={this.dateOnChange}
          timeOnChange={this.timeOnChange}
          autoOk={this.state.autoOk}
          floatingLabelTextDate={this.props.floatingLabelTextDate}
          floatingLabelTextTime={this.props.floatingLabelTextTime}
          value={this.state.value}
          disableYearSelection={this.state.disableYearSelection}
          hintTextDate={this.props.hintTextDate}
          hintTextTime={this.props.hintTextTime}
          mode={this.state.mode}
          container={this.state.container}
          errorTextDate={this.props.errorTextDate}
          errorTextTime={this.props.errorTextTime}
          firstDayOfWeek={this.props.firstDayOfWeek}
          okLabel={okLabel}
          cancelLabel={cancelLabel}
          todayLabel={this.getMessage('BOA', 'Today')}
          yearTitle={this.getMessage('BOA', 'Year')}
          monthTitle={this.getMessage('BOA', 'Month')}
          hourTitle={this.getMessage('BOA', 'Hour')}
          minuteTitle={this.getMessage('BOA', 'Minute')}
          secondTitle={this.getMessage('BOA', 'Second')}
          formatDate={this.props.formatDate}
          fullWidth={this.props.fullWidth}
          datetimeOption={this.state.datetimeOption}
          maxDate={this.state.maxDate}
          minDate={this.state.minDate}
          maxHour={maxHour}
          minHour={minHour}
          maxMinute={maxMinute}
          minMinute={minMinute}
          maxSecond={maxSecond}
          minSecond={minSecond}
          dialogContentStyle={dialogContentStyle}
          containerStyle={containerStyle}
          style={style}
          isBusiness={this.props.isBusiness}
          calendarInfo={this.props.calendarInfo}
          dateFormat={this.state.dateFormat}
          timeFormat={this.state.timeFormat}
          formats={this.state.formats}
          canSelectOldDates={this.state.canSelectOldDates}
          canSelectWeekendDays={this.state.canSelectWeekendDays}
          canSelectSpecialDays={this.state.canSelectSpecialDays}
          disabled={this.state.disabled}
          dateUpdate={this.dateUpdate}
          dialogNewSelectDate={this.state.dialogNewSelectDate}
          pageType={this.props.pageType}
          inlineGridMode={this.props.inlineGridMode}
          noDialog={this.props.noDialog}
          openBoaCalendar={this.props.openBoaCalendar}
          isFlexMode={this.props.isFlexMode}
        />
      </div>
    );
  }
}

DateTimePicker.Format = receiveFormat;
export default DateTimePicker;

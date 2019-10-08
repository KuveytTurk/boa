import React from 'react';
import PropTypes from 'prop-types';
import { ComponentBase, DeviceSize } from '@kuveytturk/boa-base';
import { Input } from '../Input';
import { isEqualDateTime, getLocalizedDate, getLocalizedTime } from './dateUtils';
import DatePickerDialog from './DatePickerDialog';
import TimePickerDialog from './TimePickerDialog';

class DatePicker extends ComponentBase {
  static propTypes = {
    autoOk: PropTypes.bool,
    calendarInfo: PropTypes.array,
    cancelLabel: PropTypes.node,
    canSelectOldDates: PropTypes.bool,
    canSelectSpecialDays: PropTypes.bool,
    canSelectWeekendDays: PropTypes.bool,
    className: PropTypes.string,
    container: PropTypes.oneOf(['dialog', 'inline']),
    containerStyle: PropTypes.object,
    dateFormat: PropTypes.string,
    dateOnChange: PropTypes.func,
    DateTimeFormat: PropTypes.func,
    datetimeOption: PropTypes.object,
    dateUpdate: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    defaultDate: PropTypes.object,
    dialogContentStyle: PropTypes.object,
    dialogNewSelectDate: PropTypes.instanceOf(Date),
    disabled: PropTypes.bool,
    disableYearSelection: PropTypes.bool,
    errorTextDate: PropTypes.string,
    errorTextTime: PropTypes.string,
    firstDayOfWeek: PropTypes.number,
    floatingLabelStyle: PropTypes.object,
    floatingLabelTextDate: PropTypes.string,
    floatingLabelTextTime: PropTypes.string,
    formatDate: PropTypes.func,
    hintStyle: PropTypes.object,
    hintText: PropTypes.string,
    hintTextDate: PropTypes.string,
    hintTextTime: PropTypes.string,
    hourTitle: PropTypes.node,
    iconStyle: PropTypes.object,
    inlineGridMode: PropTypes.bool,
    inputStyle: PropTypes.object,
    isBusiness: PropTypes.bool,
    isFlexMode: PropTypes.bool,
    leftIconList: PropTypes.array,
    maxDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    maxHour: PropTypes.number,
    maxMinute: PropTypes.number,
    maxSecond: PropTypes.number,
    minDate: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    minHour: PropTypes.number,
    minMinute: PropTypes.number,
    minSecond: PropTypes.number,
    minuteTitle: PropTypes.node,
    mode: PropTypes.oneOf(['portrait', 'landscape']),
    monthTitle: PropTypes.node,
    okLabel: PropTypes.node,
    onChange: PropTypes.func,
    onDismiss: PropTypes.func,
    onFocus: PropTypes.func,
    onShow: PropTypes.func,
    onTouchTap: PropTypes.func,
    openBoaCalendar: PropTypes.bool,
    prefixText: PropTypes.any,
    rightIconList: PropTypes.array,
    secondTitle: PropTypes.node,
    shouldDisableDate: PropTypes.func,
    style: PropTypes.object,
    suffixText: PropTypes.any,
    textFieldStyle: PropTypes.object,
    timeFormat: PropTypes.string,
    timeOnChange: PropTypes.func,
    todayLabel: PropTypes.node,
    underlineFocusStyle: PropTypes.object,
    underlineStyle: PropTypes.object,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.object, PropTypes.instanceOf(Date)]),
    yearTitle: PropTypes.node,
  };

  static defaultProps = {
    autoOk: false,
    container: 'inline',
    disableYearSelection: false,
    firstDayOfWeek: 1,
    style: {},
    inlineGridMode: false,
    isFlexMode: false,
  };

  constructor(props, context) {
    super(props, context);
    this.handleDateAccept = this.handleDateAccept.bind(this);
    this.handleTimeAccept = this.handleTimeAccept.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleFocusDateInput = this.handleFocusDateInput.bind(this);
    this.handleFocusTimeInput = this.handleFocusTimeInput.bind(this);
  }

  componentWillMount() {
    super.componentWillMount();
    const lastValue = this.props.value || this.props.defaultDate;
    this.setState({
      date: lastValue,
      dialogDate: lastValue,
    });
  }

  componentWillReceiveProps(nextProps) {
    const newDate = this.getControlledDate(nextProps);
    if (!isEqualDateTime(this.state.date, newDate)) {
      this.setState({
        date: newDate,
      });
    }
  }

  isMobile() {
    if (this.props.context.deviceSize === DeviceSize.SMALL) return true;
    return false;
  }

  getDate() {
    return this.state.date;
  }

  openDateDialog(event) {
    const element = event.currentTarget;
    if (this.getDate() !== undefined) {
      this.setState(
        {
          dialogDate: this.getDate(),
          anchorElDate: element,
        },
        this.refs.dateDialogWindow.show,
      );
    } else {
      this.setState(
        {
          dialogDate: null,
          anchorElDate: element,
        },
        this.refs.dateDialogWindow.show,
      );
    }
  }

  openTimeDialog(event) {
    if (this.getDate() !== undefined) {
      this.setState(
        {
          dialogDate: this.getDate(),
          anchorElTime: event.currentTarget,
        },
        this.refs.timeDialogWindow.show,
      );
    } else {
      this.setState(
        {
          dialogDate: null,
          anchorElTime: event.currentTarget,
        },
        this.refs.timeDialogWindow.show,
      );
    }
  }

  handleDateAccept(date) {
    if (date && this.state.date) {
      const newDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        this.props.timeFormat ? this.state.date.getHours() : 0,
        this.props.timeFormat ? this.state.date.getMinutes() : 0,
        this.props.timeFormat ? this.state.date.getSeconds() : 0,
      );
      date = newDate;
    }

    if (this.props.dateOnChange) {
      this.props.dateOnChange(null, date);
    }
  }

  handleTimeAccept(date) {
    if (date && this.state.date) {
      const newDate = new Date(
        this.state.date.getFullYear(),
        this.state.date.getMonth(),
        this.state.date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
      );
      date = newDate;
    }
    // this.setTimeValue(date);
    if (this.props.timeOnChange) {
      this.props.timeOnChange(null, date);
    }
  }

  handleFocus(event) {
    event.target.onFocus();

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  isControlled() {
    return this.props.hasOwnProperty('value');
  }

  getControlledDate(props = this.props) {
    if (props.value instanceof Date) {
      return props.value;
    }
    return null;
  }

  handleFocusDateInput(event) {
    event.preventDefault();
    this.openDateDialog(event);
  }

  handleFocusTimeInput(event) {
    this.openTimeDialog(event);
    event.preventDefault();
  }

  validateConstraint() {
    const { dateFormat, timeFormat } = this.props;
    const instanceDate = dateFormat ? this.bActionInputDate.getInstance() : undefined;
    const instanceTime = timeFormat ? this.bActionInputTime.getInstance() : undefined;

    const dateResult = dateFormat && instanceDate ? instanceDate.validateConstraint() : true;
    if (!dateResult) {
      return dateResult;
    }
    const timeResult = timeFormat && instanceTime ? instanceTime.validateConstraint() : true;
    return dateResult && timeResult;
  }

  renderDate() {
    const {
      valueConstraint,
      DateTimeFormat,
      autoOk,
      cancelLabel,
      container,
      defaultDate, // eslint-disable-line no-unused-vars
      containerStyle,
      dialogContentStyle,
      disableYearSelection,
      firstDayOfWeek,
      maxDate,
      minDate,
      dateFormat,
      timeFormat,
      mode,
      okLabel,
      onDismiss,
      onFocus, // eslint-disable-line no-unused-vars
      onShow,
      onTouchTap, // eslint-disable-line no-unused-vars
      shouldDisableDate,
      floatingLabelStyle,
      inputStyle,
      canSelectOldDates,
      canSelectWeekendDays,
      canSelectSpecialDays,
      datetimeOption,
      disabled,
      yearTitle,
      monthTitle,
      todayLabel,
      isBusiness,
      calendarInfo,
      floatingLabelTextDate,
      dialogNewSelectDate,
      hintTextDate,
      errorTextDate,
      noDialog,
    } = this.props;

    let cloneSuffixText = this.props.suffixText;

    if (this.props.pageType !== 'browse' && this.props.suffixText) {
      cloneSuffixText = React.cloneElement(this.props.suffixText, {
        onClick: this.handleFocusDateInput.bind(this),
      });
    }
    const inputLocalizedDate = getLocalizedDate(this.state.date, dateFormat);
    // inputLocalizedDate=inputLocalizedDate== '' ?undefined:inputLocalizedDate;
    const isMobile = this.isMobile();
    if (dateFormat) {
      return (
        <div
          style={{
            width: (!timeFormat && this.props.fullWidth) ? '100%' : '65%',
          }}
          ref={r => (this.rootDate = r)}
        >
          {!this.props.noDialog && (
            <Input
              context={this.props.context}
              valueConstraint={valueConstraint}
              hintText={hintTextDate}
              floatingLabelText={floatingLabelTextDate}
              onFocus={this.handleFocusDateInput}
              value={inputLocalizedDate}
              mask={this.props.formats.dateMask}
              prefixText={this.props.prefixText}
              suffixText={cloneSuffixText}
              inputAlign={this.props.style.inputAlign}
              ref={r => (this.bActionInputDate = r)}
              disabled={disabled}
              errorText={errorTextDate}
              inputStyle={{ cursor: 'pointer' }}
              inlineGridMode={this.props.inlineGridMode}
            />
          )}
          <DatePickerDialog
            // {...this.props} todo: geride kalanlar olmuş olabilir bu kullanım hatalı
            DateTimeFormat={DateTimeFormat}
            noDialog={noDialog}
            autoOk={autoOk}
            anchorElDate={this.state.anchorElDate}
            context={this.props.context}
            cancelLabel={cancelLabel}
            container={container}
            containerStyle={containerStyle}
            dialogContentStyle={dialogContentStyle}
            disableYearSelection={disableYearSelection}
            firstDayOfWeek={firstDayOfWeek}
            initialDate={this.state.dialogDate}
            maxDate={maxDate}
            minDate={minDate}
            mode={mode}
            okLabel={okLabel}
            onAccept={this.handleDateAccept}
            onShow={onShow}
            onDismiss={onDismiss}
            ref="dateDialogWindow"
            shouldDisableDate={shouldDisableDate}
            inputStyle={inputStyle}
            floatingLabelStyle={floatingLabelStyle}
            isBusiness={isBusiness}
            style={this.props.style}
            calendarInfo={calendarInfo}
            dateFormat={dateFormat}
            timeFormat={timeFormat}
            canSelectOldDates={canSelectOldDates}
            canSelectWeekendDays={canSelectWeekendDays}
            canSelectSpecialDays={canSelectSpecialDays}
            isMobile={isMobile}
            datetimeOption={datetimeOption}
            yearTitle={yearTitle}
            todayLabel={todayLabel}
            monthTitle={monthTitle}
            dateUpdate={this.props.dateUpdate}
            dialogNewSelectDate={dialogNewSelectDate}
            pageType={this.props.pageType}
            openBoaCalendar={this.props.openBoaCalendar}
            isFlexMode={this.props.isFlexMode}
            valueConstraint={valueConstraint}
          />
        </div>
      );
    }

    return <div />;
  }

  renderTime() {
    const {
      valueConstraint,
      DateTimeFormat,
      cancelLabel,
      container,
      defaultDate, // eslint-disable-line no-unused-vars
      containerStyle,
      dialogContentStyle,
      dateFormat,
      timeFormat,
      mode,
      okLabel,
      onDismiss,
      onFocus, // eslint-disable-line no-unused-vars
      onShow,
      onTouchTap, // eslint-disable-line no-unused-vars
      floatingLabelStyle,
      inputStyle,
      datetimeOption,
      disabled,
      maxHour,
      minHour,
      maxMinute,
      minMinute,
      maxSecond,
      minSecond,
      hourTitle,
      minuteTitle,
      secondTitle,
      errorTextTime,
      // ...other
    } = this.props;

    const inputLocalizedTime = getLocalizedTime(this.state.date, datetimeOption, timeFormat);
    const isMobile = this.isMobile();
    if (timeFormat) {
      return (
        <div
          style={{
            width: (!dateFormat && this.props.fullWidth) ? '100%' : '35%',
            paddingLeft: 24,
          }}
        >
          {!this.props.noDialog && (
            <Input
              context={this.props.context}
              valueConstraint={valueConstraint}
              hintText={this.props.hintTextTime}
              floatingLabelText={this.props.floatingLabelTextTime}
              onFocus={this.handleFocusTimeInput}
              value={inputLocalizedTime}
              ref={r => (this.bActionInputTime = r)}
              inputStyle={inputStyle}
              floatingLabelStyle={floatingLabelStyle}
              leftIconList={null}
              rightIconList={null}
              disabled={disabled}
              errorText={errorTextTime}
              prefixText={null}
              suffixText={null}
            />
          )}
          <TimePickerDialog
            DateTimeFormat={DateTimeFormat}
            context={this.props.context}
            cancelLabel={cancelLabel}
            container={container}
            containerStyle={containerStyle}
            dialogContentStyle={dialogContentStyle}
            initialDate={this.state.dialogDate}
            mode={mode}
            anchorEl={this.state.anchorElTime}
            okLabel={okLabel}
            onAccept={this.handleTimeAccept}
            onShow={onShow}
            onDismiss={onDismiss}
            ref="timeDialogWindow"
            maxHour={maxHour}
            minHour={minHour}
            maxMinute={maxMinute}
            minMinute={minMinute}
            maxSecond={maxSecond}
            minSecond={minSecond}
            datetimeOption={datetimeOption}
            inputStyle={inputStyle}
            floatingLabelStyle={floatingLabelStyle}
            style={this.props.style}
            dateFormat={dateFormat}
            timeFormat={timeFormat}
            isMobile={isMobile}
            hourTitle={hourTitle}
            minuteTitle={minuteTitle}
            secondTitle={secondTitle}
          />
        </div>
      );
    }

    return <div />;
  }

  render() {
    const { timeFormat, dateFormat } = this.props;
    const isRtl = this.props.context.localization.isRightToLeft;

    return (
      <div>
        {!isRtl && (
          <div
            style={{
              display: 'flex',

              // height:60
            }}
          >
            {dateFormat && this.renderDate()}
            {timeFormat && this.renderTime()}
          </div>
        )}
        {isRtl && (
          <div
            style={{
              display: 'flex',
              // height:60,
              alignItems: 'baseline',
            }}
          >
            {timeFormat && this.renderTime()}
            {dateFormat && this.renderDate()}
          </div>
        )}
      </div>
    );
  }
}

export default DatePicker;

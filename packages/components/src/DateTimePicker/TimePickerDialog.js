import React from 'react';
import PropTypes from 'prop-types';
import EventListener from 'react-event-listener';
import keycode from 'keycode';
import { Popover } from '../Popover';
import { ComponentBase } from '@kuveytturk/boa-base';
import { InputAction } from '../InputAction';
import { Dialog } from '../Dialog';
import TimeBase from './TimeBase';
import CalendarActionButtons from './CalendarActionButtons';
import {
  dateTimeFormat,
  getLocalizedTime,
  calendarMouseWheelAction,
  isEqualDateTime,
  getLocalizedDate,
  getDatePickerStyle,
} from './dateUtils';

class TimePickerDialog extends ComponentBase {
  static propTypes = {
    anchorEl: PropTypes.oneOfType([PropTypes.object, PropTypes.node]),
    animation: PropTypes.func,
    autoOk: PropTypes.bool,
    cancelLabel: PropTypes.node,
    container: PropTypes.oneOf(['dialog', 'inline']),
    containerStyle: PropTypes.object,
    dateFormat: PropTypes.string,
    DateTimeFormat: PropTypes.func,
    datetimeOption: PropTypes.object,
    dialogContentStyle: PropTypes.object,
    dialogItemStyle: PropTypes.object,
    floatingLabelStyle: PropTypes.object,
    handleTouchTapHour: PropTypes.func,
    handleTouchTapMinute: PropTypes.func,
    handleTouchTapSecond: PropTypes.func,
    hintStyle: PropTypes.object,
    hourTitle: PropTypes.node,
    initialDate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.instanceOf(Date),
    ]),
    inputStyle: PropTypes.object,
    isMobile: PropTypes.bool,
    maxHour: PropTypes.number,
    maxMinute: PropTypes.number,
    maxSecond: PropTypes.number,
    minHour: PropTypes.number,
    minMinute: PropTypes.number,
    minSecond: PropTypes.number,
    minuteTitle: PropTypes.node,
    mode: PropTypes.oneOf(['portrait', 'landscape']),
    okLabel: PropTypes.node,
    onAccept: PropTypes.func,
    onDismiss: PropTypes.func,
    onShow: PropTypes.func,
    onTimeChange: PropTypes.func,
    onTouchTapTimeCancel: PropTypes.func,
    onTouchTapTimeOk: PropTypes.func,
    open: PropTypes.bool,
    secondTitle: PropTypes.node,
    style: PropTypes.object,
    timeFormat: PropTypes.string,
    underlineFocusStyle: PropTypes.object,
    underlineStyle: PropTypes.object,
  };

  static defaultProps = {
    DateTimeFormat: dateTimeFormat,
    container: 'dialog',
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
  };

  state = {
    open: false,
  };

  constructor(props, context) {
    super(props, context);
    this.show = this.show.bind(this);
    this.dismiss = this.dismiss.bind(this);
    this.handleTouchTapCancel = this.handleTouchTapCancel.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTapOk = this.handleTouchTapOk.bind(this);
    this.handleTouchTapHour = this.handleTouchTapHour.bind(this);
    this.handleTouchTapMinute = this.handleTouchTapMinute.bind(this);
    this.handleTouchTapSecond = this.handleTouchTapSecond.bind(this);
    this.handleFocusInput = this.handleFocusInput.bind(this);
    this.handleBlurInput = this.handleBlurInput.bind(this);
    this.handleWindowOnWheel = this.handleWindowOnWheel.bind(this);
    this.onKeyDownInputTime = this.onKeyDownInputTime.bind(this);
  }

  componentWillMount() {
    super.componentWillMount();
    this.BActionInputFocused = false;
    this.setState({
      date: this.props.initialDate || new Date(),
      localizedTime: getLocalizedTime(
        this.props.initialDate || new Date(),
        this.props.datetimeOption,
        this.props.timeFormat,
      ),
      floatingLabelStyle: this.props.floatingLabelStyle,
      inputStyle: this.props.inputStyle,
    });
  }

  componentWillReceiveProps(nextProps) {
    const newDate = nextProps.initialDate;
    if (!isEqualDateTime(this.state.date, newDate)) {
      this.setState({
        date: newDate,
      });
    }
  }

  show() {
    if (this.props.onShow && !this.state.open) {
      this.props.onShow();
    }
    this.setState({
      open: true,
    });
  }

  dismiss() {
    if (this.props.onDismiss && this.state.open) {
      this.props.onDismiss();
    }
    this.setState({
      open: false,
    });
  }

  handleTouchTapCancel() {
    this.dismiss();
  }

  handleRequestClose() {
    this.dismiss();
    this.popover.manualClose();
  }

  handleTouchTapOk() {
    if (this.props.onAccept) {
      this.props.onAccept(this.state.date);
    }
    this.setState({
      open: false,
    });
  }

  handleTouchTapHour(event, hour) {
    const { date } = this.state;
    if (date) {
      const newDate = new Date(date.setHours(hour));
      this.setState({
        date: newDate,
      });
    } else {
      this.setState({
        date: new Date(new Date().setHours(hour)),
      });
    }

    if (this.props.handleTouchTapHour) {
      this.props.handleTouchTapHour(event, hour);
    }
  }

  handleTouchTapMinute(event, minute) {
    const { date } = this.state;
    if (date) {
      const newDate = new Date(date.setMinutes(minute));
      this.setState({
        date: newDate,
      });
    } else {
      this.setState({
        date: new Date(new Date().setMinutes(minute)),
      });
    }
    if (this.props.handleTouchTapMinute) {
      this.props.handleTouchTapMinute(event, minute);
    }
  }

  handleTouchTapSecond(event, second) {
    const { date } = this.state;
    if (date) {
      const newDate = new Date(date.setSeconds(second));
      this.setState({
        date: newDate,
      });
    } else {
      this.setState({
        date: new Date(new Date().setMinutes(second)),
      });
    }
    if (this.props.handleTouchTapSecond) {
      this.props.handleTouchTapSecond(event, second);
    }
  }

  handleFocusInput() {
    this.BActionInputFocused = true;
  }

  handleBlurInput() {
    this.BActionInputFocused = false;
  }

  handleWindowOnWheel(event) {
    const value = getLocalizedTime(
      this.state.date || new Date(),
      this.props.datetimeOption,
      this.props.timeFormat,
    );
    let selectionStart;
    let selectionEnd;
    let newValue;
    if (event && this.BActionInputFocused && event.target) {
      if (event && event.wheelDelta !== 0 && event.wheelDelta / 120 > 0) {
        newValue = calendarMouseWheelAction(
          event.target.selectionStart,
          this.props.timeFormat,
          value,
          1,
          this.state.date,
        );
        selectionStart = event.target.selectionStart;
        selectionEnd = event.target.selectionEnd;
        this.setState({
          date: newValue,
        });
      } else {
        newValue = calendarMouseWheelAction(
          event.target.selectionStart,
          this.props.timeFormat,
          value,
          -1,
          this.state.date,
        );
        selectionStart = event.target.selectionStart;
        selectionEnd = event.target.selectionEnd;
        this.setState({
          date: newValue,
        });
      }
    }
    if (selectionStart !== undefined && selectionEnd !== undefined) {
      event.target.selectionStart = selectionStart;
      event.target.selectionEnd = selectionEnd;
    }
  }

  onKeyDownInputTime(e) {
    switch (keycode(e)) {
      case 'enter': {
        if (this.BActionInputFocused) {
          if (this.bInputActionDialogTime && !this.bInputActionDialogTime.getValue()) {
            this.setState({ date: null }, this.handleTouchTapOk);
          } else {
            this.handleTouchTapOk();
          }
        }
        break;
      }
      default:
        break;
    }
  }

  hourSelector(DateTimeFormat, minHour, maxHour, format) {
    return (
      <TimeBase
        key="hours"
        context={this.props.context}
        dateTimeFormat={DateTimeFormat}
        onTouchTapTime={this.handleTouchTapHour}
        selectedDate={this.state.date ? this.state.date : new Date()}
        minValue={minHour}
        maxValue={maxHour}
        timeType={1}
        format={format}
      />
    );
  }

  minuteSelector(DateTimeFormat, minMinute, maxMinute, format) {
    return (
      <TimeBase
        key="minutes"
        context={this.props.context}
        dateTimeFormat={DateTimeFormat}
        onTouchTapTime={this.handleTouchTapMinute}
        selectedDate={this.state.date ? this.state.date : new Date()}
        minValue={minMinute}
        maxValue={maxMinute}
        timeType={2}
        format={format}
      />
    );
  }

  secondSelector(DateTimeFormat, minSecond, maxSecond, format) {
    return (
      <TimeBase
        key="seconds"
        context={this.props.context}
        dateTimeFormat={DateTimeFormat}
        onTouchTapTime={this.handleTouchTapSecond}
        selectedDate={this.state.date ? this.state.date : new Date()}
        minValue={minSecond}
        maxValue={maxSecond}
        timeType={3}
        format={format}
      />
    );
  }

  renderRTLTimeSelections() {
    const {
      style, // eslint-disable-line no-unused-vars
    } = this.props;
    const isRtl = this.props.context.localization.isRightToLeft;
    return (
      <div style={style.datetimeContainer}>
        {!isRtl && this.renderHours()}
        {!isRtl && this.renderMinutes()}
        {!isRtl && this.renderSeconds()}
        {isRtl && this.renderSeconds()}
        {isRtl && this.renderMinutes()}
        {isRtl && this.renderHours()}
      </div>
    );
  }

  renderHours() {
    const {
      onAccept, // eslint-disable-line no-unused-vars
      onDismiss, // eslint-disable-line no-unused-vars
      onShow, // eslint-disable-line no-unused-vars
      style, // eslint-disable-line no-unused-vars
      DateTimeFormat,
      timeFormat,
      datetimeOption,
      hourTitle,
      minHour,
      maxHour,
    } = this.props;
    if (datetimeOption && datetimeOption.isHour) {
      return (
        <div style={style.datetimeItem}>
          <div style={style.datetimeListTitle}>
            <span style={style.datetimeItemSpan}>{hourTitle}</span>
          </div>
          <div style={style.datetimeListContainer}>
            {this.hourSelector(DateTimeFormat, minHour, maxHour, timeFormat)}
          </div>
        </div>
      );
    }
    return null;
  }

  renderMinutes() {
    const {
      onAccept, // eslint-disable-line no-unused-vars
      onDismiss, // eslint-disable-line no-unused-vars
      onShow, // eslint-disable-line no-unused-vars
      style, // eslint-disable-line no-unused-vars
      DateTimeFormat,
      maxMinute,
      minMinute,
      timeFormat,
      datetimeOption,
      minuteTitle,
    } = this.props;
    if (datetimeOption && datetimeOption.isMinute) {
      return (
        <div style={style.datetimeItem}>
          <div style={style.datetimeListTitle}>
            <span style={style.datetimeItemSpan}>{minuteTitle}</span>
          </div>
          <div style={style.datetimeListContainer}>
            {this.minuteSelector(DateTimeFormat, minMinute, maxMinute, timeFormat)}
          </div>
        </div>
      );
    }
    return null;
  }

  renderSeconds() {
    const {
      onAccept, // eslint-disable-line no-unused-vars
      onDismiss, // eslint-disable-line no-unused-vars
      onShow, // eslint-disable-line no-unused-vars
      style, // eslint-disable-line no-unused-vars
      DateTimeFormat,
      timeFormat,
      datetimeOption,
      minSecond,
      maxSecond,
      secondTitle,
    } = this.props;
    if (datetimeOption && datetimeOption.isSecond) {
      return (
        <div style={style.datetimeItem}>
          <div style={style.datetimeListTitle}>
            <span style={style.datetimeItemSpan}>{secondTitle}</span>
          </div>
          <div style={style.datetimeListContainer}>
            {this.secondSelector(DateTimeFormat, minSecond, maxSecond, timeFormat)}
          </div>
        </div>
      );
    }
    return null;
  }

  render() {
    const {
      cancelLabel,
      containerStyle,
      dialogContentStyle,
      okLabel,
      onAccept, // eslint-disable-line no-unused-vars
      onDismiss, // eslint-disable-line no-unused-vars
      onShow, // eslint-disable-line no-unused-vars
      style, // eslint-disable-line no-unused-vars
      mode,
      context,
      floatingLabelText,
      timeFormat,
      dateFormat,
      datetimeOption,
      hintText,
      initialDate,
      isMobile,
      autoOk,
    } = this.props;

    const open = this.state.open;
    const { calendarTextColor } = getDatePickerStyle(this.props.context);
    const isLandscape = mode === 'landscape';
    const styles = {
      root: {
        color: calendarTextColor,
        userSelect: 'none',
        minWidth: isLandscape ? 479 : 310,
      },
      calendar: {
        display: 'flex',
        flexDirection: 'column',
      },
      calendarContainer: {
        display: 'flex',
        alignContent: 'space-between',
        justifyContent: 'space-between',
        flexDirection: 'column',
        fontSize: 12,
        fontWeight: 400,
        padding: '0px 8px',
      },
      hourTitle: {
        display: 'flex',
        flexDirection: 'column',
        opacity: '0.5',
        textAlign: 'center',
      },
      hourContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: 272,
        marginTop: 10,
        overflow: 'hidden',
      },
      minuteTitle: {
        display: 'flex',
        flexDirection: 'column',
        opacity: '0.5',
        textAlign: 'center',
      },
      minuteContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: 272,
        marginTop: 10,
        overflow: 'hidden',
      },
      secondTitle: {
        display: 'flex',
        flexDirection: 'column',
        opacity: '0.5',
        textAlign: 'center',
      },
      secondContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: 272,
        marginTop: 10,
        overflow: 'hidden',
      },
    };
    const dateInputValue = getLocalizedDate(initialDate || new Date(), dateFormat);
    const timeInputValue = getLocalizedTime(
      this.state.date || new Date(),
      datetimeOption,
      timeFormat,
    );

    const popoverOrigin = { horizontal: 'left', vertical: 'top' };

    const content = (
      <div style={styles.root}>
        <EventListener target="window" onWheel={this.handleWindowOnWheel} />
        <div style={style.inputContainer}>
          {dateFormat && isMobile && (
            <div style={style.inputDateItem}>
              <div
                style={{
                  marginLeft: 12,
                  marginRight: 12,
                  marginTop: 12,
                }}
              >
                <InputAction
                  context={this.props.context}
                  hintText={this.props.hintText}
                  onFocus={this.handleFocusInput}
                  onBlur={this.handleBlurInput}
                  value={dateInputValue}
                  ref={r => (this.bInputActionDialogDate = r)}
                  leftIconList={null}
                  rightIconList={null}
                  floatingLabelStyle={this.state.floatingLabelStyle}
                  inputStyle={this.state.inputStyle}
                  disabled
                />
              </div>
            </div>
          )}
          <div style={style.inputTimeItem}>
            <div
              style={{
                marginLeft: 12,
                marginRight: 12,
                marginTop: 12,
              }}
            >
              <InputAction
                // {...other}
                context={context}
                hintText={hintText}
                floatingLabelText={floatingLabelText}
                value={timeInputValue}
                ref={r => (this.bInputActionDialogTime = r)}
                floatingLabelStyle={this.state.floatingLabelStyle}
                onKeyDown={this.onKeyDownInputTime}
                inputStyle={this.state.inputStyle}
                leftIconList={null}
                rightIconList={null}
                onFocus={this.handleFocusInput.bind}
                onBlur={this.handleBlurInput.bind}
              />
            </div>
          </div>
        </div>
        <div style={styles.calendar}>
          {this.renderRTLTimeSelections()}
          {okLabel && (
            <CalendarActionButtons
              context={context}
              autoOk={autoOk}
              cancelLabel={cancelLabel}
              okLabel={okLabel}
              onTouchTapCancel={this.handleTouchTapCancel}
              onTouchTapOk={this.handleTouchTapOk}
            />
          )}
        </div>
      </div>
    );

    const popoverContent = (
      <Popover
        canAutoPosition
        isOriginSetted
        repositionOnUpdate
        autoCloseWhenOffScreen={false}
        style={{
          marginTop: -12,
          marginLeft: -12,
          paddingTop: 0,
          maxWidth: '100%',
          width: 'calc(100% - 16px)',
          height: 'calc(100% - 16px)',
          maxheight: 'calc(100% - 24px)',
          direction: !this.props.context.localization.isRightToLeft ? 'ltr' : 'rtl',
        }}
        open={open}
        context={this.props.context}
        anchorOrigin={popoverOrigin}
        transformOrigin={popoverOrigin}
        zDepth={1}
        bodyStyle={containerStyle}
        contentStyle={dialogContentStyle}
        ref={r => (this.popover = r)}
        onRequestClose={this.handleRequestClose}
        disableRestoreFocus
        anchorEl={this.props.anchorEl}
      >
        {content}
      </Popover>
    );

    const dialogContent = (
      <Dialog
        context={this.props.context}
        modal={false}
        open={open}
        onRequestClose={this.handleRequestClose}
        disableRestoreFocus
      >
        {content}
      </Dialog>
    );

    return <div ref="root">{this.isMobile() ? dialogContent : popoverContent}</div>;
  }
}

export default TimePickerDialog;

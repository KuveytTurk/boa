import React from 'react';
import PropTypes from 'prop-types';
import EventListener from 'react-event-listener';
import { Popover } from '../Popover';
import { ComponentBase } from '@kuveytturk/boa-base';
import { Dialog } from '../Dialog';
import { dateTimeFormat } from './dateUtils';
import Calendar from './Calendar';

class DatePickerDialog extends ComponentBase {
  static propTypes = {
    anchorElDate: PropTypes.object,
    animation: PropTypes.func,
    autoOk: PropTypes.bool,
    calendarInfo: PropTypes.array,
    cancelLabel: PropTypes.node,
    canSelectOldDates: PropTypes.bool,
    canSelectSpecialDays: PropTypes.bool,
    canSelectWeekendDays: PropTypes.bool,
    container: PropTypes.oneOf(['dialog', 'inline']),
    containerStyle: PropTypes.object,
    dateFormat: PropTypes.string,
    DateTimeFormat: PropTypes.func,
    datetimeOption: PropTypes.object,
    dateUpdate: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    dialogContentStyle: PropTypes.object,
    dialogNewSelectDate: PropTypes.instanceOf(Date),
    disableYearSelection: PropTypes.bool,
    firstDayOfWeek: PropTypes.number,
    floatingLabelStyle: PropTypes.object,
    hintStyle: PropTypes.object,
    initialDate: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.instanceOf(Date),
    ]),
    inputStyle: PropTypes.object,
    isBusiness: PropTypes.bool,
    isFlexMode: PropTypes.bool,
    isMobile: PropTypes.bool,
    maxDate: PropTypes.instanceOf(Date),
    minDate: PropTypes.instanceOf(Date),
    mode: PropTypes.oneOf(['portrait', 'landscape']),
    monthTitle: PropTypes.node,
    okLabel: PropTypes.node,
    onAccept: PropTypes.func,
    onDismiss: PropTypes.func,
    onShow: PropTypes.func,
    open: PropTypes.bool,
    openBoaCalendar: PropTypes.bool,
    shouldDisableDate: PropTypes.func,
    style: PropTypes.object,
    timeFormat: PropTypes.string,
    todayButtonOnClick: PropTypes.func,
    todayLabel: PropTypes.node,
    underlineFocusStyle: PropTypes.object,

    underlineStyle: PropTypes.object,
    yearTitle: PropTypes.node,
  };

  static defaultProps = {
    DateTimeFormat: dateTimeFormat,
    container: 'inline',
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
    this.handleTouchTapDay = this.handleTouchTapDay.bind(this);
    this.handleTouchTapCancel = this.handleTouchTapCancel.bind(this);
    this.todayButtonOnClick = this.todayButtonOnClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleTouchTapOk = this.handleTouchTapOk.bind(this);
    this.handleWindowKeyUp = this.handleWindowKeyUp.bind(this);
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

  handleTouchTapDay(event, date) {
    if (this.props.onAccept) {
      this.props.onAccept(date);
    }
    this.setState({
      open: false,
    });
  }

  handleTouchTapCancel() {
    this.dismiss();
  }

  todayButtonOnClick() {
    if (this.props.onAccept) {
      const today = new Date();
      const handleDate = new Date(this.refs.calendar.getSelectedDate());
      today.setHours(handleDate.getHours());
      today.setMinutes(handleDate.getMinutes());
      today.setSeconds(handleDate.getSeconds());
      this.props.onAccept(today);
    }
    this.setState({
      open: false,
    });
  }

  // eslint-disable-next-line
  handleClickToolBar() {}

  handleRequestClose() {
    if (this.props.onAccept) {
      this.props.onAccept(this.refs.calendar.getSelectedDate());
    }

    if (this.popover && this.popover.manualClose) {
      this.popover.manualClose();
    }

    this.setState({
      open: false,
    });
  }

  handleTouchTapOk() {
    this.handleRequestClose();
  }

  // eslint-disable-next-line
  handleWindowKeyUp() {}

  render() {
    const {
      DateTimeFormat,
      autoOk,
      cancelLabel,
      containerStyle,
      dialogContentStyle,
      disableYearSelection,
      initialDate,
      firstDayOfWeek,
      maxDate,
      minDate,
      mode,
      okLabel,
      onAccept, // eslint-disable-line no-unused-vars
      onDismiss, // eslint-disable-line no-unused-vars
      onShow, // eslint-disable-line no-unused-vars
      shouldDisableDate,
      style, // eslint-disable-line no-unused-vars
      context,
      calendarInfo,
      dateFormat,
      timeFormat,
      canSelectOldDates,
      canSelectWeekendDays,
      canSelectSpecialDays,
      floatingLabelStyle,
      iconStyle,
      inputStyle,
      isBusiness,
      isMobile,
      datetimeOption,
      todayLabel,
      yearTitle,
      dialogNewSelectDate,
      monthTitle,
      noDialog,
      openBoaCalendar,
      isFlexMode,
    } = this.props;

    const { open } = this.state;
    const popoverOrigin = { horizontal: 'left', vertical: 'top' };

    const calendar = (
      <Calendar
        autoOk={autoOk}
        DateTimeFormat={DateTimeFormat}
        cancelLabel={cancelLabel}
        context={context}
        disableYearSelection={disableYearSelection}
        firstDayOfWeek={firstDayOfWeek}
        initialDate={initialDate}
        onTouchTapDay={this.handleTouchTapDay}
        maxDate={maxDate}
        minDate={minDate}
        mode={mode}
        open={open}
        openBoaCalendar={openBoaCalendar}
        ref="calendar"
        onTouchTapCancel={this.handleTouchTapCancel}
        onTouchTapOk={this.handleTouchTapOk}
        todayButtonOnClick={this.todayButtonOnClick}
        okLabel={okLabel}
        shouldDisableDate={shouldDisableDate}
        handleClickToolBar={this.handleClickToolBar}
        iconStyle={iconStyle}
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
        monthTitle={monthTitle}
        todayLabel={todayLabel}
        dateUpdate={this.props.dateUpdate}
        dialogNewSelectDate={dialogNewSelectDate}
        noDialog={noDialog}
        isFlexMode={isFlexMode}
        valueConstraint={this.props.valueConstraint}
      />
    );

    const content = (
      <Dialog
        context={this.props.context}
        modal={false}
        open={open}
        onRequestClose={this.handleRequestClose}
        disableRestoreFocus
        style={{
          padding: 0,
        }}
      >
        {calendar}
      </Dialog>
    );

    const popoverContent = (
      <Popover
        canAutoPosition
        isOriginSetted
        repositionOnUpdate
        autoCloseWhenOffScreen={false}
        style={{
          marginTop: -57,
          marginLeft: this.props.pageType !== 'browse' ? -10 : -12,
          paddingTop: 0,
          maxWidth: '100%',
          width: 'calc(100% - 16px)',
          height: 'calc(100% - 16px)',
          maxheight: 'calc(100% - 24px)',
          direction: !this.props.context.localization.isRightToLeft ? 'ltr' : 'rtl',
        }}
        open={open}
        context={this.props.context}
        anchorEl={this.root}
        anchorOrigin={popoverOrigin}
        transformOrigin={popoverOrigin}
        zDepth={1}
        bodyStyle={containerStyle}
        contentStyle={dialogContentStyle}
        ref={r => (this.popover = r)}
        onRequestClose={this.handleRequestClose}
        scrollableContainer
        disableRestoreFocus
      >
        <EventListener target="window" onKeyUp={this.handleWindowKeyUp} />
        {calendar}
      </Popover>
    );
    return (
      <div ref={ref => (this.root = ref)}>
        {this.props.noDialog ? (
          <div style={{ display: 'flex', justifyContent: 'center' }}> {calendar}</div>
        ) : (
          <div> {this.isMobile() ? content : popoverContent} </div>
        )}
      </div>
    );
  }
}

export default DatePickerDialog;

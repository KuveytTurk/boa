import React from 'react';
import PropTypes from 'prop-types';
import EventListener from 'react-event-listener';
import keycode from 'keycode';
import { ComponentBase } from '@kuveytturk/boa-base';
import { Localization } from '@kuveytturk/boa-utils';
import { Button } from '../Button';
import { Divider } from '../Divider';
import { InputMask } from '../InputMask';
import { IconButton } from '../IconButton';
import TimeBase from './TimeBase';
import SpecialDay from './SpecialDay';
import CalendarMonth from './CalendarMonth';
import CalendarToolbar from './CalendarToolbar';
import CalendarActionButtons from './CalendarActionButtons';
import {
  addDays,
  addMonths,
  addYears,
  cloneDate,
  dateTimeFormat,
  isAfterDate,
  isBeforeDate,
  getFirstDayOfMonth,
  localizedWeekday,
  monthDiff,
  getLocalizedDate,
  isEqualDate,
  isBetweenDates,
  calendarMouseWheelAction,
  getWeekArray,
  getDatePickerStyle,
  checkDateForBusiness,
} from './dateUtils';

const daysArray = [...Array(7)];

/**
 * Calendar component
 */
class Calendar extends ComponentBase {
  static propTypes = {
    autoOk: PropTypes.bool,
    calendarInfo: PropTypes.array,
    cancelLabel: PropTypes.node,
    canSelectOldDates: PropTypes.bool,
    canSelectSpecialDays: PropTypes.bool,
    canSelectWeekendDays: PropTypes.bool,
    dateFormat: PropTypes.string,
    DateTimeFormat: PropTypes.func.isRequired,
    datetimeOption: PropTypes.object,
    dateUpdate: PropTypes.oneOfType([PropTypes.func, PropTypes.node]),
    dialogNewSelectDate: PropTypes.instanceOf(Date),
    disableYearSelection: PropTypes.bool,
    firstDayOfWeek: PropTypes.number,
    floatingLabelFocusStyle: PropTypes.object,
    floatingLabelStyle: PropTypes.object,
    handleClickToolBar: PropTypes.func,
    handleTouchTapMonth: PropTypes.func,
    handleTouchTapYear: PropTypes.func,
    hintStyle: PropTypes.object,
    hourTitle: PropTypes.node,
    iconStyle: PropTypes.object,
    initialDate: PropTypes.object,
    inputStyle: PropTypes.object,
    isBusiness: PropTypes.bool,
    isMobile: PropTypes.bool,
    maxDate: PropTypes.instanceOf(Date),
    maxMonth: PropTypes.number,
    minDate: PropTypes.instanceOf(Date),
    minMonth: PropTypes.number,
    minuteTitle: PropTypes.node,
    mode: PropTypes.oneOf(['portrait', 'landscape']),
    monthTitle: PropTypes.node,
    okLabel: PropTypes.node,
    onTouchTapCancel: PropTypes.func,
    onTouchTapDay: PropTypes.func,
    onTouchTapOk: PropTypes.func,
    open: PropTypes.bool,
    openBoaCalendar: PropTypes.bool,
    secondTitle: PropTypes.node,
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
    disableYearSelection: false,
    initialDate: new Date(),
    minDate: addYears(new Date(), -33),
    maxDate: addYears(new Date(), 33),
    maxMonth: 11,
    minMonth: 0,
    openBoaCalendar: false,
  };

  static contextTypes = {
    muiTheme: PropTypes.object,
  };

  state = {
    displayDate: undefined,
    displayMonthDay: true,
    selectedDate: undefined,
    transitionDirection: 'left',
    transitionEnter: true,
  };

  constructor(props, context) {
    super(props, context);
    this.specialDays = [];
    this.handleTouchTapDay = this.handleTouchTapDay.bind(this);
    this.handleTouchTapMonth = this.handleTouchTapMonth.bind(this);
    this.handleTouchTapYear = this.handleTouchTapYear.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleTouchTapDateDisplayMonthDay = this.handleTouchTapDateDisplayMonthDay.bind(this);
    this.handleTouchTapDateDisplayYear = this.handleTouchTapDateDisplayYear.bind(this);
    this.handleClickToolBar = this.handleClickToolBar.bind(this);
    this.handleRemoveDate = this.handleRemoveDate.bind(this);
    this.handleAddDate = this.handleAddDate.bind(this);
    this.todayButtonOnClick = this.todayButtonOnClick.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleWindowKeyDown = this.handleWindowKeyDown.bind(this);
    this.handleWindowOnWheel = this.handleWindowOnWheel.bind(this);
    this.handleFocusInput = this.handleFocusInput.bind(this);
    this.handleBlurInput = this.handleBlurInput.bind(this);
    this.onTouchTapOk = this.onTouchTapOk.bind(this);
    this.onKeyDownInputDate = this.onKeyDownInputDate.bind(this);
    this.onChangeInputDate = this.onChangeInputDate.bind(this);
  }

  componentWillMount() {
    super.componentWillMount();
    this.setState({
      displayDate: getFirstDayOfMonth(this.props.initialDate ? this.props.initialDate : new Date()),
      selectedDate: this.props.initialDate,
      floatingLabelStyle: this.props.floatingLabelStyle,
      inputStyle: this.props.inputStyle,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { dialogNewSelectDate, initialDate } = nextProps;
    if (dialogNewSelectDate !== undefined) {
      /* istanbul ignore else */
      if (!isEqualDate(dialogNewSelectDate, this.props.dialogNewSelectDate)) {
        this.setState({
          displayDate: getFirstDayOfMonth(dialogNewSelectDate),
          selectedDate: dialogNewSelectDate,
        });
      }
    }
    if (initialDate !== this.props.initialDate) {
      const date = initialDate || new Date();
      this.setState({
        displayDate: getFirstDayOfMonth(date),
        selectedDate: date,
      });
    }
  }

  addSelectedDays(days) {
    return addDays(this.state.selectedDate, days);
  }

  addSelectedMonths(months) {
    return addMonths(this.state.selectedDate, months);
  }

  addSelectedYears(years) {
    return addYears(this.state.selectedDate, years);
  }

  isSelectedDateDisabled() {
    if (!this.state.displayMonthDay) {
      return false;
    }

    return this.refs.calendar.isSelectedDateDisabled();
  }

  getCalendarMonth(DateTimeFormat, minDate, maxDate) {
    const calendarMonth = (
      <CalendarMonth
        dateTimeFormat={DateTimeFormat}
        context={this.props.context}
        displayDate={this.state.displayDate}
        firstDayOfWeek={this.props.firstDayOfWeek}
        key={this.state.displayDate.toDateString()}
        minDate={minDate}
        maxDate={maxDate}
        onTouchTapDay={this.handleTouchTapDay}
        ref="calendar"
        selectedDate={this.state.selectedDate}
        shouldDisableDate={this.props.shouldDisableDate}
        calendarInfo={this.specialDays}
        isBusiness={this.props.isBusiness}
        canSelectOldDates={this.props.canSelectOldDates}
        canSelectWeekendDays={this.props.canSelectWeekendDays}
        canSelectSpecialDays={this.props.canSelectSpecialDays}
        isFlexMode={this.props.isFlexMode}
      />
    );
    return calendarMonth;
  }

  getSpecialDays() {
    return (
      <div>
        {this.props.isBusiness && this.specialDays.length > 0 && (
          <SpecialDay
            context={this.props.context}
            DateTimeFormat={this.props.DateTimeFormat}
            specialDayType={1}
            key={`db${4}`}
            selectedDate={this.state.displayDate}
            calendarInfo={this.specialDays}
            format={this.props.dateFormat}
          />
        )}
      </div>
    );
  }

  getSelectedDate() {
    return this.state.selectedDate;
  }

  getToolbarInteractions() {
    return {
      prevMonth: monthDiff(this.state.displayDate, this.props.minDate) > 0,
      nextMonth: monthDiff(this.state.displayDate, this.props.maxDate) < 0,
    };
  }

  setDisplayDate(date, newSelectedDate) {
    const { selectedDate } = this.state;
    const newDisplayDate = getFirstDayOfMonth(date);
    const direction = newDisplayDate > this.state.displayDate ? 'left' : 'right';

    if (newDisplayDate !== this.state.displayDate) {
      this.setState({
        displayDate: newDisplayDate,
        transitionDirection: direction,
        selectedDate: newSelectedDate || selectedDate,
      });
    }
  }

  setSelectedDate(date) {
    let adjustedDate = date;
    if (date && isBeforeDate(date, this.props.minDate)) {
      adjustedDate = this.props.minDate;
    } else if (date && isAfterDate(date, this.props.maxDate)) {
      adjustedDate = this.props.maxDate;
    }

    const newDisplayDate = getFirstDayOfMonth(adjustedDate);
    if (newDisplayDate !== undefined && newDisplayDate !== this.state.displayDate) {
      this.setDisplayDate(newDisplayDate, adjustedDate);
    } else {
      this.setState({
        selectedDate: adjustedDate,
      });
    }
  }

  setSpecialDays() {
    if (this.props.calendarInfo && this.props.calendarInfo.length > 0 && this.state.displayDate) {
      const calendarInfo = this.props.calendarInfo;
      const date = this.state.displayDate;
      if (date !== undefined) {
        if (
          this.CalendarInfoSelectedDate === undefined ||
          this.CalendarInfoSelectedDate.getMonth() !== date.getMonth() ||
          this.CalendarInfoSelectedDate.getFullYear() !== date.getFullYear()
        ) {
          this.CalendarInfoSelectedDate = date;
          this.specialDays = [];
          for (let i = 0; i < calendarInfo.length; i++) {
            let beginDate = cloneDate(getFirstDayOfMonth(date));
            let endDate = cloneDate(getFirstDayOfMonth(date));
            beginDate = new Date(beginDate.setMonth(beginDate.getMonth() - 1));
            endDate = new Date(endDate.setMonth(endDate.getMonth() + 2));
            if (calendarInfo[i] && calendarInfo[i].day) {
              const calendarDay = new Date(calendarInfo[i].day);
              if (isBetweenDates(calendarDay, beginDate, endDate)) {
                calendarInfo[i].day = new Date(calendarInfo[i].day);
                this.specialDays.push(calendarInfo[i]);
              }
            }
          }
        }
      }
    }
  }

  handleTouchTapDay(event, date) {
    this.setSelectedDate(date);

    if (this.props.onTouchTapDay) this.props.onTouchTapDay(event, date);
  }

  handleMonthChange(months) {
    const { displayDate } = this.state;
    this.setState({
      transitionDirection: months >= 0 ? 'left' : 'right',
      displayDate: addMonths(displayDate, months),
    });
  }

  handleTouchTapYear(event, year) {
    const { selectedYearMonthDate } = this.state;
    const date = cloneDate(selectedYearMonthDate);
    date.setFullYear(year);
    this.setState({
      selectedYearMonthDate: date,
    });
  }

  handleTouchTapMonth(event, month) {
    const { selectedYearMonthDate } = this.state;
    const date = cloneDate(selectedYearMonthDate);
    date.setMonth(month);
    this.setState({
      selectedYearMonthDate: date,
    });
  }

  handleTouchTapDateDisplayMonthDay() {
    this.setState({
      displayMonthDay: true,
    });
  }

  handleTouchTapDateDisplayYear() {
    this.setState({
      displayMonthDay: false,
    });
  }

  handleClickToolBar(e) {
    const { displayDate, displayMonthDay, selectedYearMonthDate } = this.state;
    const { handleClickToolBar } = this.props;

    if (displayMonthDay) {
      this.setState({
        displayMonthDay: false,
        selectedYearMonthDate: displayDate,
      });
      if (handleClickToolBar) {
        this.props.handleClickToolBar(e, displayMonthDay);
      }
    } else {
      this.setState({
        displayMonthDay: true,
        selectedDate: selectedYearMonthDate,
      });
      if (this.props.handleClickToolBar) {
        this.props.handleClickToolBar(e, displayMonthDay);
      }
    }
  }

  handleRemoveDate(e) {
    let initialDate;
    let handleDate = new Date();
    if (!this.state.selectedDate) {
      initialDate = new Date();
    } else {
      initialDate = new Date(this.getSelectedDate());
    }
    handleDate.setDate(initialDate.getDate() - 1);
    handleDate = checkDateForBusiness(this.props, initialDate, handleDate, -1);
    this.handleChangeDate(e, handleDate);
  }

  handleAddDate(e) {
    let initialDate;
    let handleDate = new Date();
    if (!this.state.selectedDate) {
      initialDate = new Date();
    } else {
      initialDate = new Date(this.getSelectedDate());
    }
    handleDate.setDate(initialDate.getDate() + 1);
    handleDate = checkDateForBusiness(this.props, initialDate, handleDate, 1);
    this.handleChangeDate(e, handleDate);
  }

  todayButtonOnClick(e) {
    if (this.props.todayButtonOnClick) {
      this.props.todayButtonOnClick(e);
    }
  }

  handleChangeDate(event, date) {
    this.setState({
      initialDate: date,
      displayDate: getFirstDayOfMonth(date),
      selectedDate: date,
    });
  }

  handleWindowKeyDown(event) {
    const oldDate = cloneDate(this.state.selectedDate);
    if (this.props.open) {
      switch (keycode(event)) {
        case 'up':
          if (event.altKey && event.shiftKey) {
            this.addSelectedYears(-1);
            if (this.props.dateUpdate) {
              this.props.dateUpdate(oldDate, cloneDate(this.addSelectedYears(-1)), 2);
            }
          } else if (event.shiftKey) {
            this.addSelectedMonths(-1);
            if (this.props.dateUpdate) {
              this.props.dateUpdate(oldDate, cloneDate(this.addSelectedMonths(-1)), 2);
            }
          } else {
            this.addSelectedDays(-7);
            if (this.props.dateUpdate) {
              this.props.dateUpdate(oldDate, cloneDate(this.addSelectedDays(-7)), 2);
            }
          }
          break;

        case 'down':
          if (event.altKey && event.shiftKey) {
            this.addSelectedYears(1);
            if (this.props.dateUpdate) {
              this.props.dateUpdate(oldDate, cloneDate(this.addSelectedYears(1)), 1);
            }
          } else if (event.shiftKey) {
            this.addSelectedMonths(1);
            if (this.props.dateUpdate) {
              this.props.dateUpdate(oldDate, cloneDate(this.addSelectedMonths(1)), 1);
            }
          } else {
            this.addSelectedDays(7);
            if (this.props.dateUpdate) {
              this.props.dateUpdate(oldDate, cloneDate(this.addSelectedDays(7)), 1);
            }
          }
          break;

        case 'right':
          if (event.altKey && event.shiftKey) {
            this.addSelectedYears(1);
            if (this.props.dateUpdate) {
              this.props.dateUpdate(oldDate, cloneDate(this.addSelectedYears(1)), 1);
            }
          } else if (event.shiftKey) {
            this.addSelectedMonths(1);
            if (this.props.dateUpdate) {
              this.props.dateUpdate(oldDate, cloneDate(this.addSelectedMonths(1)), 1);
            }
          } else {
            this.addSelectedDays(1);
            if (this.props.dateUpdate) {
              this.props.dateUpdate(oldDate, cloneDate(this.addSelectedDays(1)), 1);
            }
          }
          break;

        case 'left':
          if (event.altKey && event.shiftKey) {
            this.addSelectedYears(-1);
            if (this.props.dateUpdate) {
              this.props.dateUpdate(oldDate, cloneDate(this.addSelectedYears(-1)), 2);
            }
          } else if (event.shiftKey) {
            this.addSelectedMonths(-1);
            if (this.props.dateUpdate) {
              this.props.dateUpdate(oldDate, cloneDate(this.addSelectedMonths(-1)), 2);
            }
          } else {
            this.addSelectedDays(-1);
            if (this.props.dateUpdate) {
              this.props.dateUpdate(oldDate, cloneDate(this.addSelectedDays(-1)), 2);
            }
          }
          break;
        default:
          break;
      }
    }
  }

  handleWindowOnWheel(event) {
    const value = getLocalizedDate(this.state.selectedDate, this.props.dateFormat);
    let selectionStart;
    let selectionEnd;
    let newValue;
    if (event && this.state.focus && event.target) {
      if (event && event.wheelDelta !== 0 && event.wheelDelta / 120 > 0) {
        selectionStart = event.target.selectionStart;
        selectionEnd = event.target.selectionEnd;
        newValue = calendarMouseWheelAction(
          event.target.selectionStart,
          this.props.dateFormat,
          value,
          1,
          this.state.selectedDate,
        );
        this.setState({
          initialDate: newValue,
          displayDate: getFirstDayOfMonth(newValue),
          selectedDate: newValue,
        });
        if (this.props.dateUpdate) {
          this.props.dateUpdate(cloneDate(this.state.selectedDate), cloneDate(newValue), 4);
        }
      } else {
        selectionStart = event.target.selectionStart;
        selectionEnd = event.target.selectionEnd;

        newValue = calendarMouseWheelAction(
          event.target.selectionStart,
          this.props.dateFormat,
          value,
          -1,
          this.state.selectedDate,
        );
        this.setState({
          initialDate: newValue,
          displayDate: getFirstDayOfMonth(newValue),
          selectedDate: newValue,
        });
        if (this.props.dateUpdate) {
          this.props.dateUpdate(cloneDate(this.state.selectedDate), cloneDate(newValue), 5);
        }
      }
    }
    if (selectionStart !== undefined && selectionEnd !== undefined) {
      event.target.selectionStart = selectionStart;
      event.target.selectionEnd = selectionEnd;
    }
  }

  handleFocusInput(e) {
    if (this.props.onFocus) {
      this.props.onFocus(e);
    }
    this.inputFocus = true;
    this.setState({
      focus: true,
    });
  }

  handleBlurInput(e) {
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
    this.inputFocus = true;
    this.setState({
      focus: false,
    });
  }

  onTouchTapOk() {
    const date = cloneDate(this.state.selectedYearMonthDate);
    this.setSelectedDate(date);
    this.handleTouchTapDateDisplayMonthDay();
  }

  onKeyDownInputDate(e) {
    switch (keycode(e)) {
      case 'enter': {
        if (this.inputFocus) {
          if (this.bactioninput && !this.bactioninput.getInstance().getValue()) {
            this.handleTouchTapDay(e, null);
          } else if (this.bactioninput && this.bactioninput.getInstance().getValue()) {
            const inputValue = this.bactioninput.getInstance().getValue();
            const dateValue = Localization.getDateValue(inputValue.value);
            if (dateValue.isValid()) {
              // eslint-disable-next-line
              const newDate = dateValue._d;
              this.setState(
                {
                  initialDate: newDate,
                  displayDate: getFirstDayOfMonth(newDate),
                  selectedDate: newDate,
                },
                () => {
                  this.handleTouchTapDay(e, newDate);
                },
              );
            } else if (
              !this.props.valueConstraint ||
              this.props.valueConstraint.required === false
            ) {
              this.setState(
                {
                  selectedDate: undefined,
                },
                () => {
                  this.handleTouchTapDay(e, undefined);
                },
              );
            }
          }
        }
        break;
      }
      default:
        break;
    }
  }

  onChangeInputDate() {
    if (this.bactioninput && this.bactioninput.getInstance().getValue()) {
      // console.log(val);
    }
  }

  mounthSelector() {
    const { minDate, maxDate } = this.props;
    const minValue = minDate ? minDate.getFullYear() : Calendar.defaultProps.minDate.getFullYear();
    const maxValue = maxDate ? maxDate.getFullYear() : Calendar.defaultProps.maxDate.getFullYear();

    if (!this.props.disableYearSelection) {
      return (
        <TimeBase
          key="months"
          context={this.props.context}
          DateTimeFormat={this.props.DateTimeFormat}
          onTouchTapTime={this.handleTouchTapMonth}
          selectedDate={this.state.selectedYearMonthDate}
          minValue={minValue}
          maxValue={maxValue}
          timeType={4}
          format={this.props.dateFormat}
        />
      );
    }
    return null;
  }

  yearSelector() {
    if (!this.props.disableYearSelection) {
      return (
        <TimeBase
          key="years"
          context={this.props.context}
          dateTimeFormat={this.props.DateTimeFormat}
          onTouchTapTime={this.handleTouchTapYear}
          selectedDate={this.state.selectedYearMonthDate}
          minValue={this.props.minDate.getFullYear()}
          maxValue={this.props.maxDate.getFullYear()}
          timeType={5}
          format={this.props.dateFormat}
        />
      );
    }
    return null;
  }

  renderYearAndMounthSelector() {
    const { style, yearTitle, monthTitle } = this.props;
    const isRtl = this.props.context.localization.isRightToLeft;
    return (
      <div style={style.datetimeContainer}>
        {!isRtl && this.renderSelection(style, monthTitle, true)}
        {!isRtl && this.renderSelection(style, yearTitle, false)}
        {isRtl && this.renderSelection(style, yearTitle, false)}
        {isRtl && this.renderSelection(style, monthTitle, true)}
      </div>
    );
  }

  renderSelection(style, title, yearOrMounth) {
    return (
      <div style={style.datetimeItem}>
        <div style={style.datetimeListTitle}>
          <span style={style.datetimeItemSpan}>{title}</span>
        </div>
        <div style={style.datetimeListContainer}>
          {yearOrMounth && this.mounthSelector()}
          {!yearOrMounth && this.yearSelector()}
        </div>
      </div>
    );
  }

  render() {
    const isMobile = this.isMobile(this.props);
    const openBoaCalendar = !isMobile && this.props.openBoaCalendar;
    const { isFlexMode } = this.props;
    this.setSpecialDays();
    const toolbarInteractions = this.getToolbarInteractions();
    const isLandscape = this.props.mode === 'landscape';
    const {
      calendarTextColor,
      equalWidthContainerDisplay,
      equalWidthContainerFlexWrap,
      equalWidthItemFlex,
      timeBaseTitleBackgroundColor,
    } = getDatePickerStyle(this.props.context); // this.context.muiTheme.datePicker;
    const styles = {
      root: {
        color: calendarTextColor,
        userSelect: 'none',
        width: isFlexMode ? '100%' : isLandscape ? 479 : 300, // eslint-disable-line
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
        fontSize: 14,
        fontWeight: 400,
        padding: '0px 0px',
        // transition: 'cubic-bezier(0.23, 1, 0.32, 1)', // transitions.easeOut(),
      },
      yearContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: 272,
        /* marginTop: 10, */
        overflow: 'hidden',
        // width: 155,
      },
      mounthContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: 272,
        /* marginTop: 10, */
        overflow: 'hidden',
        // width: 155,
      },
      weekTitle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontWeight: '500',
        height: 40,
        lineHeight: '15px',
        opacity: '0.5',
        textAlign: 'center',
        alignItems: 'center',
      },
      weekTitleDay: {
        width: isFlexMode ? '100%' : 40,
      },

      yearsTitle: {
        display: 'flex',
        flexDirection: 'column',
        opacity: '0.5',
        textAlign: 'center',
        background: timeBaseTitleBackgroundColor,
      },
      monthsTitle: {
        display: 'flex',
        flexDirection: 'column',
        opacity: '0.5',
        textAlign: 'center',
        background: timeBaseTitleBackgroundColor,
      },
      dateContainer: {
        display: equalWidthContainerDisplay,
        flexWrap: equalWidthContainerFlexWrap,
        padding: '0px 0px 0px 0px',
      },
      dateItem: {
        flex: equalWidthItemFlex,
      },
      dayAndInput: {
        padding: isFlexMode ? 0 : '7px 12px 0px 12px',
      },
      inputStyle: {},
    };

    const weekTitleDayStyle = styles.weekTitleDay;
    const buttonStyle = {
      height: 48,
      minWidth: '100%',
      textAlign: 'center',
      borderStyle: 'solid',
      borderWidth: 0,
      borderRadius: 0,
      borderColor: this.props.context.theme.palette.borderColor,
    };

    const buttonTextStyle = {
      color: this.props.context.theme.palette.primary1Color,
      fontWeight: 500,
    };
    const {
      dateFormat,
      minDate,
      maxDate,
      cancelLabel,
      DateTimeFormat,
      firstDayOfWeek,
      okLabel,
      style,
      todayLabel,
      onTouchTapCancel, // eslint-disable-line no-unused-vars
      onTouchTapOk, // eslint-disable-line no-unused-vars
    } = this.props;

    const { selectedDate } = this.state;
    let dateInputValue = getLocalizedDate(selectedDate || new Date(), dateFormat);

    // ayda kaç hafta olduğu bulunup yüksekliği verilmek zorunda
    const weekArray = getWeekArray(this.state.displayDate, this.props.firstDayOfWeek);
    let minHeight;
    if (weekArray != null && weekArray.length === 5) {
      minHeight = 196;
    } else {
      minHeight = 236;
    }

    const iconStyle = {
      color: this.props.context.theme.boaPalette.pri500,
      width: 16,
      height: 16,
    };

    dateInputValue = dateInputValue && dateInputValue.replace('/', '.');
    dateInputValue = dateInputValue && dateInputValue.replace('/', '.');

    const suffix = (
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

    const divider = (
      <div>
        <Divider
          context={this.props.context}
          style={{
            width: 'calc(100% )',
            marginBottom: 0,
            marginLeft: 0,
            marginRight: 0,
            marginTop: 0,
          }}
        />
      </div>
    );

    const prefix = (
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
    return (
      <div style={styles.root}>
        <div style={styles.dayAndInput}>
          <EventListener
            target="window"
            context={this.props.context}
            onKeyDown={this.handleWindowKeyDown}
            onWheel={this.handleWindowOnWheel}
          />
          <div style={styles.inputStyle}>
            <div style={style.inputContainer}>
              {!this.props.noDialog && (
                <div style={style.inputDateItem}>
                  <InputMask
                    // {...other}
                    onKeyDown={this.onKeyDownInputDate}
                    onChange={this.onChangeInputDate}
                    context={this.props.context}
                    onFocus={this.handleFocusInput}
                    onBlur={this.handleBlurInput}
                    value={dateInputValue}
                    ref={r => (this.bactioninput = r)}
                    prefixText={prefix}
                    suffixText={suffix}
                    floatingLabelStyle={this.state.floatingLabelStyle}
                    inputStyle={this.state.inputStyle}
                    inputAlign={'center'}
                    hintText={this.props.formats && this.props.formats.dateFormatHint}
                    // maskString = {'DD.MM.YYYY'}
                    mask={'nn.nn.nnnn'}
                    bottomRightInfoEnable={false}
                    bottomLeftInfoEnable={false}
                    fullWidth={false}
                  />
                </div>
              )}
            </div>
            {!this.props.noDialog && (
              <Divider
                context={this.props.context}
                style={{
                  width: 'calc(100% + 24px)',
                  marginBottom: 0,
                  marginLeft: -12,
                  marginRight: -12,
                  marginTop: 0,
                }}
              />
            )}
            <div style={{ marginTop: isFlexMode ? 0 : 15 }}>
              {this.state.displayMonthDay && !this.props.noDialog && (
                <CalendarToolbar
                  context={this.props.context}
                  dateTimeFormat={DateTimeFormat}
                  displayDate={this.state.displayDate}
                  onMonthChange={this.handleMonthChange}
                  prevMonth={toolbarInteractions.prevMonth}
                  nextMonth={toolbarInteractions.nextMonth}
                  handleClickToolBar={this.handleClickToolBar}
                  format={this.props.dateFormat}
                />
              )}

              {this.state.displayMonthDay && this.props.noDialog && (
                <CalendarToolbar
                  context={this.props.context}
                  dateTimeFormat={DateTimeFormat}
                  displayDate={this.state.displayDate}
                  onMonthChange={this.handleMonthChange}
                  prevMonth={toolbarInteractions.prevMonth}
                  nextMonth={toolbarInteractions.nextMonth}
                  format={this.props.dateFormat}
                  localization={this.props.localization}
                  noDialog={this.props.noDialog}
                />
              )}
            </div>
          </div>
          <div style={styles.calendar}>
            {this.state.displayMonthDay && (
              <div>
                <div style={styles.calendarContainer}>
                  <div style={styles.weekTitle}>
                    {daysArray.map((event, i) => (
                      // eslint-disable-next-line
                      <span key={i} style={weekTitleDayStyle}>
                        {localizedWeekday(DateTimeFormat, i, firstDayOfWeek, this.props.dateFormat)}
                      </span>
                    ))}
                  </div>
                  <div style={Object.assign({}, style.transitionSlide, { minHeight })}>
                    {// TODO :SLIDE
                      this.getCalendarMonth(DateTimeFormat, minDate, maxDate)}
                  </div>

                  {/* </Slide> */}
                  <div>{this.getSpecialDays()}</div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          {!this.state.displayMonthDay && this.renderYearAndMounthSelector(style)}
          {this.state.displayMonthDay && (
            <div>
              {this.props.noDialog === false && (
                <div>
                  {divider}
                  <Button
                    context={this.props.context}
                    type="text"
                    text={todayLabel}
                    colorType="primary"
                    fullWidth
                    onClick={this.todayButtonOnClick}
                    style={buttonStyle}
                    textStyle={buttonTextStyle}
                  />
                </div>
              )}
              {openBoaCalendar && (
                <div>
                  {divider}
                  <Button
                    context={this.props.context}
                    type="text"
                    text="BOA TAKVİMİ AÇ"
                    colorType="primary"
                    fullWidth
                    onClick={this.openBoaCalendar}
                    style={buttonStyle}
                    textStyle={buttonTextStyle}
                  />
                </div>
              )}
            </div>
          )}
        </div>
        {!this.state.displayMonthDay && okLabel && (
          <CalendarActionButtons
            context={this.props.context}
            autoOk={this.props.autoOk}
            cancelLabel={cancelLabel}
            okLabel={okLabel}
            onTouchTapCancel={onTouchTapCancel}
            onTouchTapOk={this.onTouchTapOk}
          />
        )}
      </div>
    );
  }
}

export default Calendar;

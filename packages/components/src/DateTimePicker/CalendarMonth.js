import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DayButton from './DayButton';
import {
  dateTimeFormat,
  isBetweenDates,
  isEqualDate,
  getWeekArray,
  substructDay,
  DayType,
} from './dateUtils';

const styles = {
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    fontWeight: 400,
    lineHeight: 2,
    position: 'relative',
    textAlign: 'center',
    MozPaddingStart: 0,
  },
  week: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 40,
  },
};

class CalendarMonth extends Component {
  static propTypes = {
    calendarInfo: PropTypes.array,
    canSelectOldDates: PropTypes.bool,
    canSelectSpecialDays: PropTypes.bool,
    canSelectWeekendDays: PropTypes.bool,
    context: PropTypes.object,
    dateTimeFormat: PropTypes.func,
    displayDate: PropTypes.object.isRequired,
    firstDayOfWeek: PropTypes.number,
    isBusiness: PropTypes.bool,
    isFlexMode: PropTypes.bool,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    onTouchTapDay: PropTypes.func,
    selectedDate: PropTypes.object,
    shouldDisableDate: PropTypes.func,
  };

  static defaultProps = {
    firstDayOfWeek: 1,
    dateTimeFormat,
  };

  constructor(props, context) {
    super(props, context);
    this.SpecialDays = [];
    this.handleTouchTapDay = this.handleTouchTapDay.bind(this);
  }

  getDayType(day, calendarInfo) {
    if (day === null) return { dayType: DayType.EmptyDay };
    if (!isBetweenDates(day, this.props.minDate, this.props.maxDate)) {
      return { dayType: DayType.EmptyDay };
    }
    if (calendarInfo) {
      for (let i = 0; i < calendarInfo.length; i++) {
        if (calendarInfo[i] && calendarInfo[i].day) {
          const calendarDay = new Date(calendarInfo[i].day);
          if (isEqualDate(calendarDay, day)) {
            return calendarInfo[i];
          }
        }
      }
    }
    return { dayType: DayType.EmptyDay };
  }

  getWeekElements() {
    const weekArray = getWeekArray(this.props.displayDate, this.props.firstDayOfWeek);

    const weekStyle = Object.assign({}, styles.week);
    if (this.props.isFlexMode) {
      weekStyle.marginLeft = -2;
      weekStyle.marginRight = -2;
    }

    return weekArray.map((week, i) => {
      return (
        // eslint-disable-next-line
        <div key={i} style={weekStyle}>
          {this.getDayElements(week, i)}
        </div>
      );
    }, this);
  }

  getDayElements(week, i) {
    const {
      selectedDate,
      isBusiness,
      calendarInfo,
      canSelectOldDates,
      canSelectWeekendDays,
      canSelectSpecialDays,
      displayDate,
      isFlexMode,
    } = this.props;

    const DateTimeFormat = this.props.dateTimeFormat;
    return week.map((day, j) => {
      const isSameDate = isEqualDate(selectedDate, day);

      const dayInfo = this.getDayType(day, calendarInfo);
      const options = {
        day,
        displayDate,
        dayInfo,
        canSelectOldDates,
        canSelectWeekendDays,
        canSelectSpecialDays,
      };
      const disabled = this.shouldDisableDate(options);

      if (dayInfo.dayType !== DayType.EmptyDay) {
        this.SpecialDays.push(dayInfo);
      }
      const selected = !disabled && isSameDate;
      if (isSameDate) {
        this.selectedDateDisabled = disabled;
      }

      return (
        <DayButton
          dateTimeFormat={DateTimeFormat}
          context={this.props.context}
          date={day}
          disabled={disabled}
          key={`db${i + j}`}
          onTouchTap={this.handleTouchTapDay}
          selected={selected}
          dayInfo={dayInfo}
          business={isBusiness}
          displayDate={this.props.displayDate}
          isFlexMode={isFlexMode}
        />
      );
    }, this);
  }

  handleTouchTapDay(event, date) {
    if (this.props.onTouchTapDay) {
      this.props.onTouchTapDay(event, date);
    }
  }

  isSelectedDateDisabled() {
    return this.selectedDateDisabled;
  }

  shouldDisableDate(options) {
    const { day, dayInfo, canSelectOldDates, canSelectWeekendDays, canSelectSpecialDays } = options;

    if (day === null) return false;
    let disabled = !isBetweenDates(day, this.props.minDate, this.props.maxDate);
    if (!disabled && this.props.shouldDisableDate) disabled = this.props.shouldDisableDate(day);

    const dateNow = new Date();
    const subDay = substructDay(dateNow, day);
    if (!canSelectOldDates && subDay < 0) {
      disabled = true;
    }
    if (dayInfo.dayType !== DayType.EmptyDay) {
      if (!canSelectWeekendDays && dayInfo.dayType === DayType.WeekendDay) {
        disabled = true;
      }
      if (
        !canSelectSpecialDays &&
        (dayInfo.dayType === DayType.Eve ||
          dayInfo.dayType === DayType.ReliHoliday ||
          dayInfo.dayType === DayType.Holiday)
      ) {
        disabled = true;
      }
    }

    return disabled;
  }

  render() {
    return (
      <div>
        <div style={styles.root}>{this.getWeekElements()}</div>
      </div>
    );
  }
}

export default CalendarMonth;

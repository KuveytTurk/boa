/* eslint-disable */
import warning from 'warning';
import isString from 'lodash/isString';
import { Localization } from '@kuveytturk/boa-utils';

const dayAbbreviation = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const dayList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const monthList = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
const monthLongList = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
const seperator = '.';

String.prototype.replaceAll = function (target, replacement) {
  return this.split(target).join(replacement);
};

export const receiveFormat = {
  LD: 'DDMMYYYY',
  LDLT: 'DDMMYYYY hmmss',
  LDT: 'DDMMYYYY hmm',
  LT: 'hmmss',
  T: 'hmm',
};
export const momentFormat = {
  hourAndMinute: 'LT',
  hourAndMinuteAndSecond: 'LTS',
  Date: 'L',
};
/** Convert date to ISO 8601 (YYYY-MM-DD) date string, accounting for current timezone */
export function formatIso(date) {
  return new Date(`${date.toDateString()} 12:00:00 +0000`).toISOString().substring(0, 10);
}
export function getLocalizedDate(value, dateformat) {
  if (Localization && dateformat && value) {
    return Localization.formatDateTimeGMT(value, dateformat);
  }
  return '';
}
export function getLocalizedTime(value, datetimeOption, timeformat) {
  if (Localization && timeformat && value) {
    return Localization.formatDateTimeGMT(value, timeformat);
  }
  return '';
}
export function dateTimeFormat(options) {
  this.format = function (date) {
    if (options.month === 'short' && options.weekday === 'short' && options.day === '2-digit') {
      return `${dayList[date.getDay()]}, ${monthList[date.getMonth()]} ${date.getDate()}`;
    }
    if (options.year === 'numeric' && options.month === 'numeric' && options.day === 'numeric') {
      return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    }
    if (options.year === 'numeric' && options.month === 'long') {
      return `${monthLongList[date.getMonth()]} ${date.getFullYear()}`;
    }
    if (options.item === 'monthYearName') {
      `${getMonthsLong(date, options.format)[date.getMonth()]}`;
      return `${getMonthsLong(date, options.format)[date.getMonth()]} ${date.getFullYear()}`;
    }
    if (options.weekday === 'narrow') {
      return dayAbbreviation[date.getDay()];
    }
    if (options.localizationWeekday === 'narrow') {
      return getWeekDaysMin(options.date, options.format)[date.getDay()];
    }
    if (options.year === 'numeric') {
      return date.getFullYear().toString();
    }
    if (options.month === 'numeric') {
      return `${monthLongList[date.getMonth()]}`;
    }
    if (options.month === 'monthListName') {
      return `${getMonthsLong(date, options.format)[date.getMonth()]}`;
    }
    if (options.day === 'numeric') {
      return date.getDate();
    }
    if (options.time === 'hour') {
      return date.getHours();
    } else if (options.time === 'minute') {
      return date.getMinutes();
    } else if (options.time === 'second') {
      return date.getSeconds();
    } else {
      warning(false, 'Material-UI: Wrong usage of DateTimeFormat');
    }
  };
}
export function getMonthName(month) {
  return monthList[month];
}
export function addDays(d, days) {
  const newDate = cloneDate(d);
  newDate.setDate(d.getDate() + days);
  return newDate;
}
export function addMonths(d, months) {
  const newDate = cloneDate(d);
  newDate.setMonth(d.getMonth() + months);
  return newDate;
}
export function addYears(d, years) {
  const newDate = cloneDate(d);
  newDate.setFullYear(d.getFullYear() + years);
  return newDate;
}
export function addHours(d, hours) {
  const newDate = cloneDate(d);
  newDate.setHours(d.getHours() + hours);
  return newDate;
}
export function addMinutes(d, minutes) {
  const newDate = cloneDate(d);
  newDate.setMinutes(d.getMinutes() + minutes);
  return newDate;
}
export function addSeconds(d, seconds) {
  const newDate = cloneDate(d);
  newDate.setSeconds(d.getSeconds() + seconds);
  return newDate;
}
export function cloneDate(d) {
  if (d) {
    return new Date(d.getTime());
  }

  return undefined;
}
export function cloneAsDate(d) {
  const clonedDate = cloneDate(d);
  clonedDate.setHours(0, 0, 0, 0);
  return clonedDate;
}
export function getDaysInMonth(d) {
  const resultDate = getFirstDayOfMonth(d);

  if (resultDate) {
    resultDate.setMonth(resultDate.getMonth() + 1);
    resultDate.setDate(resultDate.getDate() - 1);
    return resultDate.getDate();
  }
  return undefined;
}
export function getPatternDate(d, pattern) {
  if (d instanceof Date && pattern) {
    return null;
  }
  return undefined;
}
export function getFormatDecomposition(format) {
  let formats;
  if (!format) {
    formats = {
      dateFormat: momentFormat.Date,
      timeFormat: undefined,
    };
  } else if (format === receiveFormat.LD) {
    formats = {
      dateFormat: momentFormat.Date,
      timeFormat: undefined,
    };
  } else if (format === receiveFormat.LDLT) {
    formats = {
      dateFormat: momentFormat.Date,
      timeFormat: momentFormat.hourAndMinuteAndSecond,
    };
  } else if (format === receiveFormat.LDT) {
    formats = {
      dateFormat: momentFormat.Date,
      timeFormat: momentFormat.hourAndMinute,
    };
  } else if (format === receiveFormat.LT) {
    formats = {
      dateFormat: undefined,
      timeFormat: momentFormat.hourAndMinuteAndSecond,
    };
  } else if (format === receiveFormat.T) {
    formats = {
      dateFormat: undefined,
      timeFormat: momentFormat.hourAndMinute,
    };
  } else {
    formats = {
      dateFormat: momentFormat.Date,
      timeFormat: undefined,
    };
  }
  if (formats.dateFormat)
    formats.dateFormatHint = Localization.stringLowerCase(
      Localization.getDateTimeFormat(formats.dateFormat),
    );
  if (formats.timeFormat)
    formats.timeFormatHint = Localization.stringLowerCase(
      Localization.getDateTimeFormat(formats.timeFormat),
    );

  let dateMask = formats.dateFormatHint;
  let timeMask = formats.timeFormatHint;
  if (dateMask) {
    dateMask = dateMask.replaceAll('d', 'n');
    dateMask = dateMask.replaceAll('m', 'n');
    dateMask = dateMask.replaceAll('y', 'n');
  }
  if (timeMask) {
    timeMask = timeMask.replaceAll('s', 'n');
    timeMask = timeMask.replaceAll('h', 'n');
    timeMask = timeMask.replaceAll('m', 'n');
  }

  formats.dateMask = dateMask;
  formats.timeMask = timeMask;

  return formats;
}
export function getFirstDayOfMonth(d) {
  if (d) {
    return new Date(d.getFullYear(), d.getMonth(), 1);
  }

  return undefined;
}
export function getFirstDayOfWeek() {
  const now = new Date();
  return new Date(now.setDate(now.getDate() - now.getDay()));
}
export function getWeekArray(d, firstDayOfWeek) {
  const dayArray = [];
  const daysInMonth = getDaysInMonth(d);
  const weekArray = [];
  let week = [];

  for (let i = 1; i <= daysInMonth; i++) {
    dayArray.push(new Date(d.getFullYear(), d.getMonth(), i));
  }

  const addWeek = week => {
    const emptyDays = 7 - week.length;
    for (let i = 0; i < emptyDays; ++i) {
      week[weekArray.length ? 'push' : 'unshift'](null);
    }
    if (week.length > 0 && week[0] == null) {
      const firstDayOfMonth = cloneDate(week[emptyDays]);
      for (let j = emptyDays; j > -1; j--) {
        if (week[j] === null) {
          firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 1);
          week[j] = cloneDate(firstDayOfMonth);
        }
      }
    } else if (week.length == 7 && week[6] == null) {
      const lastDayOfMonth = cloneDate(week[7 - emptyDays - 1]);
      const beginIndex = 7 - emptyDays;
      for (let i = beginIndex; i < 7; i++) {
        if (week[i] === null) {
          lastDayOfMonth.setDate(lastDayOfMonth.getDate() + 1);
          week[i] = cloneDate(lastDayOfMonth);
        }
      }
    }
    weekArray.push(week);
  };

  dayArray.forEach(day => {
    if (week.length > 0 && day.getDay() === firstDayOfWeek) {
      addWeek(week);
      week = [];
    }
    week.push(day);
    if (dayArray.indexOf(day) === dayArray.length - 1) {
      addWeek(week);
    }
  });

  return weekArray;
}
export function localizedWeekday(DateTimeFormat, day, firstDayOfWeek, format) {
  const weekdayFormatter = new DateTimeFormat({ localizationWeekday: 'narrow', format });
  const firstDayDate = getFirstDayOfWeek();

  return weekdayFormatter.format(addDays(firstDayDate, day + firstDayOfWeek));
}
export function isEqualDate(d1, d2) {
  if (d1 === undefined && d2 === undefined) {
    return true;
  }
  if (d1 === undefined || d2 === undefined) {
    return false;
  }
  if (isString(d1)) {
    d1 = new Date(d1);
  }
  if (isString(d2)) {
    d2 = new Date(d2);
  }

  return (
    d1 &&
    d2 &&
    d1 instanceof Date &&
    d2 instanceof Date &&
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}
export function isEqualDateTime(d1, d2) {
  if (d1 === undefined && d2 === undefined) {
    return true;
  }
  if (isString(d1)) {
    d1 = new Date(d1);
  }
  if (isString(d2)) {
    d2 = new Date(d2);
  }
  return (
    d1 &&
    d2 &&
    d1 instanceof Date &&
    d2 instanceof Date &&
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate() &&
    d1.getHours() === d2.getHours() &&
    d1.getMinutes() === d2.getMinutes() &&
    d1.getSeconds() === d2.getSeconds()
  );
}
export function substructDay(d1, d2) {
  if (isEqualDate(d1, d2)) {
    return 0;
  }

  return (d2.getTime() - d1.getTime()) / (24 * 60 * 60 * 1000);
}
export function isBeforeDate(d1, d2) {
  if (d1 == null || d2 == null) {
    return false;
  } else {
    const date1 = cloneAsDate(d1);
    const date2 = cloneAsDate(d2);

    return date1.getTime() < date2.getTime();
  }
}
export function isAfterDate(d1, d2) {
  if (d1 == null || d2 == null) {
    return false;
  } else {
    const date1 = cloneAsDate(d1);
    const date2 = cloneAsDate(d2);

    return date1.getTime() > date2.getTime();
  }
}
export function isBetweenDates(dateToCheck, startDate, endDate) {
  return !isBeforeDate(dateToCheck, startDate) && !isAfterDate(dateToCheck, endDate);
}
export function monthDiff(d1, d2) {
  let m;
  if (d1 && d2) {
    m = (d1.getFullYear() - d2.getFullYear()) * 12;
    m += d1.getMonth();
    m -= d2.getMonth();
  }
  return m;
}
export function yearDiff(d1, d2) {
  return ~~(monthDiff(d1, d2) / 12);
}
export function getFocusDateTimeItem1(startIndex, format) {
  if (Localization && format) {
    const patern = Localization.getDateTimeFormat(format);
    if (patern) {
      let item = '';
      if (patern.length - 1 !== startIndex) {
        for (let i = startIndex; i <= 0; i++) {
          if (
            patern[i] === 'M' ||
            patern[i] === 'Y' ||
            patern[i] === 'D' ||
            patern[i] === 'd' ||
            patern[i] === 'h' ||
            patern[i] === 'm' ||
            patern[i] === 's' ||
            patern[i] === 'a'
          ) {
            item += patern[i];
          } else {
            break;
          }
        }
      }
      if (startIndex !== 0) {
        for (let i = startIndex - 1; i < patern.length; i--) {
          if (
            patern[i] === 'M' ||
            patern[i] === 'Y' ||
            patern[i] === 'D' ||
            patern[i] === 'd' ||
            patern[i] === 'h' ||
            patern[i] === 'm' ||
            patern[i] === 's' ||
            patern[i] === 'a'
          ) {
            item += patern[i];
          } else {
            break;
          }
        }
      }
      return item;
    }
  }
  return undefined;
}
export function getFocusDateTimeItem(value, startIndex, format, type) {
  if (format) {
    if (value) {
      let item = '';
      let itemBefore = '';
      let itemAfter = '';
      for (let i = startIndex; i >= 0; i--) {
        if (value[i] !== ' ' && !isNaN(Number(value[i])) && itemBefore.length === 0) {
          item = value[i] + item.toString();
        } else {
          itemBefore = value[i] + itemBefore.toString();
        }
      }
      for (let j = startIndex + 1; j < value.length; j++) {
        if (value[j] !== ' ' && !isNaN(Number(value[j])) && itemAfter.length === 0) {
          item = item.toString() + value[j];
        } else {
          itemAfter = itemAfter.toString() + value[j];
        }
      }
      if (item !== ' ' && !isNaN(item)) {
        item = Number(item);
        if (type === 1) item++;
        else item--;

        item = itemBefore + item + itemAfter;
        return item;
      }
    }
  }
  return undefined;
}
export function getMonthsLong(date, format) {
  const newValue = getLocalizedDate(date);
  const momentObject = Localization.getFormattedDateLocale(newValue, format);
  return momentObject._locale._months;
}
export function getMonthsShort(newValue, format) {
  const momentObject = Localization.getFormattedDateLocale(newValue, format);
  return momentObject._locale._monthsShort;
}
export function getWeekDays(newValue, format) {
  const momentObject = Localization.getFormattedDateLocale(newValue, format);
  return momentObject._locale._weekdays;
}
export function getWeekDaysShort(newValue, format) {
  const momentObject = Localization.getFormattedDateLocale(newValue, format);
  return momentObject._locale._monthsShort;
}
export function getWeekDaysMin(newValue, format) {
  const momentObject = Localization.getFormattedDateLocale(newValue, format);
  return momentObject._locale._weekdaysMin;
}
export function calendarMouseWheelAction(startIndex, format, date, type, orijinalDate) {
  const newValue = getFocusDateTimeItem(date, startIndex, format, type);

  const momentObject = Localization.getFormattedDateLocale(newValue, format);
  if (momentObject && momentObject._isValid) {
    return momentObject._d;
  }
  if (momentObject !== undefined && !momentObject._isValid) {
    const pf = Localization.getFormattedDateLocale(newValue, format)._pf;
    const oldDate = cloneDate(orijinalDate);
    if (pf.overflow === 1) {
      // months
      return cloneDate(addMonths(oldDate, type));
    }
    if (pf.overflow === 2) {
      // days
      return cloneDate(addDays(oldDate, type));
    }
    if (pf.overflow === 3) {
      // hours
      return cloneDate(addHours(oldDate, type));
    }
    if (pf.overflow === 4) {
      // minutes
      return cloneDate(addMinutes(oldDate, type));
    }
    if (pf.overflow === 5) {
      // seconds
      return cloneDate(addSeconds(oldDate, type));
    }
  }
  return undefined;
}
export function calendarMouseWheelAction1(startIndex, format, date, type) {
  let dateTimeItem = getFocusDateTimeItem(startIndex, format);
  if (dateTimeItem) {
    if (dateTimeItem === 'DD') {
      if (type === 1) return addDays(date, 1);
      else return addDays(date, -1);
    }
    if (dateTimeItem === 'YYYY') {
      if (type === 1) return addYears(date, 1);
      return addYears(date, -1);
    }
    if (dateTimeItem === 'MM') {
      if (type === 1) return addMonths(date, 1);
      return addMonths(date, -1);
    }
    if (dateTimeItem === 'h') {
      if (type === 1) return addHours(date, 1);
      return addHours(date, -1);
    }
    if (dateTimeItem === 'mm') {
      if (type === 1) return addMinutes(date, 1);
      return addMinutes(date, -1);
    } else if (dateTimeItem === 'ss') {
      if (type === 1) return addSeconds(date, 1);
      return addSeconds(date, -1);
    } else if (dateTimeItem === 'a') {
      if (type === 1) return addHours(date, 12);
      return addSeconds(date, -12);
    }
  }
}
export function calendarMouseWheel(value, selectionStart, selectionEnd, deltaMode, seperator) {
  if (value && deltaMode && selectionStart !== undefined && selectionEnd !== undefined) {
    const array = value.split(seperator);
    let selectionValue = '';
    let index = '';
    array.forEach((item, i) => {
      if (!selectionValue) {
        if (item.length >= selectionStart) {
          selectionValue = item;
          index = i;
        } else selectionStart -= item.length + 1;
      }
    }, this);

    if (deltaMode === 'up' && !isNaN(Number(selectionValue))) {
      selectionValue = Number(selectionValue) + 1;
      array[index] = selectionValue;
      return arrayToString(array, seperator);
    }
    if (deltaMode === 'down' && !isNaN(Number(selectionValue))) {
      selectionValue = Number(selectionValue) - 1;
      array[index] = selectionValue;
      return arrayToString(array, seperator);
    }
  }
  return undefined;
}
export function arrayToString(array, seperator) {
  let returnString = '';
  for (let i = 0; i < array.length; i++) {
    returnString += array.length - 1 === i ? array[i] : array[i] + seperator;
  }
  return returnString;
}
export function calendarMouseWheelToDateTime(displayDateValue, selectedDate, type, datetimeOption) {
  if (displayDateValue && selectedDate instanceof Date && type) {
    var clone = cloneDate(selectedDate);
    const array = displayDateValue.split(seperator);
    if (type === 1 && array.length === 3) {
      clone.setDate(Number(array[0]));
      clone.setMonth(Number(array[1]) - 1);
      clone.setFullYear(Number(array[2]));
    } else if (type === 2 && array.length === 3) {
      clone.setHours(Number(array[0]));
      clone.setMinutes(Number(array[1]));
      clone.setSeconds(Number(array[2]));
    } else if (type === 2 && array.length === 2) {
      if (datetimeOption.isHour) clone.setHours(Number(array[0]));
      if (datetimeOption.isMinute) clone.setMinutes(Number(array[1]));
      if (datetimeOption.isSecond) clone.setSeconds(Number(array[1]));
    }
  } else {
    warning(false, 'unexpected params');
  }
  return clone;
}
export function getDatePickerStyle(context) {
  const boaPalette = context.theme.boaPalette;
  const palette = context.theme.palette;
  const datePicker = {
    calWorkDay: boaPalette.calWorkDay,
    calWeekend: boaPalette.calWeekend,
    calHoliday: boaPalette.calHoliday,
    calEve: boaPalette.calEve,
    calReliHoliday: boaPalette.calReliHoliday,
    dayBackgroundsShape: '3px',
    color: palette.primary1Color,
    dayButtonColor: boaPalette.base500,
    dayBorder: `1px solid ${boaPalette.pri500}`,
    holidayButtonColor: boaPalette.base300,
    holidayTextColor: boaPalette.base300,
    dateTextColor: boaPalette.base500,
    todayButtonBackgroundColor: boaPalette.pri500,
    todayButtonTextColor: boaPalette.comp500,
    textColor: palette.alternateTextColor,
    inputTextColor: boaPalette.base450,
    inputTextFontSize: 11,
    floatingLabelTextColor: boaPalette.base450,
    floatingLabelTextFontSize: 14,
    calendarTextColor: palette.textColor,
    selectColor: palette.primary2Color,
    selectTextColor: boaPalette.comp500,
    calendarYearBackgroundColor: palette.canvasColor,
    calendarBorder: '1px solid',
    calendarBorderColor: palette.borderColor,
    datetimeBaseTitleBackgroundColor: boaPalette.base10,
    datetimeBaseTitleBorderColor: boaPalette.base50,
    datetimeBaseTitleColor: boaPalette.base400,
    datetimeBaseTitleFontSize: 14,
    equalWidthContainerDisplay: 'flex',
    equalWidthContainerFlexWrap: 'nowrap',
    equalWidthItemFlex: '1 1',
    dateTimeItemFlex: '2 1',
    dialogMarginTop: 30,
    otherMonthTextColor: boaPalette.base300,
  };

  return datePicker;
}
export function getDefaultDate(props) {
  let defaultDate;
  if (props.defaultValue != undefined) {
    defaultDate = props.defaultValue;
  } else if (props.pageType == 'browse') {
    // defaultDate=new Date();
  }
  return defaultDate;
}
export function getDateToString(propDate, defaultDate) {
  let returnDate = defaultDate;
  if (isString(propDate)) {
    returnDate = new Date(propDate);
    if (isNaN(returnDate)) {
      returnDate = defaultDate;
    }
  } else if (propDate) {
    returnDate = propDate;
  }
  if (propDate === null || propDate === undefined) {
    return null;
  }
  return returnDate;
}
export function getDayList(calendarInfo, selectedDate, dayType, betweenDayCount) {
  // let monthFirstDate = cloneDate(getFirstDayOfMonth(selectedDate));
  const specialDayStringArray = [];
  const selectedMonth = selectedDate.getMonth();

  for (let i = 0; i < calendarInfo.length; i++) {
    // aynı ay içerisinde bir özel gün bulundu ise betweenDayCount kadar ileri geri gidilerek günler bulunur
    // aynı degerleri tekrardan gezmemek için var olan list içerisinde dolaşılıp break yapılur
    let sameValue = false;
    if (specialDayStringArray !== undefined && specialDayStringArray.length > 0) {
      for (let list = 0; list < specialDayStringArray.length; list++) {
        if (specialDayStringArray[list] !== undefined && specialDayStringArray[list].length > 0) {
          for (let item = 0; item < specialDayStringArray[list].length; item++) {
            const itemList = specialDayStringArray[list];
            if (itemList[item] !== undefined && itemList[item].day === calendarInfo[i].day) {
              sameValue = true;
            }
          }
        }
      }
      if (sameValue) continue;
    }
    if (
      dayType === calendarInfo[i].dayType
      // && calendarInfo[i].day.getMonth() === selectedMonth
    ) {
      let isContinue = false;
      if (calendarInfo[i].day.getMonth() === selectedMonth) {
        isContinue = true;
      } else {
        if (
          calendarInfo[i].day.getMonth() === selectedMonth - 1 ||
          (calendarInfo[i].day.getMonth() === 11 && selectedMonth === 0)
        ) {
          if (
            (selectedDate.getDay() > calendarInfo[i].day.getDay() || selectedDate.getDay() === 0) &&
            ((selectedDate.getTime() - calendarInfo[i].day.getTime()) / (1000 * 60 * 60 * 24) <
              selectedDate.getDay() - 1 ||
              ((selectedDate.getTime() - calendarInfo[i].day.getTime()) / (1000 * 60 * 60 * 24) <
                6 &&
                selectedDate.getDay() === 0))
          ) {
            isContinue = true;
          }
        } else {
          if (
            calendarInfo[i].day.getDay() != 1 &&
            (calendarInfo[i].day.getMonth() === selectedMonth + 1 ||
              (calendarInfo[i].day.getMonth() === 0 && selectedMonth === 11)) &&
            (calendarInfo[i].day.getDay() > calendarInfo[i].day.getDate() ||
              (calendarInfo[i].day.getDay() === 0 && calendarInfo[i].day.getDate() < 7))
          ) {
            isContinue = true;
          }
        }
      }
      if (isContinue == true) {
        const itemspecialDayString = [];
        itemspecialDayString.push(calendarInfo[i]);
        const negativeBetweenDaylength = i - betweenDayCount;

        for (let j = i - 1; j > negativeBetweenDaylength; j--) {
          if (j < 0) {
            break;
          }
          if (calendarInfo[i].dayType !== calendarInfo[j].dayType) {
            break;
          } else {
            itemspecialDayString.push(calendarInfo[j]);
          }
        }

        let positiveBetweenDaylength = i + betweenDayCount;
        if (calendarInfo.length < positiveBetweenDaylength) {
          positiveBetweenDaylength = calendarInfo.length;
        }
        for (let j = i + 1; j < positiveBetweenDaylength; j++) {
          if (calendarInfo[i].dayType !== calendarInfo[j].dayType) {
            break;
          } else if (
            calendarInfo[j].day.getDay() === 1 &&
            calendarInfo[j].day.getMonth() !== selectedMonth
          ) {
            break;
          } else {
            itemspecialDayString.push(calendarInfo[j]);
          }
        }
        specialDayStringArray.push(itemspecialDayString);
      }
    }
  }
  return specialDayStringArray;
}
export function checkDateForBusiness(props, oldDate, newDate, changeType) {
  let setNewDate = cloneDate(newDate);
  let dateNow = new Date();
  let day = setNewDate.getDate();

  if (props.isBusiness && props.calendarInfo && props.calendarInfo.length > 0) {
    let calendarInfo = props.calendarInfo;

    for (let i = 0; i < calendarInfo.length; i++) {
      if (isEqualDate(calendarInfo[i].day, newDate)) {
        if (!props.canSelectWeekendDays && calendarInfo[i].dayType === 1) {
          setNewDate.setDate(day + changeType);
          return checkDateForBusiness(props, oldDate, setNewDate, changeType);
        } else if (!props.canSelectSpecialDays && calendarInfo[i].dayType === 2) {
          setNewDate.setDate(day + changeType);
          return checkDateForBusiness(props, oldDate, setNewDate, changeType);
        } else if (!props.canSelectSpecialDays && calendarInfo[i].dayType === 3) {
          setNewDate.setDate(day + changeType);
          return checkDateForBusiness(props, oldDate, setNewDate, changeType);
        } else if (!props.canSelectSpecialDays && calendarInfo[i].dayType === 4) {
          setNewDate.setDate(day + changeType);
          return checkDateForBusiness(props, oldDate, setNewDate, changeType);
        }
      }
    }
  }
  let subDay = substructDay(dateNow, setNewDate);
  if (!props.canSelectOldDates && subDay < 0) {
    setNewDate.setDate(day + 1);
    return checkDateForBusiness(props, oldDate, setNewDate, changeType);
  }
  return newDate;
}
export const DayType = {
  EmptyDay: -1,
  WorkDay: 0,
  WeekendDay: 1,
  Holiday: 2,
  ReliHoliday: 3,
  Eve: 4,
};
export const TimeType = {
  Hour: 1,
  Minute: 2,
  Second: 3,
  MonthListName: 4,
  Numeric: 5,
};

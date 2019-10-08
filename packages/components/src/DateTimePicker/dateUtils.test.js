import { assert } from 'chai';
import { Localization } from '@kuveytturk/boa-utils';
import {
  formatIso,
  getMonthName,
  addHours,
  addMinutes,
  addSeconds,
  cloneDate,
  isEqualDateTime,
  isEqualDate,
  getPatternDate,
  getFormatDecomposition,
  momentFormat,
  receiveFormat,
  arrayToString,
  getFirstDayOfMonth,
} from './dateUtils';

describe('dateUtils', () => {
  it('formatIso length', () => {
    const isoFormatedDate = formatIso(new Date());
    assert.strictEqual(isoFormatedDate.length, 10);
  });

  it('getMonthName', () => {
    const monthName = getMonthName(4);
    assert.strictEqual(monthName, 'May');
  });

  it('addHours', () => {
    const date = new Date();
    const added = 3;
    const addedDate = addHours(date, added);
    assert.strictEqual(addedDate.getHours() % 24, (date.getHours() + added) % 24);
  });

  it('addMinutes', () => {
    const date = new Date();
    const added = 3;
    const addedDate = addMinutes(date, added);
    assert.strictEqual(addedDate.getMinutes() % 60, (date.getMinutes() + added) % 60);
  });

  it('addSeconds', () => {
    const date = new Date();
    const added = 3;
    const addedDate = addSeconds(date, added);
    assert.strictEqual(addedDate.getSeconds() % 60, (date.getSeconds() + added) % 60);
  });

  it('cloneDate', () => {
    const date = cloneDate();
    assert.strictEqual(date, undefined);
  });

  it('isEqualDateTime', () => {
    const date = new Date();
    const isEqual = isEqualDateTime(date, date);
    assert.strictEqual(isEqual, true);
  });

  it('isEqualDateTime undefined', () => {
    const isEqual = isEqualDateTime(undefined, undefined);
    assert.strictEqual(isEqual, true);
  });

  it('isEqualDateTime string', () => {
    const date = '1989-05-14';
    const isEqual = isEqualDateTime(date, date);
    assert.strictEqual(isEqual, true);
  });

  it('isEqualDate', () => {
    const date = new Date();
    const isEqual = isEqualDate(date, date);
    assert.strictEqual(isEqual, true);
  });

  it('isEqualDate undefined', () => {
    const isEqual = isEqualDate(undefined, undefined);
    assert.strictEqual(isEqual, true);
  });

  it('isEqualDate string', () => {
    const date = '1989-05-14';
    const isEqual = isEqualDate(date, date);
    assert.strictEqual(isEqual, true);
  });
  it('getPatternDate null', () => {
    const date = new Date();
    const pattern = 'test';
    const isEqual = getPatternDate(date, pattern);
    assert.strictEqual(isEqual, null);
  });
  it('getPatternDate undefined', () => {
    const date = new Date();
    const pattern = null;
    const isEqual = getPatternDate(date, pattern);
    assert.strictEqual(isEqual, undefined);
  });

  it('getFormatDecomposition format is null', () => {
    const format = null;
    const formats = {
      dateFormat: momentFormat.Date,
      timeFormat: undefined,
      dateFormatHint: Localization.stringLowerCase(
        Localization.getDateTimeFormat(momentFormat.Date),
      ),

    };
    let dateMask = formats.dateFormatHint;
    dateMask = dateMask.replaceAll('d', 'n');
    dateMask = dateMask.replaceAll('m', 'n');
    dateMask = dateMask.replaceAll('y', 'n');
    formats.dateMask = dateMask;
    formats.timeMask = undefined;

    const isEqual = getFormatDecomposition(format);
    assert.deepEqual(isEqual, formats);
  });

  it('getFormatDecomposition format is receiveFormat.LD', () => {
    const format = receiveFormat.LD;
    const formats = {
      dateFormat: momentFormat.Date,
      dateFormatHint: Localization.stringLowerCase(
        Localization.getDateTimeFormat(momentFormat.Date),
      ),
      timeFormat: undefined,
      timeMask: undefined,
    };

    let dateMask = formats.dateFormatHint;
    dateMask = dateMask.replaceAll('d', 'n');
    dateMask = dateMask.replaceAll('m', 'n');
    dateMask = dateMask.replaceAll('y', 'n');
    formats.dateMask = dateMask;

    const isEqual = getFormatDecomposition(format);
    assert.deepEqual(isEqual, formats);
  });

  it('getFormatDecomposition format is receiveFormat.LDLT', () => {
    const format = receiveFormat.LDLT;
    const formats = {
      dateFormat: momentFormat.Date,
      timeFormat: momentFormat.hourAndMinuteAndSecond,
    };

    formats.dateFormatHint = Localization.stringLowerCase(
      Localization.getDateTimeFormat(formats.dateFormat),
    );

    formats.timeFormatHint = Localization.stringLowerCase(
      Localization.getDateTimeFormat(formats.timeFormat),
    );

    let dateMask = formats.dateFormatHint;
    dateMask = dateMask.replaceAll('d', 'n');
    dateMask = dateMask.replaceAll('m', 'n');
    dateMask = dateMask.replaceAll('y', 'n');
    formats.dateMask = dateMask;

    let timeMask = formats.timeFormatHint;
    timeMask = timeMask.replaceAll('s', 'n');
    timeMask = timeMask.replaceAll('h', 'n');
    timeMask = timeMask.replaceAll('m', 'n');
    formats.timeMask = timeMask;

    const isEqual = getFormatDecomposition(format);
    assert.deepEqual(isEqual, formats);
  });

  it('getFormatDecomposition format is receiveFormat.LDT', () => {
    const format = receiveFormat.LDT;
    const formats = {
      dateFormat: momentFormat.Date,
      timeFormat: momentFormat.hourAndMinute,
    };

    formats.dateFormatHint = Localization.stringLowerCase(
      Localization.getDateTimeFormat(formats.dateFormat),
    );

    formats.timeFormatHint = Localization.stringLowerCase(
      Localization.getDateTimeFormat(formats.timeFormat),
    );

    let dateMask = formats.dateFormatHint;
    dateMask = dateMask.replaceAll('d', 'n');
    dateMask = dateMask.replaceAll('m', 'n');
    dateMask = dateMask.replaceAll('y', 'n');
    formats.dateMask = dateMask;

    let timeMask = formats.timeFormatHint;
    timeMask = timeMask.replaceAll('s', 'n');
    timeMask = timeMask.replaceAll('h', 'n');
    timeMask = timeMask.replaceAll('m', 'n');
    formats.timeMask = timeMask;

    const isEqual = getFormatDecomposition(format);
    assert.deepEqual(isEqual, formats);
  });

  it('getFormatDecomposition format is custom', () => {
    const formats = {
      dateFormat: momentFormat.Date,
      timeFormat: undefined,
      dateFormatHint: Localization.stringLowerCase(
        Localization.getDateTimeFormat(momentFormat.Date),
      ),
    };
    let dateMask = formats.dateFormatHint;
    dateMask = dateMask.replaceAll('d', 'n');
    dateMask = dateMask.replaceAll('m', 'n');
    dateMask = dateMask.replaceAll('y', 'n');
    formats.dateMask = dateMask;
    formats.timeMask = undefined;

    const format = 'test';
    const isEqual = getFormatDecomposition(format);

    assert.deepEqual(isEqual, formats);
  });

  it('arrayToString', () => {
    const array = [0, 1, 2];
    const seperator = ';';
    const isEqual = arrayToString(array, seperator);

    assert.strictEqual(isEqual, '0;1;2');
  });

  it('getFirstDayOfMonth when date null', () => {
    const date = null;
    const isEqual = getFirstDayOfMonth(date);

    assert.deepEqual(isEqual, undefined);
  });

  it('getFirstDayOfMonth when date is not null', () => {
    const date = new Date();
    const isEqual = getFirstDayOfMonth(date);

    assert.deepEqual(isEqual, new Date(date.getFullYear(), date.getMonth(), 1));
  });
});

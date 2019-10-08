import * as React from "react";
import { ComponentBaseProps, ComponentBase } from "@kuveytturk/boa-base";

export interface DateTimePickerProps extends ComponentBaseProps {
  cancelLabel?: string;
  canSelectOldDates?: boolean;
  canSelectSpecialDays?: boolean;
  canSelectWeekendDays?: boolean;
  dateOnChange?(): void;
  defaultValue?: any;
  errorTextDate?: string;
  errorTextTime?: string;
  firstDayOfWeek?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  floatingLabelTextDate?: string;
  floatingLabelTextTime?: string;
  format?: string;
  fullWidth?: boolean;
  hintTextDate?: string;
  hintTextTime?: string;
  inlineGridMode?: boolean;
  isBusiness?: boolean;
  isFlexMode?: boolean;
  maxDate?: any;
  minDate?: any;
  mode?: "portrait" | "landscape";
  noDialog?: boolean;
  okLabel?: string;
  onChange?(): void;
  openBoaCalendar?: boolean;
  pageType?: "browse" | "transactional";
  timeOnChange?(): void;
  value?: any;
}

export default class DateTimePicker extends ComponentBase<DateTimePickerProps> {
  onChange(event: any, value: any): any;
  dateOnChange(event: any, value: any, addTimezoneOffset: any): any;
  timeOnChange(event: any, value: any): any;
  handleRemoveDate(e: any): any;
  handleAddDate(e: any): any;
  dateUpdate(oldDate: any, newDate: any, changeType: any, isSetState: any): any;
  getValue(): any;
  resetValue(): any;
  setDisable(value: any): any;
  getSnapshot(): any;
  setSnapshot(snapshot: any): any;
  validateConstraint(): any;
}

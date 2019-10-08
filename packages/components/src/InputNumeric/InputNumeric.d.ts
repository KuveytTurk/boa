import * as React from "react";
import { InputProps } from "../Input/Input";
import { EditorBase } from "@kuveytturk/boa-base";

export interface InputNumericProps extends InputProps {
  caretPosition?: number;
  format?: string;
  maxValue?: number;
  minValue?: number;
  step?: number;
}

export default class InputNumeric extends EditorBase<InputNumericProps> {
  onKeyDown(e: any): any;
  onChange(e: any): any;
  onBlur(e: any): any;
  getValue(): any;
  setValue(value: any, format: any): any;
  resetValue(): any;
  setDisable(value: any): any;
  getSnapshot(): any;
  setSnapshot(snapshot: any): any;
  checkNumberFormatIsValid(value: any): any;
  checkNumberRangeIsValid(value: any): any;
  getParsedValue(value: any): any;
  getFormattedValue(value: any, format: any): any;
  focus(): any;
  validateConstraint(): any;
}

import * as React from "react";
import { InputProps } from "../Input/Input";
import { EditorBase } from "@kuveytturk/boa-base";

export interface InputMaskProps extends InputProps {
  countryCode?: string;
  fullWidth?: boolean;
  inputType?: string;
  mask?: string;
  maxLength?: number;
  noWrap?: boolean;
  showCounter?: boolean;
}

export default class InputMask extends EditorBase<InputMaskProps> {
  setProps(props: any): any;
  isCorrectFormatText(mask: any, text: any): any;
  onChange(e: any): any;
  onClearClick(e: any): any;
  onKeyDown(e: any): any;
  setDisable(value: any): any;
  getValue(): any;
  resetValue(): any;
  onFocus(e: any): any;
  onBlur(e: any): any;
  setCounter(): any;
  generateHelperText(): any;
  runRender(): any;
  setTestResult(value: any): any;
}

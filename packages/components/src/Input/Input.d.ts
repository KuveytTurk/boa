import * as React from "react";
import { ComponentBaseProps, EditorBase } from "@kuveytturk/boa-base";

export interface InputProps extends ComponentBaseProps {
  bottomLeftInfo?: string;
  bottomLeftInfoEnable?: boolean;
  bottomRightInfo?: string;
  bottomRightInfoEnable?: boolean;
  defaultValue?: any;
  disabledCounterCharacter?: string;
  errorStyle?: object;
  errorText?: string;
  floatingLabelStyle?: object;
  floatingLabelText?: string;
  formControlStyle?: object;
  fullWidth?: boolean;
  helperText?: string;
  hintText?: string;
  id?: string;
  inlineGridMode?: boolean;
  inputAlign?: "left" | "right" | "center";
  inputProps?: object;
  inputStyle?: object;
  maskedMaxLength?: number;
  maxLength?: number;
  multiLine?: boolean;
  name?: string;
  noWrap?: boolean;
  onBlur?(): void;
  onChange?(): void;
  onChangeSync?(): void;
  onClearClick?(): void;
  onFocus?(): void;
  onKeyDown?(): void;
  onKeyUp?(): void;
  onTimerFinished?(): void;
  prefixText?: any;
  rows?: number;
  rowsMax?: number;
  showClearButton?: boolean;
  showCounter?: boolean;
  suffixText?: any;
  textSelection?: object;
  timerDuration?: number;
  type?: string; // todo: replaced with union! not used due to input mask uses this prop
  underlineShow?: boolean;
  value?: any;
}

export default class Input extends EditorBase<InputProps> {
  counterUpdate(props: any, value: any): any;
  getValue(): any;
  setValue(value: any): any;
  resetValue(): any;
  setDisable(value: any): any;
  onBlur(e: any): any;
  onChange(e: any, v: any): any;
  onFocus(e: any): any;
  setTimer(duration: any): any;
  focus(): any;
  validationToString(): any;
}

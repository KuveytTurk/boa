import * as React from "react";
import { ComponentBaseProps, ComponentBase } from "@kuveytturk/boa-base";

export interface CheckBoxProps extends ComponentBaseProps {
  checked?: boolean;
  checkedIcon?: React.ReactNode;
  classes?: object;
  color?: "default" | "inherit" | "primary" | "secondary";
  defaultChecked?: boolean;
  disableRipple?: boolean;
  errorText?: string;
  errorTextVisible?: boolean;
  icon?: React.ReactNode;
  indeterminate?: boolean;
  label?: string;
  name?: string;
  onChange?(): void;
  value?: string;
}

export default class CheckBox extends ComponentBase<CheckBoxProps> {
  getValue(): any;
  setValue(value: any): any;
  resetValue(): any;
  setDisable(value: any): any;
  onCheck(event: any, isInputChecked: any): any;
}

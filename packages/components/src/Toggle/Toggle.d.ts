import * as React from "react";
import { ComponentBaseProps, ComponentBase } from "@kuveytturk/boa-base";

export interface ToggleProps extends ComponentBaseProps {
  defaultToggled?: boolean;
  elementStyle?: object;
  errorText?: string;
  iconProperties?: object;
  iconStyle?: object;
  informationText?: string;
  inputStyle?: object;
  label?: React.ReactNode;
  labelPosition?: "left" | "right";
  labelStyle?: object;
  onToggle?(): void;
  rippleStyle?: object;
  toggled?: boolean;
  trackSwitchedStyle?: object;
  valueLink?: object;
}

export default class Toggle extends ComponentBase<ToggleProps> {
  getValue(): any;
  setValue(value: any): any;
  resetValue(): any;
  setDisable(value: any): any;
  handleOnToggle(event: any, value: any): any;
}

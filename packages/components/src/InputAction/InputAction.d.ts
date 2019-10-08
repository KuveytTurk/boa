import * as React from "react";
import { InputProps } from "../Input/Input";
import { ComponentBase } from "@kuveytturk/boa-base";

export interface InputActionProps extends InputProps {
  canActionFocusable?: boolean;
  hideLeftIcons?: boolean;
  hideRightIconKeyList?: any[];
  hideRightIcons?: boolean;
  inputDisabled?: boolean;
  leftIconList?: any[];
  rightIconList?: any[];
}

export default class InputAction extends ComponentBase<InputActionProps> {
  getValue(): any;
  setValue(value: any): any;
  resetValue(): any;
  setDisable(value: any): any;
  onChange(e: any, v: any): any;
  onBlur(e: any): any;
  setFloatingLabelStyle(rightIconList: any, leftIconList: any): any;
  getFloatingLabelStyle(
    usePropValue: any,
    rightIconList: any,
    leftIconList: any
  ): any;
  passwordClicked(): any;
  focus(): any;
  hideLeftIcons(): any;
  hideRightIcons(): any;
  showLeftIcons(): any;
  showRightIcons(): any;
  validateConstraint(): any;
  renderBInput(type: any, leftIcons: any, rightIcons: any): any;
  renderBInputNumeric(leftIcons: any, rightIcons: any): any;
}

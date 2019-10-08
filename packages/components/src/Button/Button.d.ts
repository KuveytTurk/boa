import * as React from "react";
import { ComponentBaseProps, ComponentBase } from "@kuveytturk/boa-base";

export interface ButtonProps extends ComponentBaseProps {
  allowLabelCase?: boolean;
  buttonSize?: "small" | "medium" | "large";
  colorType?: "default" | "primary" | "secondary";
  dynamicIcon?: string;
  fontIcon?: string;
  fullWidth?: boolean;
  icon?: any;
  iconProperties?: object;
  mini?: boolean;
  onClick?(): void;
  svgIcon?: string;
  text?: string;
  textPosition?: "center" | "left" | "right";
  textStyle?: object;
  tooltip?: string;
  tooltipPosition?: string;
  type?: "contained" | "text" | "fab" | "icon";
}

export default class Button extends ComponentBase<ButtonProps> {
  setDisable(value: any): any;
  getLabel(): any;
  createButtonElement(variant: any): any;
  createIconButtonElement(): any;
  createButton(): any;
}

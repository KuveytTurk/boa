import * as React from "react";
import { ComponentBaseProps, ComponentBase } from "@kuveytturk/boa-base";

export interface IconButtonProps extends ComponentBaseProps {
  color?: "default" | "inherit" | "primary" | "secondary" | "disabled";
  disableRipple?: boolean;
  dynamicIcon?: string;
  focusRipple?: boolean;
  fontIcon?: string;
  iconProperties?: object;
  onClick?(): void;
  svgIcon?: string;
  tooltip?: string;
  tooltipPosition?: string;
}

export default class IconButton extends ComponentBase<IconButtonProps> {}

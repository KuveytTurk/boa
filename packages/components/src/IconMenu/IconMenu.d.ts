import * as React from "react";
import { ComponentBaseProps, ComponentBase } from "@kuveytturk/boa-base";

declare interface AnchorOrigin {
  horizontal: any;
  vertical: any;
}

declare interface TransformOrigin {
  horizontal: any;
  vertical: any;
}

export interface IconMenuProps extends ComponentBaseProps {
  anchorOrigin?: AnchorOrigin;
  animated?: boolean;
  classes?: object;
  className?: string;
  customIcon?: object;
  iconStyle?: object;
  iconType?: "vertical" | "horizontal" | "custom";
  isOriginSetted?: boolean;
  items?: any[];
  menuItems?: any[];
  menuStyle?: object;
  multiple?: boolean;
  onChange?(): void;
  onClick?(): void;
  open?: boolean;
  touchTapCloseDelay?: number;
  transformOrigin?: TransformOrigin;
}

export default class IconMenu extends ComponentBase<IconMenuProps> {
  onChange(parameters: any): any;
  handleClick(event: any): any;
  handleClose(): any;
}

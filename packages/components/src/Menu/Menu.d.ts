import * as React from "react";
import { ComponentBaseProps, ComponentBase } from "@kuveytturk/boa-base";

export interface MenuProps extends ComponentBaseProps {
  classes?: object;
  isMenuItemList?: boolean;
  items?: any[];
  multiple?: boolean;
  onChange?(event: object, value: any): void;
  parentMenuItem?: object;
  primaryTextPadding?: any;
  value?: any;
  width?: string | number;
}

export default class Menu extends ComponentBase<MenuProps> {
  menuItemSelected(parameters: any): any;
  getIcon(iconProp: any): any;
}

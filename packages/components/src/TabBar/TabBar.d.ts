import * as React from "react";
import { ComponentBaseProps, ComponentBase } from "@kuveytturk/boa-base";

export interface TabBarProps extends ComponentBaseProps {
  centered?: boolean;
  children?: React.ReactNode;
  classes?: object;
  className?: string;
  containerType?: "default" | "page" | "card";
  defaultValue?: any;
  fullWidth?: boolean;
  indicatorClassName?: string;
  indicatorColor?: any;
  isContentDisabled?: boolean;
  leftIcon?: string | React.ReactNode;
  leftIconButtonVisibility?: boolean;
  mode?: "primary" | "secondary";
  onChange?(event: object, value: number): void;
  onRightIconClick?(event: object, value: number): void;
  rightIconButtonVisibility?: boolean;
  scrollable?: boolean;
  scrollButtons?: "auto" | "on" | "off";
  tabItems?: any[];
  TabScrollButton?: any;
  tabTemplateStyle?: object;
  value?: any;
}

export default class TabBar extends ComponentBase<TabBarProps> {
  resetValue(): any;
  scrollStateUpdate(): any;
  updateBTabBarDynamic(tabItems: any, value: any): any;
  handleChange(event: any, value: any): any;
  handleRightIconClick(value: any): any;
  handleLeftIconClick(value: any): any;
  handleTabItemChange(value: any): any;
  getLeftIconButton(isLeftIconButtonVisibile: any, item: any): any;
  getRightIconButton(isRightIconButtonVisibile: any, item: any): any;
  getTabLabel(item: any): any;
  renderTabScrollButton(): any;
  getTabItems(): any;
  mouseOver(value: any): any;
  mouseOut(): any;
  getTabContents(): any;
  getBorderBottomStyle(): any;
  renderDefault(): any;
  renderPage(): any;
  renderCard(): any;
  getRightIconButtonForAppBar(isRightIconButtonVisibile: any, value: any): any;
  getTabLabelForAppBar(item: any): any;
  renderAppBar(): any;
}

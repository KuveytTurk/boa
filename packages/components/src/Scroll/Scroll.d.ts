import * as React from "react";
import { ComponentBaseProps, ComponentBase } from "@kuveytturk/boa-base";

export interface ScrollProps extends ComponentBaseProps {
  children: React.ReactNode;
  divStyle?: object;
  option?: object;
}

export default class Scroll extends ComponentBase<ScrollProps> {
  resetScrollPosition(): any;
  update(): any;
  setDisable(value: any): any;
  setScrollTop(top: any): any;
  setScrollLeft(left: any): any;
}

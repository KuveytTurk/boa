import * as React from "react";
import { ComponentBaseProps, ComponentBase } from "@kuveytturk/boa-base";

export interface LabelProps extends ComponentBaseProps {
  maxFontSize?: string | number;
  maxWidth?: number;
  minFontSize?: string | number;
  style?: object;
  text?: string;
  textPosition?: "center" | "left" | "right";
}

export default class Label extends ComponentBase<LabelProps> {
  checkLabelFontSize(props: any): any;
}

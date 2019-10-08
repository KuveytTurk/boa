import * as React from "react";
import { ComponentBaseProps, ComponentBase } from "@kuveytturk/boa-base";

export interface ToolTipProps extends ComponentBaseProps {
  tooltip?: string;
  tooltipPosition?: string;
}

export default class ToolTip extends ComponentBase<ToolTipProps> {
  setValue(value: any): any;
  getValue(): any;
}

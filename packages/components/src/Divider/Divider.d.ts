import * as React from "react";
import { ComponentBaseProps, ComponentBase } from "@kuveytturk/boa-base";

export interface DividerProps extends ComponentBaseProps {
  absolute?: boolean;
  classes?: object;
  className?: string;
  component?: any;
  inset?: boolean;
  light?: boolean;
}

export default class Divider extends ComponentBase<DividerProps> {}

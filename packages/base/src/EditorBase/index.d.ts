import * as React from "react";
import { ComponentBase } from "@kuveytturk/boa-base";

export default class EditorBase<T = any> extends ComponentBase<T> {
  validateConstraint(): any;
  isNullOrEmpty(value: any): any;
  checkLength(value: any, options: any): any;
}

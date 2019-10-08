import * as React from "react";
import { ComponentSize } from "@kuveytturk/boa-base";

export interface ComponentBaseProps {
  componentSize?:
    | ComponentSize.LARGE
    | ComponentSize.MEDIUM
    | ComponentSize.SMALL
    | ComponentSize.XSMALL;
  context?: object;
  disabled?: boolean;
  id?: string;
  isVisible?: boolean;
  newLine?: boolean;
  snapKey?: string;
  snapshot?: object;
  style?: object;
  valueConstraint?: object;
  visible?: boolean;
}

export default class ComponentBase<T = any> extends React.Component<T> {
  getInstance(): this;
  getMessage(groupName: string, propertyName: string): string;
  getMessageCode(groupName: string, propertyName: string): any;
  getSnapKey(childSnapKey: string): string;
  getSnapshot(): any;
  setSnapshot(snapshot: any): any;
  isMobile(): boolean;
  isMobileOrTablet(): boolean;
  validateConstraint(): boolean;
}

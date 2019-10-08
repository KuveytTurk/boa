import * as React from "react";
import { ComponentBaseProps, ComponentBase } from "@kuveytturk/boa-base";

export interface DocNoticeProps extends ComponentBaseProps {
  content?: string;
  fitMode?: boolean;
  header?: string;
  type?: "info" | "tip" | "warning" | "error";
}

export default class DocNotice extends ComponentBase<DocNoticeProps> {
  getStyle(): any;
  getIcon(): any;
}

import * as React from "react";
import { ComponentBaseProps, ComponentBase } from "@kuveytturk/boa-base";

export interface DocTocProps extends ComponentBaseProps {
  activeItem?: string;
  content?: any[];
  header?: string;
  linkOnClick?(): void;
}

export default class DocToc extends ComponentBase<DocTocProps> {
  onClick(id: any): any;
  getLinkStyle(content: any, isHeader: any): any;
  getListItemStyle(level: any, index: any): any;
  populateContent(children: any, level: any): any;
}

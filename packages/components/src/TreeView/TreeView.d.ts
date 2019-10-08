import * as React from "react";
import { ComponentBaseProps, ComponentBase } from "@kuveytturk/boa-base";

export interface TreeViewProps extends ComponentBaseProps {
  data?: any[] | object;
  expandAll?: boolean;
  footerStyle?: object;
  height?: string | number;
  hintText?: string;
  isCheckable?: boolean;
  isLeafCheckable?: boolean;
  isMultiSelect?: boolean;
  onCheckNode?(): void;
  rowHeight?: number;
  showFooter?: boolean;
  showIcons?: boolean;
  showSearch?: boolean;
  width?: string | number;
  showFolderIcon: boolean;
}

export default class TreeView extends ComponentBase<TreeViewProps> {
  getSnapshot(): any;
  setSnapshot(snapshot: any): any;
  manageNodes(data: any, expandAll: any): any;
  handleChange(nodes: any): any;
  getValue(): any;
  getCheckedNodes(): any;
  onSelectedTreeNode(node: any): any;
  generateTreeNode(node: any, rest: any): any;
  wrap(match: any): any;
  highlightSearchTerm(node: any): any;
  getStyle(): any;
  getFooterText(nodes: any): any;
  calculateHeight(): any;
}

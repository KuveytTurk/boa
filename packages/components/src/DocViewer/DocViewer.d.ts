import * as React from "react";
import { ComponentBaseProps, ComponentBase } from "@kuveytturk/boa-base";

export interface DocViewerProps extends ComponentBaseProps {
  content?: string;
  editorType?:
    | "androidStudio"
    | "atomOneDark"
    | "atomOneLight"
    | "github"
    | "monokaiSublime"
    | "raiinbow"
    | "vs"
    | "xcode";
}

export default class DocViewer extends ComponentBase<DocViewerProps> {
  getTableOfContent(source?: any): any;
  changeEditorType(event: any): any;
  getStyle(): any;
}

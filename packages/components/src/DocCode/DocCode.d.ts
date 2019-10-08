import * as React from "react";
import { ComponentBaseProps, ComponentBase } from "@kuveytturk/boa-base";

export interface DocCodeProps extends ComponentBaseProps {
  content?: string;
  editorType?:
    | "androidStudio"
    | "atomOneDark"
    | "atomOneLight"
    | "github"
    | "monokaiSublime"
    | "rainbow"
    | "vs"
    | "xcode";
  highlight?: boolean;
  lang?: string;
}

export default class DocCode extends ComponentBase<DocCodeProps> {
  getMarkup(): any;
  getHighlightCSS(): any;
}

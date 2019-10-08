import * as React from "react";
import { ComponentBaseProps, ComponentBase } from "@kuveytturk/boa-base";

declare interface TransitionDuration {
  enter?: number;
  exit?: number;
}

export interface DialogProps extends ComponentBaseProps {
  autoDetectWindowHeight?: boolean;
  children?: React.ReactNode;
  classes?: object;
  className?: string;
  content?: any;
  dialogBoxContentPadding?: any;
  disableBackdropClick?: boolean;
  disableEscapeKeyDown?: boolean;
  disableRestoreFocus?: boolean;
  fullScreen?: boolean;
  fullWidth?: boolean;
  maxWidth?: "xs" | "sm" | "md" | false;
  modal?: boolean;
  onClose?(event: object): void;
  onEnter?(): void;
  onEntered?(): void;
  onEntering?(): void;
  onEscapeKeyDown?(): void;
  onExit?(): void;
  onExited?(): void;
  onExiting?(): void;
  open: boolean;
  PaperProps?: object;
  repositionOnUpdate?: boolean;
  showHeader?: boolean;
  titleWithCloseButtonEnabled?: boolean;
  transition?: any;
  transitionDuration?: number | TransitionDuration;
}

export default class Dialog extends ComponentBase<DialogProps> {
  setTitle(title: any): any;
  setLeftTitleButton(value: any): any;
  open(open: any): any;
  fireClosable(): any;
  onEnter(): any;
}

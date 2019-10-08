import * as React from "react";
import { ComponentBaseProps, ComponentBase } from "@kuveytturk/boa-base";

declare interface AnchorOrigin {
  horizontal?: any;
  vertical?: any;
}

declare interface AnchorPosition {
  left?: number;
  top?: number;
}

declare interface TransformOrigin {
  horizontal?: any;
  vertical?: any;
}

declare interface TransitionDuration {
  enter?: number;
  exit?: number;
}

export interface PopoverProps extends ComponentBaseProps {
  anchorEl?: any;
  anchorOrigin?: AnchorOrigin;
  anchorPosition?: AnchorPosition;
  anchorReference?: "anchorEl" | "anchorPosition";
  children?: React.ReactNode;
  classes?: object;
  container?: any;
  disableRestoreFocus?: boolean;
  elevation?: number;
  getContentAnchorEl?(): void;
  manager?: object;
  marginThreshold?: number;
  onClose?(event: object): void;
  onEnter?(): void;
  onEntered?(): void;
  onEntering?(): void;
  onExit?(): void;
  onExited?(): void;
  onExiting?(): void;
  open?: boolean;
  PaperProps?: object;
  role?: string;
  transformOrigin?: TransformOrigin;
  transition?: any;
  transitionDuration?: any;
}

export default class Popover extends ComponentBase<PopoverProps> {
  openPopover(): any;
  manualOpen(openElement: any, width: any): any;
  manualClose(): any;
  onRequestClose(reason: any): any;
}

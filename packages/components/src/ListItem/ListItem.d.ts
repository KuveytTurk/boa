import * as React from "react";
import { ComponentBaseProps, ComponentBase } from "@kuveytturk/boa-base";

export interface ListItemProps extends ComponentBaseProps {
  button?: boolean;
  children?: React.ReactNode;
  classes?: object;
  className?: string;
  component?: any;
  ContainerComponent?: any;
  ContainerProps?: object;
  dense?: boolean;
  disableGutters?: boolean;
  divider?: boolean;
  primaryText?: string;
  secondaryText?: string;
  selected?: boolean;
}

export default class ListItem extends ComponentBase<ListItemProps> {}

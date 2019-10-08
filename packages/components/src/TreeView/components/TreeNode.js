/* eslint-disable
jsx-a11y/anchor-is-valid,
jsx-a11y/no-static-element-interactions,
jsx-a11y/click-events-have-key-events, */
import React from 'react';
import { ComponentBase, ComponentComposer } from '@kuveytturk/boa-base';

@ComponentComposer
class TreeNode extends ComponentBase {
  state = {
    hovered: false,
  };

  constructor(props, context) {
    super(props, context);
    this.onClick = this.onClick.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
  }

  onMouseEnter() {
    this.setState({ hovered: true });
  }

  onMouseLeave() {
    this.setState({ hovered: false });
  }

  onClick() {
    /* istanbul ignore else */
    if (this.props.onSelected) {
      this.props.onSelected(this.props.node);
    }
  }

  getStyle() {
    const { hovered } = this.state;
    const { selected } = this.props;

    const style = {
      cursor: 'default',
      position: 'relative',
      background: 'transparent',
      color: this.props.context.theme.boaPalette.base450,
      clear: 'both',
      zoom: 1,
      whiteSpace: 'nowrap',
      display: 'flex',
      alignItems: 'center',
      lineHeight: `${this.props.rowHeight}px`,
    };

    if (hovered) {
      style.background = 'RGBA(0, 0, 0, 0.08)';
    } else if (selected) {
      style.background = 'RGBA(0, 0, 0, 0.14)';
    }

    if (this.props.context.localization.isRightToLeft) {
      style.marginLeft = 12;
    } else {
      style.marginRight = 12;
    }
    return style;
  }

  render() {
    return (
      <div
        style={this.getStyle()}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        onClick={this.onClick}
      >
        {this.props.children}
      </div>
    );
  }
}

export default TreeNode;

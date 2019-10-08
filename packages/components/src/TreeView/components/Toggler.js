/* eslint-disable
jsx-a11y/anchor-is-valid,
jsx-a11y/no-static-element-interactions,
jsx-a11y/click-events-have-key-events, */
import React from 'react';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import { ComponentBase, ComponentComposer } from '@kuveytturk/boa-base';
import { getNodeRenderOptions, updateNode } from '../selectors/nodes';

@ComponentComposer
class Toggler extends ComponentBase {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    const { isExpanded } = getNodeRenderOptions(this.props.node);
    if (this.props.onChange) {
      this.props.onChange(updateNode(this.props.node, { expanded: !isExpanded }));
    } else {
      updateNode(this.props.node, { expanded: !isExpanded });
    }
  }

  render() {
    const style = {
      textAlign: 'center',
      width: '24px',
      display: 'inline-block',
      verticalAlign: 'middle',
      height: this.props.rowHeight,
      cursor: 'pointer',
      lineHeight: `${this.props.rowHeight}px`,
    };

    if (this.props.context.localization.isRightToLeft) {
      style.marginLeft = 12;
    } else {
      style.marginRight = 12;
    }

    let content;
    const { node, context } = this.props;
    const theme = context.theme;
    const boaPalette = theme.boaPalette;

    if (node && (node.children || []).length > 0 && node.state) {
      if (this.props.node.state.expanded === false) {
        content = <Add style={{ color: boaPalette.base400, verticalAlign: 'middle' }} />;
      } else if (this.props.node.state.expanded === true) {
        content = <Remove style={{ color: boaPalette.base400, verticalAlign: 'middle' }} />;
      }
    }

    return (
      <a style={style} onClick={this.handleChange}>
        {content}
      </a>
    );
  }
}
export default Toggler;

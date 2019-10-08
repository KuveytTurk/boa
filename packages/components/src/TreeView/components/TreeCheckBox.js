import React from 'react';
import { CheckBox } from '@kuveytturk/boa-components/CheckBox';
import { ComponentBase, ComponentComposer } from '@kuveytturk/boa-base';
import { getNodeRenderOptions, updateNode } from '../selectors/nodes';

@ComponentComposer
class TreeCheckBox extends ComponentBase {
  constructor(props, context) {
    super(props, context);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    const { isChecked } = getNodeRenderOptions(this.props.node);
    if (this.props.onChange) {
      this.props.onChange(updateNode(this.props.node, { checked: !isChecked }));
    } else {
      updateNode(this.props.node, { checked: !isChecked });
    }

    if (this.props.onCheckNode) {
      this.props.onCheckNode(this.props.node, !isChecked);
    }
  }

  render() {
    const { context, node, rowHeight } = this.props;
    return (
      <CheckBox
        context={context}
        checked={node.state && node.state.checked}
        indeterminate={node.state && node.state.indeterminate}
        onChange={this.handleChange}
        disabled={node.isCheckable === undefined ? false : !node.isCheckable}
        style={
          node.state && node.state.indeterminate
            ? {
                display: 'flex',
                color: context.theme.boaPalette.base400,
                width: '24px',
                marginRight: !context.localization.isRightToLeft && 12,
                marginLeft: context.localization.isRightToLeft && 12,
                marginTop: '0px',
                height: rowHeight,
                lineHeight: `${this.props.rowHeight}px`,
              }
            : {
                display: 'flex',
                width: '24px',
                marginRight: !context.localization.isRightToLeft && 12,
                marginLeft: context.localization.isRightToLeft && 12,
                marginTop: '0px',
                height: rowHeight,
                lineHeight: `${this.props.rowHeight}px`,
              }
        }
      />
    );
  }
}

export default TreeCheckBox;

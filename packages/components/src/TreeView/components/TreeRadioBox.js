import React from 'react';
import RadioButtonChecked from '@material-ui/icons/RadioButtonChecked';
import RadioButtonUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import { ComponentBase, ComponentComposer } from '@kuveytturk/boa-base';
import { CheckBox } from '@kuveytturk/boa-components/CheckBox';
import { getNodeRenderOptions, updateNode } from '../selectors/nodes';

@ComponentComposer
class TreeRadioBox extends ComponentBase {
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
    return (
      <CheckBox
        checkedIcon={<RadioButtonChecked />}
        icon={<RadioButtonUnchecked />}
        context={this.props.context}
        checked={this.props.node.state && this.props.node.state.checked}
        indeterminate={false}
        disabled={this.props.node.isCheckable === undefined ? false : !this.props.node.isCheckable}
        onChange={this.handleChange}
        style={{
          width: '24px',
          marginRight: !this.props.context.localization.isRightToLeft && 12,
          marginLeft: this.props.context.localization.isRightToLeft && 12,
          marginTop: '0px',
          height: this.props.rowHeight,
        }}
      />
    );
  }
}
export default TreeRadioBox;

import React from 'react';
import { assert } from 'chai';
import { context, createShallow, getTestRunner } from '@kuveytturk/boa-test/utils';
import TreeCheckBox from './TreeCheckBox';
import * as NodeHelper from '../selectors/nodes';
import { spy } from 'sinon';
import { CheckBox } from '@kuveytturk/boa-components/CheckBox';

describe('TreeView:TreeCheckBox', () => {
  let shallow;

  before(() => {
    shallow = createShallow({ dive: true });
  });

  it('should render CheckBox', () => {
    const wrapper = shallow(
      <TreeCheckBox
        node={{
          state: {
            expanded: true,
          },
        }}
        context={context}
        rowHeight={10}
      />,
    );
    assert.strictEqual(wrapper.type(), CheckBox);
    assert.strictEqual(wrapper.props().style.height, 10);
    assert.strictEqual(wrapper.props().style.lineHeight, '10px');
    assert.strictEqual(wrapper.props().style.marginRight, 12);
    assert.strictEqual(wrapper.props().disabled, false);
  });

  it('should render CheckBox indeterminate', () => {
    const wrapper = shallow(
      <TreeCheckBox
        node={{
          state: {
            indeterminate: true,
          },
        }}
        context={context}
        rowHeight={10}
      />,
    );
    assert.strictEqual(wrapper.type(), CheckBox);
    assert.strictEqual(wrapper.props().style.height, 10);
    assert.strictEqual(wrapper.props().style.lineHeight, '10px');
    assert.strictEqual(wrapper.props().style.marginRight, 12);
    assert.strictEqual(wrapper.props().style.color, context.theme.boaPalette.base400);
  });

  it('should render CheckBox indeterminate RTL', () => {
    const newContext = Object.assign({}, context);
    newContext.localization = { isRightToLeft: true };
    const wrapper = shallow(
      <TreeCheckBox
        node={{
          state: {
            indeterminate: true,
          },
        }}
        context={newContext}
        rowHeight={10}
      />,
    );
    assert.strictEqual(wrapper.type(), CheckBox);
    assert.strictEqual(wrapper.props().style.height, 10);
    assert.strictEqual(wrapper.props().style.lineHeight, '10px');
    assert.strictEqual(wrapper.props().style.marginLeft, 12);
    assert.strictEqual(wrapper.props().style.color, context.theme.boaPalette.base400);
  });

  it('should render CheckBox RTL', () => {
    const newContext = Object.assign({}, context);
    newContext.localization = { isRightToLeft: true };
    const wrapper = shallow(
      <TreeCheckBox
        node={{
          state: {
            expanded: true,
          },
        }}
        context={newContext}
        rowHeight={10}
      />,
    );
    assert.strictEqual(wrapper.type(), CheckBox);
    assert.strictEqual(wrapper.props().style.height, 10);
    assert.strictEqual(wrapper.props().style.lineHeight, '10px');
    assert.strictEqual(wrapper.props().style.marginLeft, 12);
  });

  it('should render disabled CheckBox', () => {
    const newContext = Object.assign({}, context);
    newContext.localization = { isRightToLeft: true };
    const wrapper = shallow(
      <TreeCheckBox
        node={{
          isCheckable: false,
          state: {
            expanded: true,
          },
        }}
        context={newContext}
        rowHeight={10}
      />,
    );
    assert.strictEqual(wrapper.type(), CheckBox);
    assert.strictEqual(wrapper.props().disabled, true);
  });

  it('should handle click', () => {
    const wrapper = shallow(
      <TreeCheckBox
        node={{
          state: {
            expanded: true,
          },
          children: ['test-data'],
        }}
        context={context}
        rowHeight={10}
      />,
    );
    if (getTestRunner() !== 'karma') {
      const updateSpy = spy(NodeHelper, 'updateNode');
      wrapper.simulate('change', { target: { checked: false } });
      updateSpy.restore();
      assert.strictEqual(updateSpy.callCount, 1);
      assert.strictEqual(updateSpy.args[0][1].checked, true);
    }
  });

  it('should fire onClick', () => {
    const onCheckNode = spy();
    const onChange = spy();
    const wrapper = shallow(
      <TreeCheckBox
        onCheckNode={onCheckNode}
        onChange={onChange}
        node={{
          state: {
            expanded: true,
          },
          children: ['test-data'],
        }}
        context={context}
        rowHeight={10}
      />,
    );
    if (getTestRunner() !== 'karma') {
      const updateSpy = spy(NodeHelper, 'updateNode');
      wrapper.simulate('change', { target: { checked: false } });
      updateSpy.restore();
      assert.strictEqual(onChange.callCount, 1);
      assert.strictEqual(onCheckNode.callCount, 1);
    }
  });
});

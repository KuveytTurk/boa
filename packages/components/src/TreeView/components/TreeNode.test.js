import React from 'react';
import { assert } from 'chai';
import { context, createShallow, createMount } from '@kuveytturk/boa-test/utils';
import TreeNode from './TreeNode';
import { spy } from 'sinon';

describe('TreeView:TreeNode', () => {
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render child', () => {
    const wrapper = shallow(
      <TreeNode context={context} rowHeight={10}>
        <div>test</div>
      </TreeNode>,
    );
    assert.strictEqual(wrapper.type(), 'div');
    assert.strictEqual(wrapper.childAt(0).type(), 'div');
    assert.strictEqual(wrapper.childAt(0).text(), 'test');
    assert.strictEqual(wrapper.props().style.lineHeight, '10px');
    assert.strictEqual(wrapper.props().style.marginRight, 12);
    assert.strictEqual(wrapper.props().style.background, 'transparent');
  });

  it('should render selected', () => {
    const wrapper = shallow(
      <TreeNode selected context={context} rowHeight={10}>
        <div>test</div>
      </TreeNode>,
    );
    assert.strictEqual(wrapper.type(), 'div');
    assert.strictEqual(wrapper.childAt(0).type(), 'div');
    assert.strictEqual(wrapper.childAt(0).text(), 'test');
    assert.strictEqual(wrapper.props().style.lineHeight, '10px');
    assert.strictEqual(wrapper.props().style.marginRight, 12);
    assert.strictEqual(wrapper.props().style.background, 'RGBA(0, 0, 0, 0.14)');
  });

  it('should render hovered', () => {
    const wrapper = mount(
      <TreeNode context={context} rowHeight={10}>
        <div>test</div>
      </TreeNode>,
    );
    wrapper.setState({ hovered: true });
    const props = wrapper
      .find('div')
      .first()
      .props();
    assert.strictEqual(props.style.background, 'RGBA(0, 0, 0, 0.08)');
  });

  it('should handle mouseEnter, mouseLeave', () => {
    const wrapper = mount(
      <TreeNode context={context} rowHeight={10}>
        <div>test</div>
      </TreeNode>,
    );
    wrapper.simulate('mouseEnter');
    assert.strictEqual(wrapper.state().hovered, true);
    wrapper.simulate('mouseLeave');
    assert.strictEqual(wrapper.state().hovered, false);
  });

  it('should handle click', () => {
    const onSelected = spy();
    const wrapper = shallow(
      <TreeNode onSelected={onSelected} context={context} rowHeight={10}>
        <div>test</div>
      </TreeNode>,
    );
    wrapper.simulate('click');
    assert.strictEqual(onSelected.callCount, 1);
  });

  it('should render child RTL', () => {
    const newContext = Object.assign({}, context);
    newContext.localization = { isRightToLeft: true };

    const wrapper = shallow(
      <TreeNode context={newContext} rowHeight={10}>
        <div>test</div>
      </TreeNode>,
    );
    assert.strictEqual(wrapper.type(), 'div');
    assert.strictEqual(wrapper.childAt(0).type(), 'div');
    assert.strictEqual(wrapper.childAt(0).text(), 'test');
    assert.strictEqual(wrapper.props().style.lineHeight, '10px');
    assert.strictEqual(wrapper.props().style.marginLeft, 12);
    assert.strictEqual(wrapper.props().style.background, 'transparent');
  });
});

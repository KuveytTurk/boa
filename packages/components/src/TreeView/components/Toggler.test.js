import React from 'react';
import { assert } from 'chai';
import { context, createShallow, getTestRunner } from '@kuveytturk/boa-test/utils';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';
import sampleData from '../data/sampleData';
import Toggler from './Toggler';
import * as NodeHelper from '../selectors/nodes';
import { spy } from 'sinon';

describe('TreeView:Toggler', () => {
  let shallow;

  before(() => {
    shallow = createShallow({ dive: true });
  });

  it('should render empty', () => {
    const wrapper = shallow(<Toggler context={context} rowHeight={10} />);
    assert.strictEqual(wrapper.type(), 'a');
    assert.strictEqual(wrapper.props().style.height, 10);
    assert.strictEqual(wrapper.props().style.lineHeight, '10px');
    assert.strictEqual(wrapper.props().style.marginRight, 12);
    assert.strictEqual(wrapper.childAt(0).isEmptyRender(), true);
  });

  it('should render empty when no child', () => {
    const wrapper = shallow(
      <Toggler
        node={{
          state: {
            expanded: true,
          },
        }}
        context={context}
        rowHeight={10}
      />,
    );
    assert.strictEqual(wrapper.type(), 'a');
    assert.strictEqual(wrapper.props().style.height, 10);
    assert.strictEqual(wrapper.props().style.lineHeight, '10px');
    assert.strictEqual(wrapper.props().style.marginRight, 12);
    assert.strictEqual(wrapper.childAt(0).isEmptyRender(), true);
  });

  it('should render expanded', () => {
    const wrapper = shallow(
      <Toggler
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
    assert.strictEqual(wrapper.type(), 'a');
    assert.strictEqual(wrapper.props().style.height, 10);
    assert.strictEqual(wrapper.props().style.lineHeight, '10px');
    assert.strictEqual(wrapper.props().style.marginRight, 12);
    assert.strictEqual(wrapper.childAt(0).type(), Remove);
  });

  it('should render collapsed', () => {
    const wrapper = shallow(
      <Toggler
        node={{
          state: {
            expanded: false,
          },
          children: ['test-data'],
        }}
        context={context}
        rowHeight={10}
      />,
    );
    assert.strictEqual(wrapper.type(), 'a');
    assert.strictEqual(wrapper.props().style.height, 10);
    assert.strictEqual(wrapper.props().style.lineHeight, '10px');
    assert.strictEqual(wrapper.props().style.marginRight, 12);
    assert.strictEqual(wrapper.childAt(0).type(), Add);
  });

  it('should render empty when undefined', () => {
    const wrapper = shallow(
      <Toggler
        node={{
          state: {
            expanded: undefined,
          },
          children: ['test-data'],
        }}
        context={context}
        rowHeight={10}
      />,
    );
    assert.strictEqual(wrapper.type(), 'a');
    assert.strictEqual(wrapper.props().style.height, 10);
    assert.strictEqual(wrapper.props().style.lineHeight, '10px');
    assert.strictEqual(wrapper.props().style.marginRight, 12);
    assert.strictEqual(wrapper.childAt(0).isEmptyRender(), true);
  });

  it('should render RTL', () => {
    const newContext = Object.assign({}, context);
    newContext.localization = { isRightToLeft: true };
    const wrapper = shallow(<Toggler context={newContext} node={sampleData[0]} rowHeight={10} />);
    assert.strictEqual(wrapper.type(), 'a');
    assert.strictEqual(wrapper.props().style.height, 10);
    assert.strictEqual(wrapper.props().style.lineHeight, '10px');
    assert.strictEqual(wrapper.props().style.marginLeft, 12);
  });

  it('should handle click', () => {
    const wrapper = shallow(
      <Toggler
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
      wrapper.simulate('click');
      updateSpy.restore();
      assert.strictEqual(updateSpy.callCount, 1);
      assert.strictEqual(updateSpy.args[0][1].expanded, false);
    }
  });

  it('should fire onClick', () => {
    const onChange = spy();
    const wrapper = shallow(
      <Toggler
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
      wrapper.simulate('click');
      updateSpy.restore();
      assert.strictEqual(updateSpy.callCount, 1);
      assert.strictEqual(updateSpy.args[0][1].expanded, false);
      assert.strictEqual(onChange.callCount, 1);
      assert.strictEqual(onChange.args[0][0].node.state.expanded, false);
    }
  });
});

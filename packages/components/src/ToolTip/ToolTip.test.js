import React from 'react';
import { assert } from 'chai';
import MuiToolTip from '@material-ui/core/Tooltip';
import ToolTip from './ToolTip';
import { context, createShallow, createMount } from '@kuveytturk/boa-test/utils';

describe('<ToolTip />', () => {
  let mount;
  let shallow;

  before(() => {
    mount = createMount();
    shallow = createShallow({ untilSelector: 'ToolTip' });
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render MuiToolTip', () => {
    const wrapper = shallow(
      <ToolTip context={context} title="test">
        <div>test</div>
      </ToolTip>,
    );
    assert.strictEqual(wrapper.type(), MuiToolTip);
  });

  it('should render empty', () => {
    const wrapper = shallow(
      <ToolTip context={context}>
        <div>test</div>
      </ToolTip>,
    );
    assert.strictEqual(wrapper.type(), 'div');
  });

  it('should mount', () => {
    mount(
      <ToolTip context={context} title="test">
        <div>test</div>
      </ToolTip>,
    );
  });

  it('should get value', () => {
    const wrapper = shallow(
      <ToolTip context={context} title="test">
        <div>test</div>
      </ToolTip>,
    );
    assert.strictEqual(
      wrapper
        .instance()
        .getInstance()
        .getValue(),
      'test',
    );
  });

  it('should set value', () => {
    const wrapper = shallow(
      <ToolTip context={context} title="test">
        <div>test</div>
      </ToolTip>,
    );
    wrapper
      .instance()
      .getInstance()
      .setValue('test-2');
    assert.strictEqual(
      wrapper
        .instance()
        .getInstance()
        .getValue(),
      'test-2',
    );
  });

  it('should change tooltip', () => {
    const wrapper = shallow(
      <ToolTip context={context} title="test">
        <div>test</div>
      </ToolTip>,
    );
    wrapper.setProps({ tooltip: 'test-2' });
    assert.strictEqual(
      wrapper
        .instance()
        .getInstance()
        .getValue(),
      'test-2',
    );
  });

  it('should change title', () => {
    const wrapper = shallow(
      <ToolTip context={context} title="test">
        <div>test</div>
      </ToolTip>,
    );
    wrapper.setProps({ title: 'test-2' });
    assert.strictEqual(
      wrapper
        .instance()
        .getInstance()
        .getValue(),
      'test-2',
    );
  });

  it('should set placement up', () => {
    const wrapper = shallow(
      <ToolTip context={context} title="test" tooltipPosition="up">
        <div>test</div>
      </ToolTip>,
    );
    assert.strictEqual(wrapper.state().placement, 'top');
  });

  it('should set placement down', () => {
    const wrapper = shallow(
      <ToolTip context={context} title="test" placement="down">
        <div>test</div>
      </ToolTip>,
    );
    assert.strictEqual(wrapper.state().placement, 'bottom');
  });

  it('should set placement top', () => {
    const wrapper = shallow(
      <ToolTip context={context} title="test" placement="top">
        <div>test</div>
      </ToolTip>,
    );
    assert.strictEqual(wrapper.state().placement, 'top');
  });
});

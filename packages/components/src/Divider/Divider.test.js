import React from 'react';
import { assert } from 'chai';
import MuiDivider from '@material-ui/core/Divider';
import Divider from './Divider';
import { createShallow, createMount } from '@kuveytturk/boa-test/utils';

describe('<Divider />', () => {
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render a MuiDivider', () => {
    const wrapper = shallow(<Divider />);
    assert.strictEqual(wrapper.type(), MuiDivider);
  });

  it('should assign default style', () => {
    const wrapper = shallow(<Divider />);
    assert.strictEqual(wrapper.props().style.margin, 12);
  });

  it('should override style', () => {
    const wrapper = shallow(<Divider style={{ padding: 10, margin: 5, width: 50 }} />);
    assert.strictEqual(wrapper.props().style.width, 50);
    assert.strictEqual(wrapper.props().style.margin, 5);
    assert.strictEqual(wrapper.props().style.padding, 10);
  });

  it('should mount', () => {
    mount(<Divider />);
  });
});

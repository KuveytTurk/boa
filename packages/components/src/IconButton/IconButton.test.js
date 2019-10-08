import React from 'react';
import { assert } from 'chai';
import IconButton from './IconButton';
import { ToolTip } from '../ToolTip';
import ButtonBase from '@material-ui/core/ButtonBase';
import { context, createShallow, createMount } from '@kuveytturk/boa-test/utils';

describe('<IconButton />', () => {
  let mount;
  let shallow;

  before(() => {
    mount = createMount({ includeBOAcontext: false });
    shallow = createShallow({ includeBOAcontext: false });
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render ButtonBase', () => {
    const wrapper = shallow(<IconButton context={context} />).dive();
    assert.strictEqual(wrapper.dive().type(), ButtonBase);
  });

  it('should render Tooltip', () => {
    const wrapper = shallow(<IconButton context={context} tooltip="tooltip" />).dive();
    assert.strictEqual(wrapper.dive().type(), ToolTip);
    assert.strictEqual(
      wrapper
        .dive()
        .childAt(0)
        .type(),
      ButtonBase,
    );
  });

  it('should mount', () => {
    mount(<IconButton context={context} />);
  });

  it('should disable', () => {
    const wrapper = mount(<IconButton context={context} disabled />);
    const mui = wrapper.find(ButtonBase);
    assert.strictEqual(mui.props().disabled, true);
  });
});

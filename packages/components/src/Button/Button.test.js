import React from 'react';
import { assert, expect } from 'chai';
import { spy } from 'sinon';
import { Home } from '@material-ui/icons';
import MuiButton from '@material-ui/core/Button';
import { IconButton } from '../IconButton';
import { Button } from '.';
import { createShallow, createMount } from '@kuveytturk/boa-test/utils';

describe('<Button />', () => {
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow({ untilSelector: 'Button' });
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render a MuiButton', () => {
    const wrapper = shallow(<Button />);
    assert.strictEqual(wrapper.type(), MuiButton);
  });

  it('should render a Contained Button by default', () => {
    const wrapper = shallow(<Button />);
    assert.strictEqual(wrapper.dive().props().variant, 'contained');
  });

  it('should render a IconButton when type is icon', () => {
    const wrapper = shallow(<Button type="icon" />);
    assert.strictEqual(wrapper.type(), IconButton);
  });

  it('should render a SVG Icon when have a dynamicIcon prop', () => {
    const wrapper = shallow(<Button dynamicIcon="Home" />);
    assert.strictEqual(
      wrapper
        .dive()
        .childAt(0)
        .type(),
      Home,
    );
  });

  it('should change icon style', () => {
    const wrapper = shallow(
      <Button dynamicIcon="Home" iconProperties={{ style: { marginLeft: 8 } }} />,
    );

    assert.strictEqual(
      wrapper
        .dive()
        .childAt(0)
        .props().style.marginLeft,
      8,
    );
  });

  it('should change disabled prop', () => {
    const wrapper = shallow(<Button />);
    wrapper.setProps({ disabled: true });
    assert.strictEqual(wrapper.state().disabled, true);
    assert.strictEqual(wrapper.dive().props().disabled, true);
  });

  it('should mount', () => {
    mount(<Button />);
  });

  it('should handle click event', () => {
    const onButtonClick = spy();
    const wrapper = shallow(<Button onClick={onButtonClick} />);
    wrapper.simulate('click');
    expect(onButtonClick).to.have.property('callCount', 1);
  });

  describe('prop: allowLabelCase', () => {
    it('should label be "UpperCase" format when allowLabelCase is false', () => {
      const wrapper = shallow(<Button text="aaa" allowLabelCase={false} />);
      assert.strictEqual(
        wrapper
          .instance()
          .getInstance()
          .getLabel(),
        'AAA',
      );
    });

    it('should label be empty when allowLabelCase=false and text is null', () => {
      const wrapper = shallow(<Button text={null} allowLabelCase={false} />);
      assert.strictEqual(
        wrapper
          .instance()
          .getInstance()
          .getLabel(),
        '',
      );
    });
  });

  it('should assign textPosition', () => {
    const wrapper = shallow(<Button text="click" textPosition="right" />);
    assert.strictEqual(wrapper.dive().props().style.justifyContent, 'flex-end');
    wrapper.setProps({ textPosition: 'left' });
    assert.strictEqual(wrapper.dive().props().style.justifyContent, 'left');
  });

  it('should change disabled from outside', () => {
    const wrapper = shallow(<Button />);
    wrapper.instance().setDisable(true);
    assert.strictEqual(wrapper.state().disabled, true);
    assert.strictEqual(wrapper.dive().props().disabled, true);
  });
});

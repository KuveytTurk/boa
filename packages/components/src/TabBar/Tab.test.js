import React from 'react';
import { assert } from 'chai';
import { spy, stub } from 'sinon';
import ButtonBase from '@material-ui/core/ButtonBase';
import Tab from './Tab';
import { createMount, createShallow, getClasses } from '@kuveytturk/boa-test/utils';

describe('<Tab />', () => {
  let mount;
  let shallow;
  let classes;

  before(() => {
    mount = createMount();
    shallow = createShallow({ dive: true });
    classes = getClasses(<Tab textColor="inherit" />);
  });

  after(() => {
    mount.cleanUp();
  });

  it('should render with the root class', () => {
    const wrapper = shallow(<Tab textColor="inherit" />);
    assert.strictEqual(wrapper.type(), ButtonBase);
  });

  it('should simulate onChange', () => {
    const onChange = spy();
    const wrapper = shallow(<Tab onChange={onChange} textColor="inherit" />);
    wrapper.simulate('click');
    assert.strictEqual(onChange.callCount, 1);
  });

  it('should simulate onClick', () => {
    const onClick = spy();
    const wrapper = shallow(<Tab onClick={onClick} textColor="inherit" />);
    wrapper.simulate('click');
    assert.strictEqual(onClick.callCount, 1);
  });

  describe('prop: label', () => {
    it('should render label with the label class', () => {
      const wrapper = shallow(<Tab textColor="inherit" label="foo" />);
      const label = wrapper
        .childAt(0)
        .childAt(0)
        .childAt(0);
      assert.strictEqual(label.hasClass(classes.label), true);
    });

    it('should render with text wrapping', () => {
      const wrapper = shallow(<Tab textColor="inherit" label="foo" />);
      const instance = wrapper.instance();
      instance.label = { getClientRects: stub().returns({ length: 2 }) };
      instance.checkTextWrap();
      wrapper.update();
      assert.strictEqual(wrapper.state().wrappedText, true);
    });
  });
});

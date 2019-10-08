import React from 'react';
import { assert } from 'chai';
import { spy, stub } from 'sinon';
import Modal from '@material-ui/core/Modal';
import Popover from './Popover';
import { context, createMount, createShallow } from '@kuveytturk/boa-test/utils';

describe('<Popover />', () => {
  let mount;
  let shallow;

  before(() => {
    mount = createMount();
    shallow = createShallow({ untilSelector: 'Popover' });
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should change open status with instance method', () => {
    const wrapper = mount(<Popover context={context} />);
    wrapper
      .instance()
      .getInstance()
      .openPopover();
    assert.strictEqual(wrapper.state().open, true);
    wrapper
      .instance()
      .getInstance()
      .openPopover();
    assert.strictEqual(wrapper.state().open, false);
    wrapper
      .instance()
      .getInstance()
      .manualOpen();
    assert.strictEqual(wrapper.state().open, true);
    wrapper
      .instance()
      .getInstance()
      .manualClose();
    assert.strictEqual(wrapper.state().open, false);
  });

  it('should pass onClose prop to Modal', () => {
    const fn = () => {};
    const wrapper = shallow(
      <Popover open={false} onRequestClose={fn}>
        <div />
      </Popover>,
    );
    assert.strictEqual(wrapper.props().onClose, fn, 'should be the onClose function');
  });

  describe('onRequestClose', () => {
    it('should fire onRequestClose', () => {
      const onRequestClose = spy();
      const topModalStub = stub();
      topModalStub.returns(true);
      const wrapper = mount(
        <Popover
          open={false}
          onRequestClose={onRequestClose}
          manager={{ isTopModal: topModalStub }}
        >
          <div />
        </Popover>,
      );
      const modal = wrapper.find(Modal).childAt(0);
      const event = { key: 'Escape', stopPropagation: () => {} };

      modal.instance().handleKeyDown(event);
      assert.strictEqual(onRequestClose.callCount, 1);
    });

    it('should fire onRequestClose from instance', () => {
      const onRequestClose = spy();
      const wrapper = mount(
        <Popover open={false} onRequestClose={onRequestClose}>
          <div />
        </Popover>,
      );
      wrapper.instance().onRequestClose();
      assert.strictEqual(onRequestClose.callCount, 1);
    });

    it('should fire onRequestClose from instance clickAway', () => {
      const wrapper = mount(
        <Popover open>
          <div />
        </Popover>,
      );
      wrapper.instance().onRequestClose('clickAway');
      assert.strictEqual(wrapper.state().open, false);
    });

    it('should fire onRequestClose from Modal', () => {
      const onRequestClose = spy();
      const topModalStub = stub();
      topModalStub.returns(true);
      const wrapper = mount(
        <Popover
          open={false}
          onRequestClose={onRequestClose}
          manager={{ isTopModal: topModalStub }}
        >
          <div />
        </Popover>,
      );
      const modal = wrapper.find(Modal).childAt(0);
      const event = { key: 'Escape', stopPropagation: () => {} };
      modal.instance().handleKeyDown(event);
      assert.strictEqual(onRequestClose.callCount, 1);
    });
  });
});

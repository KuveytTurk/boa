import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { shallow, mount } from 'enzyme';
import EventListener from 'react-event-listener';
import ScrollbarSize from './ScrollbarSize';

describe('<ScrollbarSize />', () => {
  describe('prop: onLoad', () => {
    let wrapper;
    const onLoad = spy();

    afterEach(() => {
      wrapper.unmount();
    });

    it('should not call on initial load', () => {
      wrapper = mount(<ScrollbarSize />);
      assert.strictEqual(onLoad.callCount, 0, 'should not have been called');
    });

    it('should call on initial load', () => {
      wrapper = mount(<ScrollbarSize onLoad={onLoad} />);
      assert.strictEqual(onLoad.callCount, 1, 'should have been called once');
      assert.strictEqual(
        onLoad.calledWith({ scrollbarHeight: 0, scrollbarWidth: 0 }),
        true,
        'should have been called with expected sizes',
      );
    });
  });

  describe('prop: onChange', () => {
    const onChange = spy();
    const wrapper = shallow(<ScrollbarSize onChange={onChange} />);
    const instance = wrapper.instance();
    instance.node = {
      offsetHeight: 17,
      clientHeight: 0,
      offsetWidth: 17,
      clientWidth: 0,
    };

    beforeEach(done => {
      setTimeout(done, 200); // needed due to resize throttling
    });

    it('should call on first resize event', () => {
      wrapper.find(EventListener).simulate('resize');
      assert.strictEqual(onChange.callCount, 1, 'should have been called once');
      assert.strictEqual(
        onChange.calledWith({ scrollbarHeight: 17, scrollbarWidth: 17 }),
        true,
        'should have been called with expected sizes',
      );
    });

    it('should not call on second resize event', () => {
      wrapper.find(EventListener).simulate('resize');
      assert.strictEqual(onChange.callCount, 1, 'should only have been called once');
    });
  });
});

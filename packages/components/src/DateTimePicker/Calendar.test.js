import React from 'react';
import { spy, stub } from 'sinon';
import chai, { assert, expect } from 'chai';
import asserttype from 'chai-asserttype';
import EventListener from 'react-event-listener';
import Calendar from './Calendar';
import { context, createShallow } from '@kuveytturk/boa-test/utils';
import * as Utils from './dateUtils';

describe('<Calendar />', () => {
  let shallow;

  before(() => {
    shallow = createShallow();
    chai.use(asserttype);
  });

  it('should componentWillReceiveProps', () => {
    const wrapper = shallow(<Calendar context={context} style={{}} />);
    const date = new Date();
    date.setMonth(date.getMonth() + 1);
    wrapper.setProps({ dialogNewSelectDate: date, initialDate: date });
    assert.strictEqual(wrapper.state().selectedDate, date);
    assert.strictEqual(
      wrapper
        .instance()
        .getInstance()
        .getSelectedDate(),
      date,
    );
    wrapper.setProps({ initialDate: null });
    expect(wrapper.state().selectedDate).to.be.date();
  });

  describe('should handle key events', () => {
    let wrapper;
    let eventListener;
    const dateUpdate = spy();

    before(() => {
      wrapper = shallow(<Calendar dateUpdate={dateUpdate} open context={context} style={{}} />);
      eventListener = wrapper.find(EventListener);
    });

    beforeEach(() => {
      dateUpdate.resetHistory();
    });

    it('should decrease year with up + alt + shift', () => {
      const oldDate = wrapper.state().selectedDate;
      const newDate = new Date(oldDate.getTime());
      newDate.setFullYear(oldDate.getFullYear() - 1);

      eventListener.simulate('keyDown', {
        keyCode: 38,
        key: 'up',
        altKey: true,
        shiftKey: true,
      });

      expect(dateUpdate).to.have.property('callCount', 1);
      assert.strictEqual(dateUpdate.args[0][0].getTime(), oldDate.getTime());
      assert.strictEqual(dateUpdate.args[0][1].getTime(), newDate.getTime());
    });

    it('should decrease month with up + shift', () => {
      const oldDate = wrapper.state().selectedDate;
      const newDate = new Date(oldDate.getTime());
      newDate.setMonth(oldDate.getMonth() - 1);

      eventListener.simulate('keyDown', {
        keyCode: 38,
        key: 'up',
        shiftKey: true,
      });

      expect(dateUpdate).to.have.property('callCount', 1);
      assert.strictEqual(dateUpdate.args[0][0].getTime(), oldDate.getTime());
      assert.strictEqual(dateUpdate.args[0][1].getTime(), newDate.getTime());
    });

    it('should decrease days with up + alt', () => {
      const oldDate = wrapper.state().selectedDate;
      const newDate = new Date(oldDate.getTime());
      newDate.setDate(oldDate.getDate() - 7);

      eventListener.simulate('keyDown', {
        keyCode: 38,
        key: 'up',
        altKey: true,
      });

      expect(dateUpdate).to.have.property('callCount', 1);
      assert.strictEqual(dateUpdate.args[0][0].getTime(), oldDate.getTime());
      assert.strictEqual(dateUpdate.args[0][1].getTime(), newDate.getTime());
    });

    it('should increase year with down + alt + shift', () => {
      const oldDate = wrapper.state().selectedDate;
      const newDate = new Date(oldDate.getTime());
      newDate.setFullYear(oldDate.getFullYear() + 1);

      eventListener.simulate('keyDown', {
        keyCode: 40,
        key: 'down',
        altKey: true,
        shiftKey: true,
      });
      expect(dateUpdate).to.have.property('callCount', 1);
      assert.strictEqual(dateUpdate.args[0][0].getTime(), oldDate.getTime());
      assert.strictEqual(dateUpdate.args[0][1].getTime(), newDate.getTime());
    });

    it('should increase month with down + shift', () => {
      const oldDate = wrapper.state().selectedDate;
      const newDate = new Date(oldDate.getTime());
      newDate.setMonth(oldDate.getMonth() + 1);

      eventListener.simulate('keyDown', {
        keyCode: 40,
        key: 'down',
        shiftKey: true,
      });

      expect(dateUpdate).to.have.property('callCount', 1);
      assert.strictEqual(dateUpdate.args[0][0].getTime(), oldDate.getTime());
      assert.strictEqual(dateUpdate.args[0][1].getTime(), newDate.getTime());
    });

    it('should increase days with down + alt', () => {
      const oldDate = wrapper.state().selectedDate;
      const newDate = new Date(oldDate.getTime());
      newDate.setDate(oldDate.getDate() + 7);

      eventListener.simulate('keyDown', {
        keyCode: 40,
        key: 'down',
        altKey: true,
      });

      expect(dateUpdate).to.have.property('callCount', 1);
      assert.strictEqual(dateUpdate.args[0][0].getTime(), oldDate.getTime());
      assert.strictEqual(dateUpdate.args[0][1].getTime(), newDate.getTime());
    });

    it('should decrease year with left + alt + shift', () => {
      const oldDate = wrapper.state().selectedDate;
      const newDate = new Date(oldDate.getTime());
      newDate.setFullYear(oldDate.getFullYear() - 1);

      eventListener.simulate('keyDown', {
        keyCode: 37,
        key: 'left',
        altKey: true,
        shiftKey: true,
      });

      expect(dateUpdate).to.have.property('callCount', 1);
      assert.strictEqual(dateUpdate.args[0][0].getTime(), oldDate.getTime());
      assert.strictEqual(dateUpdate.args[0][1].getTime(), newDate.getTime());
    });

    it('should decrease month with left + shift', () => {
      const oldDate = wrapper.state().selectedDate;
      const newDate = new Date(oldDate.getTime());
      newDate.setMonth(oldDate.getMonth() - 1);

      eventListener.simulate('keyDown', {
        keyCode: 37,
        key: 'left',
        shiftKey: true,
      });

      expect(dateUpdate).to.have.property('callCount', 1);
      assert.strictEqual(dateUpdate.args[0][0].getTime(), oldDate.getTime());
      assert.strictEqual(dateUpdate.args[0][1].getTime(), newDate.getTime());
    });

    it('should decrease days with left + alt', () => {
      const oldDate = wrapper.state().selectedDate;
      const newDate = new Date(oldDate.getTime());
      newDate.setDate(oldDate.getDate() - 1);

      eventListener.simulate('keyDown', {
        keyCode: 37,
        key: 'left',
        altKey: true,
      });

      expect(dateUpdate).to.have.property('callCount', 1);
      assert.strictEqual(dateUpdate.args[0][0].getTime(), oldDate.getTime());
      assert.strictEqual(dateUpdate.args[0][1].getTime(), newDate.getTime());
    });

    it('should increase year with right + alt + shift', () => {
      const oldDate = wrapper.state().selectedDate;
      const newDate = new Date(oldDate.getTime());
      newDate.setFullYear(oldDate.getFullYear() + 1);

      eventListener.simulate('keyDown', {
        keyCode: 39,
        key: 'right',
        altKey: true,
        shiftKey: true,
      });
      expect(dateUpdate).to.have.property('callCount', 1);
      assert.strictEqual(dateUpdate.args[0][0].getTime(), oldDate.getTime());
      assert.strictEqual(dateUpdate.args[0][1].getTime(), newDate.getTime());
    });

    it('should increase month with right + shift', () => {
      const oldDate = wrapper.state().selectedDate;
      const newDate = new Date(oldDate.getTime());
      newDate.setMonth(oldDate.getMonth() + 1);

      eventListener.simulate('keyDown', {
        keyCode: 39,
        key: 'right',
        shiftKey: true,
      });

      expect(dateUpdate).to.have.property('callCount', 1);
      assert.strictEqual(dateUpdate.args[0][0].getTime(), oldDate.getTime());
      assert.strictEqual(dateUpdate.args[0][1].getTime(), newDate.getTime());
    });

    it('should increase days with right + alt', () => {
      const oldDate = wrapper.state().selectedDate;
      const newDate = new Date(oldDate.getTime());
      newDate.setDate(oldDate.getDate() + 1);

      eventListener.simulate('keyDown', {
        keyCode: 39,
        key: 'right',
        altKey: true,
      });

      expect(dateUpdate).to.have.property('callCount', 1);
      assert.strictEqual(dateUpdate.args[0][0].getTime(), oldDate.getTime());
      assert.strictEqual(dateUpdate.args[0][1].getTime(), newDate.getTime());
    });
  });

  it('should setDisplayDate with date and newSelectedDate', () => {
    const wrapper = shallow(<Calendar context={context} style={{}} />);
    const displayDate = new Date('2018-05-19');
    const getFirstDatOfMount = stub(Utils, 'getFirstDayOfMonth').returns(new Date('2018-05-01'));
    const firsDayOfMountOfDisplayDate = new Date('2018-05-01');
    const selectedDate = new Date('2018-11-29');

    wrapper
      .instance()
      .getInstance()
      .setDisplayDate(displayDate, selectedDate);

    getFirstDatOfMount.restore();
    assert.strictEqual(
      firsDayOfMountOfDisplayDate.getDate(),
      wrapper.state().displayDate.getDate(),
      'display date is not equal.',
    );
    assert.strictEqual(
      selectedDate.getDate(),
      wrapper.state().selectedDate.getDate(),
      'selected date is not equal.',
    );
  });
});

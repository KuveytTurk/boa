import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import MuiIconButton from '@material-ui/core/IconButton/IconButton';
import MuiChevronLeft from '@material-ui/icons/ChevronLeft';
import MuiChevronRight from '@material-ui/icons/ChevronRight';
import CalendarToolbar from './CalendarToolbar';
import { dateTimeFormat } from './dateUtils';
import { context, createShallow } from '@kuveytturk/boa-test/utils';

describe('<CalendarToolbar />', () => {
  let shallow;

  before(() => {
    shallow = createShallow();
  });

  it('should render a div', () => {
    const date = new Date();
    const displayDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const wrapper = shallow(<CalendarToolbar context={context} displayDate={displayDate} />);
    assert.strictEqual(wrapper.type(), 'div');
  });

  it('should render icon buttons', () => {
    const date = new Date();
    const displayDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const wrapper = shallow(<CalendarToolbar context={context} displayDate={displayDate} />);
    assert.strictEqual(wrapper.find(MuiIconButton).length, 2);
    assert.strictEqual(
      wrapper
        .childAt(0)
        .childAt(0)
        .type(),
      MuiChevronLeft,
    );
    assert.strictEqual(
      wrapper
        .childAt(2)
        .childAt(0)
        .type(),
      MuiChevronRight,
    );
  });

  describe('prop:dateTimeFormat', () => {
    it('should format date with default formatter', () => {
      const date = new Date();
      const DefaultFormatter = dateTimeFormat;
      const displayDate = new Date(date.getFullYear(), date.getMonth(), 1);
      const formattedDate = new DefaultFormatter({ item: 'monthYearName' }).format(displayDate);
      const wrapper = shallow(<CalendarToolbar context={context} displayDate={displayDate} />);
      assert.strictEqual(wrapper.childAt(1).type(), 'div');
      assert.strictEqual(wrapper.childAt(1).text(), formattedDate);
    });

    it('should format date', () => {
      const date = new Date();
      function customFormatter() {
        this.format = () => 'test';
      }
      const displayDate = new Date(date.getFullYear(), date.getMonth(), 1);

      const wrapper = shallow(
        <CalendarToolbar
          context={context}
          displayDate={displayDate}
          dateTimeFormat={customFormatter}
        />,
      );
      assert.strictEqual(wrapper.childAt(1).text(), 'test');
    });
  });

  describe('prop:noDialog', () => {
    it('should cursor be pointer', () => {
      const date = new Date();
      const displayDate = new Date(date.getFullYear(), date.getMonth(), 1);
      const wrapper = shallow(
        <CalendarToolbar noDialog={false} context={context} displayDate={displayDate} />,
      );
      assert.strictEqual(wrapper.childAt(1).props().style.cursor, 'pointer');
    });

    it('should cursor not be a pointer', () => {
      const date = new Date();
      const displayDate = new Date(date.getFullYear(), date.getMonth(), 1);
      const wrapper = shallow(
        <CalendarToolbar noDialog context={context} displayDate={displayDate} />,
      );
      assert.strictEqual(wrapper.childAt(1).props().style.cursor, undefined);
    });
  });

  it('should change direction to left', () => {
    const date = new Date();
    const displayDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const newDisplayDate = new Date(date.getFullYear(), date.getMonth(), 2);
    const wrapper = shallow(<CalendarToolbar context={context} displayDate={displayDate} />);
    wrapper.setProps({ displayDate: newDisplayDate });
    assert.strictEqual(wrapper.state().transitionDirection, 'left');
  });

  it('should change direction to right', () => {
    const date = new Date();
    const displayDate = new Date(date.getFullYear(), date.getMonth(), 2);
    const newDisplayDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const wrapper = shallow(<CalendarToolbar context={context} displayDate={displayDate} />);
    wrapper.setProps({ displayDate: newDisplayDate });
    assert.strictEqual(wrapper.state().transitionDirection, 'right');
  });

  describe('simulate events', () => {
    let wrapper;
    const onMonthChange = spy();
    const handleClickToolBar = spy();

    before(() => {
      const date = new Date();
      const displayDate = new Date(date.getFullYear(), date.getMonth(), 2);
      wrapper = shallow(
        <CalendarToolbar
          context={context}
          displayDate={displayDate}
          onMonthChange={onMonthChange}
          handleClickToolBar={handleClickToolBar}
        />,
      );
    });

    beforeEach(() => {
      onMonthChange.resetHistory();
      handleClickToolBar.resetHistory();
    });

    it('should handle prev month clicked', () => {
      const prevButton = wrapper.childAt(0);
      prevButton.simulate('click');
      assert.strictEqual(onMonthChange.callCount, 1);
      assert.strictEqual(onMonthChange.args[0][0], -1);
    });

    it('should handle toolbar clicked', () => {
      const toolbar = wrapper.childAt(1);
      toolbar.simulate('click');
      assert.strictEqual(handleClickToolBar.callCount, 1);
    });

    it('should handle next month clicked', () => {
      const nextButton = wrapper.childAt(2);
      nextButton.simulate('click');
      assert.strictEqual(onMonthChange.callCount, 1);
      assert.strictEqual(onMonthChange.args[0][0], 1);
    });
  });

  it('should handle RTL', () => {
    const newContext = Object.assign({}, context, {
      languageId: 5,
      localization: {
        isRightToLeft: true,
      },
    });

    const date = new Date();
    const displayDate = new Date(date.getFullYear(), date.getMonth(), 2);

    const wrapper = shallow(<CalendarToolbar context={newContext} displayDate={displayDate} />);
    assert.strictEqual(wrapper.childAt(0).props().style.marginLeft, 0);
    assert.strictEqual(wrapper.childAt(0).props().style.marginRight, 2);
  });

  it('should disabled prevMonth', () => {
    const date = new Date();
    const displayDate = new Date(date.getFullYear(), date.getMonth(), 2);

    const wrapper = shallow(
      <CalendarToolbar prevMonth={false} context={context} displayDate={displayDate} />,
    );

    assert.strictEqual(wrapper.childAt(0).props().disabled, true);
  });

  it('should disabled nextMonth', () => {
    const date = new Date();
    const displayDate = new Date(date.getFullYear(), date.getMonth(), 2);

    const wrapper = shallow(
      <CalendarToolbar nextMonth={false} context={context} displayDate={displayDate} />,
    );

    assert.strictEqual(wrapper.childAt(2).props().disabled, true);
  });
});

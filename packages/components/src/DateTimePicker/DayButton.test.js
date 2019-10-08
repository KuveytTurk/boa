import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import ButtonBase from '@material-ui/core/ButtonBase';
import DayButton from './DayButton';
import { getDatePickerStyle, DayType } from './dateUtils';
import { context, createShallow, createMount } from '@kuveytturk/boa-test/utils';

describe('<DayButton />', () => {
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow();
    mount = createMount({ includeBOAcontext: false });
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render a empty span when date not specified', () => {
    const wrapper = shallow(<DayButton context={context} />);
    assert.strictEqual(wrapper.type(), 'span');
  });

  it('should render a ButtonBase', () => {
    const date = new Date();
    const displayDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const wrapper = shallow(<DayButton context={context} date={displayDate} />);
    assert.strictEqual(wrapper.type(), ButtonBase);
  });

  it('should render a span inside button', () => {
    const date = new Date();
    const displayDate = new Date(date.getFullYear(), date.getMonth(), 1);
    const wrapper = shallow(<DayButton context={context} date={displayDate} />);
    assert.strictEqual(wrapper.childAt(1).type(), 'span');
  });

  describe('prop:business', () => {
    const datePickerStyle = getDatePickerStyle(context);

    describe('WorkDay', () => {
      let dayType;

      before(() => {
        dayType = DayType.WorkDay;
      });
      it('should render WorkDay', () => {
        const date = new Date();
        const wrapper = shallow(
          <DayButton context={context} date={date} business dayInfo={{ dayType }} />,
        );
        const divStyle = wrapper.childAt(0).props().style;
        const spanStyle = wrapper.childAt(1).props().style;
        assert.strictEqual(divStyle.backgroundColor, datePickerStyle.todayButtonBackgroundColor);
        assert.strictEqual(divStyle.opacity, 1);
        assert.strictEqual(spanStyle.color, 'white');
      });
      it('should render WorkDay with nextMonth', () => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        const wrapper = shallow(
          <DayButton context={context} date={date} business dayInfo={{ dayType }} />,
        );
        const divStyle = wrapper.childAt(0).props().style;
        const spanStyle = wrapper.childAt(1).props().style;
        assert.strictEqual(divStyle.backgroundColor, context.theme.boaPalette.calWorkDay);
        assert.strictEqual(divStyle.opacity, 1);
        assert.strictEqual(spanStyle.color, context.theme.boaPalette.base500);
      });
      it('should render selected WorkDay with nextMonth', () => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        const displayDate = new Date();
        displayDate.setMonth(displayDate.getMonth() + 2);
        const wrapper = shallow(
          <DayButton
            context={context}
            date={date}
            displayDate={displayDate}
            business
            selected
            dayInfo={{ dayType }}
          />,
        );
        const divStyle = wrapper.childAt(0).props().style;
        const spanStyle = wrapper.childAt(1).props().style;
        assert.strictEqual(divStyle.backgroundColor, context.theme.boaPalette.calWorkDay);
        assert.strictEqual(divStyle.opacity, 1);
        assert.strictEqual(spanStyle.color, context.theme.boaPalette.base300);
      });
      it('should render selected WorkDay with nextMonth 2', () => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        const displayDate = new Date();
        displayDate.setMonth(displayDate.getMonth() + 1);
        const wrapper = shallow(
          <DayButton
            context={context}
            date={date}
            displayDate={displayDate}
            business
            selected
            dayInfo={{ dayType }}
          />,
        );
        const divStyle = wrapper.childAt(0).props().style;
        const spanStyle = wrapper.childAt(1).props().style;
        assert.strictEqual(divStyle.backgroundColor, context.theme.boaPalette.calWorkDay);
        assert.strictEqual(divStyle.opacity, 1);
        assert.strictEqual(spanStyle.color, context.theme.boaPalette.base500);
      });
      it('should render selected WorkDay with nextMonth 3', () => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        const displayDate = new Date();
        displayDate.setMonth(displayDate.getMonth() + 1);
        const wrapper = shallow(
          <DayButton
            context={context}
            date={date}
            displayDate={displayDate}
            business
            dayInfo={{ dayType }}
          />,
        );
        wrapper.instance().handleMouseEnter();
        const divStyle = wrapper.childAt(0).props().style;
        const spanStyle = wrapper.childAt(1).props().style;
        assert.strictEqual(divStyle.backgroundColor, context.theme.boaPalette.calWorkDay);
        assert.strictEqual(divStyle.opacity, 0.6);
        assert.strictEqual(spanStyle.color, context.theme.boaPalette.base500);
      });
    });

    describe('WeekendDay', () => {
      let dayType;

      before(() => {
        dayType = DayType.WeekendDay;
      });
      it('should render WorkDay', () => {
        const date = new Date();
        const wrapper = shallow(
          <DayButton context={context} date={date} business dayInfo={{ dayType }} />,
        );
        const divStyle = wrapper.childAt(0).props().style;
        const spanStyle = wrapper.childAt(1).props().style;
        assert.strictEqual(divStyle.backgroundColor, datePickerStyle.todayButtonBackgroundColor);
        assert.strictEqual(divStyle.opacity, 1);
        assert.strictEqual(spanStyle.color, 'white');
      });
      it('should render WorkDay with nextMonth', () => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        const wrapper = shallow(
          <DayButton context={context} date={date} business dayInfo={{ dayType }} />,
        );
        const divStyle = wrapper.childAt(0).props().style;
        const spanStyle = wrapper.childAt(1).props().style;
        assert.strictEqual(divStyle.backgroundColor, context.theme.boaPalette.calWeekend, 'A');
        assert.strictEqual(divStyle.opacity, 1, 'B');
        assert.strictEqual(spanStyle.color, context.theme.boaPalette.base300, 'C');
      });
      it('should render selected WorkDay with nextMonth', () => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        const displayDate = new Date();
        displayDate.setMonth(displayDate.getMonth() + 2);
        const wrapper = shallow(
          <DayButton
            context={context}
            date={date}
            displayDate={displayDate}
            business
            selected
            dayInfo={{ dayType }}
          />,
        );
        const divStyle = wrapper.childAt(0).props().style;
        const spanStyle = wrapper.childAt(1).props().style;
        assert.strictEqual(divStyle.backgroundColor, context.theme.boaPalette.calWeekend, 'A');
        assert.strictEqual(divStyle.opacity, 1, 'B');
        assert.strictEqual(spanStyle.color, context.theme.boaPalette.base300, 'C');
      });
      it('should render selected WorkDay with nextMonth 2', () => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        const displayDate = new Date();
        displayDate.setMonth(displayDate.getMonth() + 1);
        const wrapper = shallow(
          <DayButton
            context={context}
            date={date}
            displayDate={displayDate}
            business
            selected
            dayInfo={{ dayType }}
          />,
        );
        const divStyle = wrapper.childAt(0).props().style;
        const spanStyle = wrapper.childAt(1).props().style;
        assert.strictEqual(divStyle.backgroundColor, context.theme.boaPalette.calWeekend, 'A');
        assert.strictEqual(divStyle.opacity, 1, 'B');
        assert.strictEqual(spanStyle.color, context.theme.boaPalette.base300, 'C');
      });
      it('should render selected WorkDay with nextMonth 3', () => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        const displayDate = new Date();
        displayDate.setMonth(displayDate.getMonth() + 1);
        const wrapper = shallow(
          <DayButton
            context={context}
            date={date}
            displayDate={displayDate}
            business
            dayInfo={{ dayType }}
          />,
        );
        wrapper.instance().handleMouseEnter();
        const divStyle = wrapper.childAt(0).props().style;
        const spanStyle = wrapper.childAt(1).props().style;
        assert.strictEqual(divStyle.backgroundColor, context.theme.boaPalette.calWeekend, 'A');
        assert.strictEqual(divStyle.opacity, 0.6, 'B');
        assert.strictEqual(spanStyle.color, context.theme.boaPalette.base300, 'C');
      });
    });

    describe('Holiday', () => {
      let dayType;

      before(() => {
        dayType = DayType.Holiday;
      });
      it('should render WorkDay', () => {
        const date = new Date();
        const wrapper = shallow(
          <DayButton context={context} date={date} business dayInfo={{ dayType }} />,
        );
        const divStyle = wrapper.childAt(0).props().style;
        const spanStyle = wrapper.childAt(1).props().style;
        assert.strictEqual(divStyle.backgroundColor, datePickerStyle.todayButtonBackgroundColor);
        assert.strictEqual(divStyle.opacity, 1);
        assert.strictEqual(spanStyle.color, 'white');
      });
      it('should render WorkDay with nextMonth', () => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        const wrapper = shallow(
          <DayButton context={context} date={date} business dayInfo={{ dayType }} />,
        );
        const divStyle = wrapper.childAt(0).props().style;
        const spanStyle = wrapper.childAt(1).props().style;
        assert.strictEqual(divStyle.backgroundColor, context.theme.boaPalette.calHoliday, 'A');
        assert.strictEqual(divStyle.opacity, 1, 'B');
        assert.strictEqual(spanStyle.color, context.theme.boaPalette.base300, 'C');
      });
      it('should render selected WorkDay with nextMonth', () => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        const displayDate = new Date();
        displayDate.setMonth(displayDate.getMonth() + 2);
        const wrapper = shallow(
          <DayButton
            context={context}
            date={date}
            displayDate={displayDate}
            business
            selected
            dayInfo={{ dayType }}
          />,
        );
        const divStyle = wrapper.childAt(0).props().style;
        const spanStyle = wrapper.childAt(1).props().style;
        assert.strictEqual(divStyle.backgroundColor, context.theme.boaPalette.calHoliday, 'A');
        assert.strictEqual(divStyle.opacity, 1, 'B');
        assert.strictEqual(spanStyle.color, context.theme.boaPalette.base300, 'C');
      });
      it('should render selected WorkDay with nextMonth 2', () => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        const displayDate = new Date();
        displayDate.setMonth(displayDate.getMonth() + 1);
        const wrapper = shallow(
          <DayButton
            context={context}
            date={date}
            displayDate={displayDate}
            business
            selected
            dayInfo={{ dayType }}
          />,
        );
        const divStyle = wrapper.childAt(0).props().style;
        const spanStyle = wrapper.childAt(1).props().style;
        assert.strictEqual(divStyle.backgroundColor, context.theme.boaPalette.calHoliday, 'A');
        assert.strictEqual(divStyle.opacity, 1, 'B');
        assert.strictEqual(spanStyle.color, context.theme.boaPalette.base300, 'C');
      });
      it('should render selected WorkDay with nextMonth 3', () => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        const displayDate = new Date();
        displayDate.setMonth(displayDate.getMonth() + 1);
        const wrapper = shallow(
          <DayButton
            context={context}
            date={date}
            displayDate={displayDate}
            business
            dayInfo={{ dayType }}
          />,
        );
        wrapper.instance().handleMouseEnter();
        const divStyle = wrapper.childAt(0).props().style;
        const spanStyle = wrapper.childAt(1).props().style;
        assert.strictEqual(divStyle.backgroundColor, context.theme.boaPalette.calHoliday, 'A');
        assert.strictEqual(divStyle.opacity, 0.6, 'B');
        assert.strictEqual(spanStyle.color, context.theme.boaPalette.base300, 'C');
      });
    });

    describe('Eve', () => {
      let dayType;

      before(() => {
        dayType = DayType.Eve;
      });
      it('should render WorkDay', () => {
        const date = new Date();
        const wrapper = shallow(
          <DayButton context={context} date={date} business dayInfo={{ dayType }} />,
        );
        const divStyle = wrapper.childAt(0).props().style;
        const spanStyle = wrapper.childAt(1).props().style;
        assert.strictEqual(divStyle.backgroundColor, datePickerStyle.todayButtonBackgroundColor);
        assert.strictEqual(divStyle.opacity, 1);
        assert.strictEqual(spanStyle.color, 'white');
      });
      it('should render WorkDay with nextMonth', () => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        const wrapper = shallow(
          <DayButton context={context} date={date} business dayInfo={{ dayType }} />,
        );
        const divStyle = wrapper.childAt(0).props().style;
        const spanStyle = wrapper.childAt(1).props().style;
        assert.strictEqual(divStyle.backgroundColor, context.theme.boaPalette.calEve, 'A');
        assert.strictEqual(divStyle.opacity, 1, 'B');
        assert.strictEqual(spanStyle.color, context.theme.boaPalette.base300, 'C');
      });
      it('should render selected WorkDay with nextMonth', () => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        const displayDate = new Date();
        displayDate.setMonth(displayDate.getMonth() + 2);
        const wrapper = shallow(
          <DayButton
            context={context}
            date={date}
            displayDate={displayDate}
            business
            selected
            dayInfo={{ dayType }}
          />,
        );
        const divStyle = wrapper.childAt(0).props().style;
        const spanStyle = wrapper.childAt(1).props().style;
        assert.strictEqual(divStyle.backgroundColor, context.theme.boaPalette.calEve, 'A');
        assert.strictEqual(divStyle.opacity, 1, 'B');
        assert.strictEqual(spanStyle.color, context.theme.boaPalette.base300, 'C');
      });
      it('should render selected WorkDay with nextMonth 2', () => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        const displayDate = new Date();
        displayDate.setMonth(displayDate.getMonth() + 1);
        const wrapper = shallow(
          <DayButton
            context={context}
            date={date}
            displayDate={displayDate}
            business
            selected
            dayInfo={{ dayType }}
          />,
        );
        const divStyle = wrapper.childAt(0).props().style;
        const spanStyle = wrapper.childAt(1).props().style;
        assert.strictEqual(divStyle.backgroundColor, context.theme.boaPalette.calEve, 'A');
        assert.strictEqual(divStyle.opacity, 1, 'B');
        assert.strictEqual(spanStyle.color, context.theme.boaPalette.base300, 'C');
      });
      it('should render selected WorkDay with nextMonth 3', () => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        const displayDate = new Date();
        displayDate.setMonth(displayDate.getMonth() + 1);
        const wrapper = shallow(
          <DayButton
            context={context}
            date={date}
            displayDate={displayDate}
            business
            dayInfo={{ dayType }}
          />,
        );
        wrapper.instance().handleMouseEnter();
        const divStyle = wrapper.childAt(0).props().style;
        const spanStyle = wrapper.childAt(1).props().style;
        assert.strictEqual(divStyle.backgroundColor, context.theme.boaPalette.calEve, 'A');
        assert.strictEqual(divStyle.opacity, 0.6, 'B');
        assert.strictEqual(spanStyle.color, context.theme.boaPalette.base300, 'C');
      });
    });

    describe('ReliHoliday', () => {
      let dayType;

      before(() => {
        dayType = DayType.ReliHoliday;
      });
      it('should render WorkDay', () => {
        const date = new Date();
        const wrapper = shallow(
          <DayButton context={context} date={date} business dayInfo={{ dayType }} />,
        );
        const divStyle = wrapper.childAt(0).props().style;
        const spanStyle = wrapper.childAt(1).props().style;
        assert.strictEqual(divStyle.backgroundColor, datePickerStyle.todayButtonBackgroundColor);
        assert.strictEqual(divStyle.opacity, 1);
        assert.strictEqual(spanStyle.color, 'white');
      });
      it('should render WorkDay with nextMonth', () => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        const wrapper = shallow(
          <DayButton context={context} date={date} business dayInfo={{ dayType }} />,
        );
        const divStyle = wrapper.childAt(0).props().style;
        const spanStyle = wrapper.childAt(1).props().style;
        assert.strictEqual(divStyle.backgroundColor, context.theme.boaPalette.calReliHoliday, 'A');
        assert.strictEqual(divStyle.opacity, 1, 'B');
        assert.strictEqual(spanStyle.color, context.theme.boaPalette.base300, 'C');
      });
      it('should render selected WorkDay with nextMonth', () => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        const displayDate = new Date();
        displayDate.setMonth(displayDate.getMonth() + 2);
        const wrapper = shallow(
          <DayButton
            context={context}
            date={date}
            displayDate={displayDate}
            business
            selected
            dayInfo={{ dayType }}
          />,
        );
        const divStyle = wrapper.childAt(0).props().style;
        const spanStyle = wrapper.childAt(1).props().style;
        assert.strictEqual(divStyle.backgroundColor, context.theme.boaPalette.calReliHoliday, 'A');
        assert.strictEqual(divStyle.opacity, 1, 'B');
        assert.strictEqual(spanStyle.color, context.theme.boaPalette.base300, 'C');
      });
      it('should render selected WorkDay with nextMonth 2', () => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        const displayDate = new Date();
        displayDate.setMonth(displayDate.getMonth() + 1);
        const wrapper = shallow(
          <DayButton
            context={context}
            date={date}
            displayDate={displayDate}
            business
            selected
            dayInfo={{ dayType }}
          />,
        );
        const divStyle = wrapper.childAt(0).props().style;
        const spanStyle = wrapper.childAt(1).props().style;
        assert.strictEqual(divStyle.backgroundColor, context.theme.boaPalette.calReliHoliday, 'A');
        assert.strictEqual(divStyle.opacity, 1, 'B');
        assert.strictEqual(spanStyle.color, context.theme.boaPalette.base300, 'C');
      });
      it('should render selected WorkDay with nextMonth 3', () => {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        const displayDate = new Date();
        displayDate.setMonth(displayDate.getMonth() + 1);
        const wrapper = shallow(
          <DayButton
            context={context}
            date={date}
            displayDate={displayDate}
            business
            dayInfo={{ dayType }}
          />,
        );
        wrapper.instance().handleMouseEnter();
        const divStyle = wrapper.childAt(0).props().style;
        const spanStyle = wrapper.childAt(1).props().style;
        assert.strictEqual(divStyle.backgroundColor, context.theme.boaPalette.calReliHoliday, 'A');
        assert.strictEqual(divStyle.opacity, 0.6, 'B');
        assert.strictEqual(spanStyle.color, context.theme.boaPalette.base300, 'C');
      });
    });
  });

  describe('simulate events', () => {
    describe('onMouseEnter', () => {
      it('should change state to hovered', () => {
        const date = new Date();
        const displayDate = new Date(date.getFullYear(), date.getMonth(), 1);
        const wrapper = shallow(<DayButton context={context} date={displayDate} />);
        wrapper.simulate('mouseEnter');
        assert.strictEqual(wrapper.state().hover, true);
      });

      it('should not change state to hovered when disabled', () => {
        const date = new Date();
        const displayDate = new Date(date.getFullYear(), date.getMonth(), 1);
        const wrapper = shallow(<DayButton context={context} disabled date={displayDate} />);
        wrapper.simulate('mouseEnter');
        assert.strictEqual(wrapper.state().hover, false);
      });
    });

    describe('onMouseLeave', () => {
      it('should change state to not hovered', () => {
        const date = new Date();
        const displayDate = new Date(date.getFullYear(), date.getMonth(), 1);
        const wrapper = shallow(<DayButton context={context} date={displayDate} />);
        wrapper.setState({ hover: true });
        wrapper.simulate('mouseLeave');
        assert.strictEqual(wrapper.state().hover, false);
      });

      it('should not change state to not hovered when disabled', () => {
        const date = new Date();
        const displayDate = new Date(date.getFullYear(), date.getMonth(), 1);
        const wrapper = shallow(<DayButton context={context} disabled date={displayDate} />);
        wrapper.setState({ hover: true });
        wrapper.simulate('mouseLeave');
        assert.strictEqual(wrapper.state().hover, true);
      });
    });

    describe('onTouchTap', () => {
      it('should fire onTouchTap', () => {
        const date = new Date();
        const displayDate = new Date(date.getFullYear(), date.getMonth(), 1);
        const onTouchTap = spy();
        const wrapper = shallow(
          <DayButton context={context} onTouchTap={onTouchTap} date={displayDate} />,
        );
        wrapper.find(ButtonBase).simulate('click');
        assert.strictEqual(onTouchTap.callCount, 1);
      });

      it('should not fire onTouchTap when disabled', () => {
        const date = new Date();
        const displayDate = new Date(date.getFullYear(), date.getMonth(), 1);
        const onTouchTap = spy();
        const wrapper = shallow(
          <DayButton context={context} disabled onTouchTap={onTouchTap} date={displayDate} />,
        );
        wrapper.find(ButtonBase).simulate('click');
        assert.strictEqual(onTouchTap.callCount, 0);
      });
    });
  });
});

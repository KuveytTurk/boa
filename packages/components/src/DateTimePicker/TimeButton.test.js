import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import ButtonBase from '@material-ui/core/ButtonBase';
import TimeButton from './TimeButton';
import { context, createShallow, createMount } from '@kuveytturk/boa-test/utils';

describe('<TimeButton />', () => {
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow();
    mount = createMount({ includeBOAcontext: false });
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render a ButtonBase', () => {
    const wrapper = shallow(<TimeButton context={context}>test</TimeButton>);
    assert.strictEqual(wrapper.type(), ButtonBase);
  });

  describe('simulate events', () => {
    describe('onMouseEnter', () => {
      it('should change state to hovered', () => {
        const wrapper = shallow(<TimeButton context={context}>test</TimeButton>);
        wrapper.simulate('mouseEnter');
        assert.strictEqual(wrapper.state().hover, true);
      });
    });

    describe('onMouseLeave', () => {
      it('should change state to not hovered', () => {
        const wrapper = shallow(<TimeButton context={context}>test</TimeButton>);
        wrapper.setState({ hover: true });
        wrapper.simulate('mouseLeave');
        assert.strictEqual(wrapper.state().hover, false);
      });
    });

    describe('onTouchTap', () => {
      it('should fire onTouchTap', () => {
        const onTouchTap = spy();
        const wrapper = shallow(
          <TimeButton onTouchTap={onTouchTap} context={context}>
            test
          </TimeButton>,
        );
        wrapper.find(ButtonBase).simulate('click');
        assert.strictEqual(onTouchTap.callCount, 1);
      });
    });
  });

  describe('styles', () => {
    it('should change backgroundColor pri300 when selected & hovered', () => {
      const wrapper = mount(<TimeButton context={context}>test</TimeButton>);
      wrapper.setProps({ selected: true });
      wrapper.setState({ hover: true });
      const root = wrapper.childAt(0).props().style;
      assert.strictEqual(root.background, context.theme.boaPalette.pri300);
    });

    it('should change backgroundColor pri300 when hovered', () => {
      const wrapper = mount(<TimeButton context={context}>test</TimeButton>);
      wrapper.setState({ hover: true });
      const root = wrapper.childAt(0).props().style;
      assert.strictEqual(root.background, context.theme.boaPalette.base150);
    });

    it('should change backgroundColor pri250 when selected', () => {
      const wrapper = mount(<TimeButton context={context}>test</TimeButton>);
      wrapper.setProps({ selected: true });
      const root = wrapper.childAt(0).props().style;
      assert.strictEqual(root.background, context.theme.boaPalette.pri250);
    });

    it('should change color when time is year', () => {
      const wrapper = mount(
        <TimeButton time={new Date().getFullYear()} context={context}>
          test
        </TimeButton>,
      );
      const root = wrapper.childAt(0).props().style;
      assert.strictEqual(root.color, context.theme.palette.primary1Color);
    });
  });
});

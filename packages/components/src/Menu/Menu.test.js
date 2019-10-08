import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import { MenuItem } from '../MenuItem';
import * as SvgIcons from '@material-ui/icons';
import MuiDivider from '@material-ui/core/Divider';
import MuiMenuItem from '@material-ui/core/MenuItem';
import MuiMenuList from '@material-ui/core/MenuList';
import Menu from './Menu';
import { context, createMount, createShallow } from '@kuveytturk/boa-test/utils';

describe('<Menu />', () => {
  const items = [
    {
      text: 'test',
      value: 1,
      rightIcon: {
        dynamicIcon: 'Home',
      },
    },
    {
      text: 'test2',
      value: 2,
      items: [
        {
          text: 'test3',
          value: 3,
          leftIcon: {
            dynamicIcon: 'Home',
          },
        },
        {
          text: 'test4',
          value: 4,
        },
      ],
    },
    {
      text: 'test',
      value: 3,
      rightIcon: {
        dynamicIcon: 'Home',
      },
    },
    {
      text: 'test',
      value: 4,
      leftIcon: {
        dynamicIcon: 'ChevronLeft',
      },
    },
    {
      // divider
    },
    {
      text: 'test',
      value: 6,
    },
  ];

  let mount;
  let shallow;

  before(() => {
    mount = createMount();
    shallow = createShallow({ untilSelector: 'Menu' });
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render MuiMenuList', () => {
    const wrapper = shallow(<Menu context={context} items={items} />);
    assert.strictEqual(wrapper.type(), MuiMenuList);
    assert.strictEqual(wrapper.childAt(0).type(), MenuItem);
    assert.strictEqual(wrapper.childAt(0).props().value, 1);
    assert.strictEqual(wrapper.childAt(1).type(), MenuItem);
    assert.strictEqual(wrapper.childAt(1).props().value, 2);
  });

  it('should not render screen items', () => {
    const newItems = JSON.parse(JSON.stringify(items));
    newItems[0].allProperties = { typeId: 0 };
    newItems[1].allProperties = { typeId: 1 };
    newItems[1].allProperties = { typeId: 2 };

    const wrapper = shallow(<Menu context={context} items={newItems} />);
    assert.strictEqual(wrapper.type(), MuiMenuList);
    assert.strictEqual(wrapper.childAt(0).type(), MenuItem);
    assert.strictEqual(wrapper.childAt(0).props().value, 2);
    assert.strictEqual(wrapper.childAt(1).type(), MenuItem);
    assert.strictEqual(wrapper.childAt(1).props().value, 3);
  });

  it('should render fixed Items', () => {
    const newItems = JSON.parse(JSON.stringify(items));
    newItems[0].fixed = true;
    newItems[3].fixed = true;

    const wrapper = shallow(<Menu context={context} items={newItems} />);
    assert.strictEqual(wrapper.type(), MuiMenuList);
    assert.strictEqual(wrapper.childAt(0).type(), MenuItem);
    assert.strictEqual(wrapper.childAt(0).props().value, 1);
    assert.strictEqual(wrapper.childAt(1).type(), MenuItem);
    assert.strictEqual(wrapper.childAt(1).props().value, 4);
    assert.strictEqual(wrapper.childAt(2).type(), MuiDivider);
  });
  describe('rightIcon', () => {
    it('should render icons', () => {
      const wrapper = shallow(<Menu context={context} items={items} />);
      const menuItem = wrapper.childAt(0);
      const menuItem2 = wrapper.childAt(1);
      assert.strictEqual(menuItem.props().rightIcon.type, SvgIcons.Home);
      assert.strictEqual(menuItem2.props().rightIcon.type, SvgIcons.ChevronRight);
    });

    it('should render icon element', () => {
      const Home = SvgIcons.Home;
      items[5].rightIcon = <Home />;
      const wrapper = shallow(<Menu context={context} items={items} />);
      const menuItem = wrapper.childAt(5);
      assert.strictEqual(menuItem.props().rightIcon.type, SvgIcons.Home);
    });

    it('should render icons RTL', () => {
      const newContext = Object.assign({}, context);
      newContext.localization = { isRightToLeft: true };
      const wrapper = shallow(<Menu context={newContext} items={items} />);
      const menuItem = wrapper.childAt(0);
      const menuItem2 = wrapper.childAt(1);
      assert.strictEqual(menuItem.props().rightIcon.type, SvgIcons.Home);
      assert.strictEqual(menuItem2.props().rightIcon.type, SvgIcons.ChevronLeft);
    });
  });

  describe('leftIcon', () => {
    it('should render icons', () => {
      const wrapper = shallow(<Menu context={context} items={items} />);
      const menuItem = wrapper.childAt(3);
      assert.strictEqual(menuItem.props().leftIcon.type, SvgIcons.ChevronLeft);
      assert.strictEqual(menuItem.props().style.fontSize, 16);
    });
  });

  it('should padding right and left', () => {
    let wrapper = shallow(<Menu context={context} items={items} />);
    let menuItem = wrapper.childAt(0);
    assert.strictEqual(menuItem.props().style.paddingLeft, 12);
    assert.strictEqual(menuItem.props().style.paddingRight, 0);

    const newContext = Object.assign({}, context);
    newContext.localization = { isRightToLeft: true };
    wrapper = shallow(<Menu context={newContext} items={items} />);
    menuItem = wrapper.childAt(0);
    assert.strictEqual(menuItem.props().style.paddingLeft, 0);
    assert.strictEqual(menuItem.props().style.paddingRight, 12);
  });

  it('should render a divider for empty item', () => {
    const wrapper = shallow(<Menu context={context} items={items} />);
    const divider = wrapper.childAt(4);
    assert.strictEqual(divider.type(), MuiDivider);
    assert.strictEqual(divider.props().style.marginTop, 12);
    assert.strictEqual(divider.props().style.marginBottom, 12);
  });

  it('should change value', () => {
    const wrapper = shallow(<Menu items={items} context={context} />);
    wrapper.setProps({ value: 2 });
    assert.strictEqual(wrapper.state().value, 2);
  });

  it('should change items', () => {
    const wrapper = shallow(<Menu items={items} context={context} />);
    wrapper.setProps({ items: [items[0]] });
  });

  it('should handle selected', () => {
    const wrapper = mount(<Menu items={items} context={context} />);
    const menuItem = wrapper.find(MuiMenuItem).first();
    menuItem.simulate('click', { persist: () => { }, value: 1 });
    assert.strictEqual(wrapper.instance().getInstance().state.value, 1);
  });

  it('should fire menuItemSelected', () => {
    const menuItemSelected = spy();
    const wrapper = mount(
      <Menu items={items} context={context} menuItemSelected={menuItemSelected} />,
    );
    const menuItem = wrapper.find(MuiMenuItem).first();
    menuItem.simulate('click', { persist: () => { }, value: 1 });
    assert.strictEqual(wrapper.instance().getInstance().state.value, 1);
    assert.strictEqual(menuItemSelected.callCount, 1);
  });
});

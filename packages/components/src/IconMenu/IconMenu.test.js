import React from 'react';
import { assert } from 'chai';
import { spy } from 'sinon';
import IconButton from '@material-ui/core/IconButton';
import { Popover } from '../Popover';
import { Icon } from '../Icon';
import MenuList from '@material-ui/core/MenuList';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import * as SvgIcons from '@material-ui/icons';
import IconMenu from './IconMenu';
import { context, createShallow, createMount } from '@kuveytturk/boa-test/utils/index';

describe('<IconMenu />', () => {
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
  ];
  let shallow;
  let mount;

  before(() => {
    shallow = createShallow({ dive: true });
    mount = createMount();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render', () => {
    const wrapper = shallow(<IconMenu context={context} items={items} />);
    const menuList = wrapper
      .dive()
      .childAt(1)
      .childAt(0);
    assert.strictEqual(
      wrapper
        .dive()
        .childAt(0)
        .type(),
      IconButton,
    );
    assert.strictEqual(
      wrapper
        .dive()
        .childAt(1)
        .type(),
      Popover,
    );
    assert.strictEqual(menuList.type(), MenuList);
    menuList.children().forEach((child, index) => {
      const item = items[index];
      assert.strictEqual(item.value, child.props().value);
      if (item.items) {
        child.children().forEach((subChild, subIndex) => {
          const subItem = item.items[subIndex].value;
          assert.strictEqual(subItem.value, subChild.props().value);
          if (subItem.rightIcon) {
            assert.strictEqual(subChild.props().rightIcon, Icon.getIcon(subItem.rightIcon));
          }
          if (subItem.leftIcon) {
            assert.strictEqual(subChild.props().leftIcon, Icon.getIcon(subItem.leftIcon));
          }
        });
      }
      // if (item.rightIcon) {
      //   assert.strictEqual(child.props().rightIcon, Icon.getIcon(item.rightIcon));
      // }
      if (item.leftIcon) {
        assert.strictEqual(child.props().leftIcon, Icon.getIcon(item.leftIcon));
      }
    });
  });

  it('should has class MuiPaper', () => {
    const wrapper = mount(<IconMenu id="icon-menu-test" context={context} items={items} />);
    wrapper.find('button').simulate('click');
    const paper = document.querySelectorAll('[class*=MuiPaper-root]')[0];
    assert.strictEqual(paper.tagName.toLowerCase(), 'div');
    const list = paper.getElementsByTagName('ul')[0];
    assert.strictEqual(list.attributes.role.value, 'menu');
    const listItem = list.getElementsByTagName('li')[0];
    assert.strictEqual(listItem.value, 1);
  });

  it('should handle menu item clicks', () => {
    const onChange = spy();
    const wrapper = mount(
      <IconMenu id="icon-menu-test" context={context} items={items} onChange={onChange} />,
    );
    wrapper.find('button').simulate('click');
    const paper = document.querySelectorAll('[class*=MuiPaper-root]')[0];
    const list = paper.getElementsByTagName('ul')[0];
    const listItem = list.getElementsByTagName('li')[0];
    const div = listItem.getElementsByTagName('div')[0];
    div.click();
    assert.strictEqual(onChange.callCount, 1);
  });

  describe('prop: menuItems', () => {
    it('should mount with menuItems', () => {
      const wrapper = mount(<IconMenu id="icon-menu-test" context={context} items={items} />);
      wrapper.find('button').simulate('click');
      const paper = document.querySelectorAll('[class*=MuiPaper-root]')[0];
      assert.strictEqual(paper.tagName.toLowerCase(), 'div');
      const list = paper.getElementsByTagName('ul')[0];
      assert.strictEqual(list.attributes.role.value, 'menu');
      const listItem = list.getElementsByTagName('li')[0];
      assert.strictEqual(listItem.value, 1);
    });
  });

  describe('prop: iconType', () => {
    it('should render MoreVertIcon default', () => {
      const wrapper = shallow(<IconMenu context={context} items={items} />);
      const iconButton = wrapper.dive().childAt(0);
      assert.strictEqual(iconButton.childAt(0).type(), MoreVertIcon);
    });

    it('should render MoreHorizIcon', () => {
      const wrapper = shallow(<IconMenu context={context} items={items} iconType="horizontal" />);
      const iconButton = wrapper.dive().childAt(0);
      assert.strictEqual(iconButton.childAt(0).type(), MoreHorizIcon);
    });

    it('should render custom icon', () => {
      const Home = Icon.getIcon({ dynamicIcon: 'Home' });
      const wrapper = shallow(
        <IconMenu context={context} items={items} iconType="custom" customIcon={Home} />,
      );
      const iconButton = wrapper.dive().childAt(0);
      assert.strictEqual(iconButton.childAt(0).type(), SvgIcons.Home);
    });
  });
});

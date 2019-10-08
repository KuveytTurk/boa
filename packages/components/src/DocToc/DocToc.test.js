import React from 'react';
import { expect, assert } from 'chai';
import { spy } from 'sinon';
import DocToc from './DocToc';
import { context, createShallow, createMount } from '@kuveytturk/boa-test/utils';

describe('<DocToc />', () => {
  let mount;
  let shallow;

  before(() => {
    mount = createMount();
    shallow = createShallow();
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should render table of content', () => {
    const content = [
      {
        id: 1,
        level: 1,
        content: 'first item',
        children: [
          {
            id: 2,
            level: 2,
            content: 'first child',
          },
        ],
      },
      {
        id: 3,
        level: 1,
        content: 'second item',
        children: [
          {
            id: 4,
            level: 2,
            content: 'second child',
          },
        ],
      },
    ];
    const wrapper = shallow(<DocToc context={context} header="header" content={content} />).dive();
    const ul = wrapper.childAt(0);
    expect(ul.type()).equals('ul');
    const header = ul.childAt(0);
    expect(header.text()).contains('header');
    const firstItem = ul.childAt(1);
    expect(firstItem.type()).equals('li');
    expect(firstItem.text()).contains('first item');
    const firstChild = firstItem.childAt(1).childAt(0);
    expect(firstChild.type()).equals('li');
    expect(firstChild.text()).contains('first child');
  });

  it('should render empty content', () => {
    const content = [];
    const wrapper = shallow(<DocToc context={context} header="header" content={content} />).dive();
    const ul = wrapper.childAt(0);
    expect(ul.type()).equals('ul');
    const header = ul.childAt(0);
    expect(header.text()).contains('header');
    assert.strictEqual(wrapper.children().length, 1);
  });

  it('should mount', () => {
    const content = [
      {
        id: 1,
        level: 1,
        content: 'first item',
        children: [
          {
            id: 2,
            level: 2,
            content: 'first child',
          },
        ],
      },
      {
        id: 3,
        level: 1,
        content: 'second item',
        children: [
          {
            id: 4,
            level: 2,
            content: 'second child',
          },
        ],
      },
    ];
    const linkOnClick = spy();
    const wrapper = mount(
      <DocToc context={context} header="header" content={content} linkOnClick={linkOnClick} />,
    );
    const label = wrapper.findWhere(x => x.type() === 'label' && x.text().includes('first item'));
    label.simulate('click');
    expect(linkOnClick).to.have.property('callCount', 1);
    expect(linkOnClick.args[0][0], 'argument id is first child').equals(1);
    label.simulate('click');
  });

  it('props:activeItem', () => {
    const content = [
      {
        id: 1,
        level: 1,
        content: 'first item',
        children: [
          {
            id: 2,
            level: 2,
            content: 'first child',
          },
        ],
      },
      {
        id: 3,
        level: 1,
        content: 'second item',
        children: [
          {
            id: 4,
            level: 2,
            content: 'second child',
          },
        ],
      },
    ];
    const wrapper = shallow(<DocToc context={context} header="header" content={content} />);
    wrapper.setProps({ activeItem: '2' });
    expect(wrapper.state().activeItem).to.equals('2');
  });

  it('props:content', () => {
    const content = [
      {
        id: 1,
        level: 1,
        content: 'first item',
        children: [
          {
            id: 2,
            level: 2,
            content: 'first child',
          },
        ],
      },
      {
        id: 3,
        level: 1,
        content: 'second item',
        children: [
          {
            id: 4,
            level: 2,
            content: 'second child',
          },
        ],
      },
    ];
    const wrapper = shallow(<DocToc context={context} header="header" content={content} />).dive();
    wrapper.setProps({ content: [] });
    const ul = wrapper.childAt(0);
    expect(ul.type()).equals('ul');
    const header = ul.childAt(0);
    expect(header.text()).contains('header');
    assert.strictEqual(wrapper.children().length, 1);
  });
});

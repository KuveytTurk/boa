import React from 'react';
import { assert } from 'chai';
import { context, createShallow } from '@kuveytturk/boa-test/utils';
import PlaylistAddCheck from '@material-ui/icons/PlaylistAddCheck';
import FolderSpecial from '@material-ui/icons/FolderSpecial';
import FolderOpen from '@material-ui/icons/FolderOpen';
import Home from '@material-ui/icons/Home';
import NodeIcon from './NodeIcon';

describe('TreeView:NodeIcon', () => {
  let shallow;

  before(() => {
    shallow = createShallow({ dive: true });
  });

  it('should render', () => {
    const wrapper = shallow(
      <NodeIcon
        context={context}
        icon={<PlaylistAddCheck style={{ color: '#ff000' }} />}
        rowHeight={10}
      />,
    );
    assert.strictEqual(wrapper.type(), 'div');
    assert.strictEqual(wrapper.props().style.height, 10);
    assert.strictEqual(wrapper.props().style.lineHeight, '10px');
    assert.strictEqual(wrapper.props().style.marginRight, 12);
    assert.strictEqual(wrapper.childAt(0).type(), PlaylistAddCheck);
  });

  it('should render opened', () => {
    const wrapper = shallow(
      <NodeIcon
        state="opened"
        context={context}
        rowHeight={10}
        showFolderIcon
        hasChildren />);
    assert.strictEqual(
      wrapper
        .childAt(0)
        .childAt(0)
        .type(),
      FolderOpen,
    );
  });

  it('should render closed', () => {
    const wrapper = shallow(
      <NodeIcon
        state="closed"
        context={context}
        rowHeight={10}
        showFolderIcon
        hasChildren />);
    assert.strictEqual(
      wrapper
        .childAt(0)
        .childAt(0)
        .type(),
      FolderSpecial,
    );
  });

  it('should render default', () => {
    const wrapper = shallow(
      <NodeIcon
        context={context}
        rowHeight={10}
        showFolderIcon
        hasChildren />);
    assert.strictEqual(
      wrapper
        .childAt(0)
        .childAt(0)
        .type(),
      FolderSpecial,
    );
  });


  it('should render noFolderIcon', () => {
    const wrapper = shallow(
      <NodeIcon
        context={context}
        rowHeight={10}
        showFolderIcon={false}
        hasChildren={false} />);
    assert.strictEqual(
      wrapper
        .childAt(0)
        .type(),
      'div',
    );
  });

  it('should render dynamicIcon', () => {
    const wrapper = shallow(
      <NodeIcon context={context} icon={{ dynamicIcon: 'Home' }} rowHeight={10} />,
    );
    assert.strictEqual(wrapper.type(), 'div');
    assert.strictEqual(wrapper.props().style.height, 10);
    assert.strictEqual(wrapper.props().style.lineHeight, '10px');
    assert.strictEqual(wrapper.childAt(0).type(), Home);
  });

  it('should render RTL', () => {
    const newContext = Object.assign({}, context);
    newContext.localization = { isRightToLeft: true };
    const wrapper = shallow(
      <NodeIcon context={newContext} icon={{ dynamicIcon: 'Home' }} rowHeight={10} />,
    );
    assert.strictEqual(wrapper.type(), 'div');
    assert.strictEqual(wrapper.props().style.height, 10);
    assert.strictEqual(wrapper.props().style.lineHeight, '10px');
    assert.strictEqual(wrapper.props().style.marginLeft, 12);
    assert.strictEqual(wrapper.childAt(0).type(), Home);
  });
});

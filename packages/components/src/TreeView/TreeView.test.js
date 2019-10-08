import React from 'react';
import { stub, useFakeTimers } from 'sinon';
import { assert } from 'chai';
import { InputAction } from '@kuveytturk/boa-components/InputAction';
import TreeView from './TreeView';
// import Tree from 'react-virtualized-tree';
// import TreeNode from './components/TreeNode';
import TreeRadioBox from './components/TreeRadioBox';
import TreeCheckBox from './components/TreeCheckBox';
import { context, createMount } from '@kuveytturk/boa-test/utils';
import sampleData from './data/sampleData';

describe('<TreeView />', () => {
  let mount;
  // let shallow;

  before(() => {
    mount = createMount();
    // shallow = createShallow({ dive: true });
  });

  afterEach(() => {
    mount.cleanUp();
  });

  it('should mount', () => {
    mount(<TreeView data={sampleData} context={context} />);
  });

  it('should mount RTL', () => {
    const newContext = Object.assign({}, context);
    newContext.localization = { isRightToLeft: true };
    mount(<TreeView data={sampleData} context={newContext} />);
  });

  describe('FilteringContainer', () => {
    it('should render a input action', () => {
      const wrapper = mount(<TreeView data={sampleData} context={context} />);
      wrapper.instance().filteringContainer.setState({ filterTerm: null });
      wrapper.update();
      let input = wrapper.find(InputAction).first();
      assert.strictEqual(input.props().value, '');
      wrapper.instance().filteringContainer.setState({ filterTerm: 'gulp' });
      wrapper.update();
      input = wrapper.find(InputAction).first();
      assert.strictEqual(input.props().value, 'gulp');
    });

    it('should search', () => {
      const wrapper = mount(<TreeView data={sampleData} context={context} />);
      const input = wrapper.find(InputAction).first();
      const instance = input.instance();
      const getValueStub = stub(instance, 'getInstance').returns({
        getValue: () => 'gulp',
      });
      wrapper.instance().filteringContainer.search();
      getValueStub.restore();
      assert.strictEqual(wrapper.find('p').at(1).text(), '2 BOA.TreeviewItemFound');
    });

    it('should search with click', () => {
      const wrapper = mount(<TreeView data={sampleData} context={context} />);
      const input = wrapper.find(InputAction).first();
      const button = wrapper.find('button');
      const instance = input.instance();
      const getValueStub = stub(instance, 'getInstance').returns({
        getValue: () => 'gulp',
      });
      button.simulate('click');
      getValueStub.restore();
      assert.strictEqual(wrapper.find('p').at(1).text(), '2 BOA.TreeviewItemFound');
    });

    it('should search async with key down', () => {
      const clock = useFakeTimers(new Date());
      const wrapper = mount(<TreeView data={sampleData} context={context} />);
      const input = wrapper.find(InputAction).first();
      const instance = input.instance();
      const getValueStub = stub(instance, 'getInstance').returns({
        getValue: () => 'gulp',
      });
      input.find('input').simulate('keyDown', { keyCode: 40 });
      clock.tick(1000);
      getValueStub.restore();
      assert.strictEqual(wrapper.find('p').at(1).text(), '2 BOA.TreeviewItemFound');
    });

    it('should search with enter key down immediately', () => {
      const wrapper = mount(<TreeView data={sampleData} context={context} />);
      const input = wrapper.find(InputAction).first();
      const instance = input.instance();
      const getValueStub = stub(instance, 'getInstance').returns({
        getValue: () => 'gulp',
      });
      input.find('input').simulate('keyDown', { keyCode: 13 });
      getValueStub.restore();
      assert.strictEqual(wrapper.find('p').at(1).text(), '2 BOA.TreeviewItemFound');
    });

    it('should clear search', () => {
      const wrapper = mount(<TreeView data={sampleData} context={context} />);
      const input = wrapper.find(InputAction).first();
      const instance = input.instance();
      const getValueStub = stub(instance, 'getInstance').returns({
        getValue: () => 'gulp',
      });
      wrapper.instance().filteringContainer.search();
      wrapper.update();
      getValueStub.restore();
      const button = wrapper.find('button').last();
      button.simulate('click');
      assert.strictEqual(wrapper.find('p').at(1).text(), '1 BOA.TreeviewItemSelected');
    });
  });

  describe('generateTreeNode', () => {
    describe('selects', () => {
      it('should render TreeCheckBox', () => {
        const wrapper = mount(<TreeView data={sampleData} context={context} />);
        const node = {
          state: {
            indeterminate: true,
          },
        };
        const treeNode = wrapper.instance().generateTreeNode(node, {});
        assert.strictEqual(treeNode.props.children[1].type, TreeCheckBox);
      });

      it('should render TreeRadioBox', () => {
        const wrapper = mount(<TreeView data={sampleData} context={context} />);
        wrapper.setProps({ isCheckable: true, isMultiSelect: false });
        const node = {
          state: {
            indeterminate: true,
          },
        };
        const treeNode = wrapper.instance().generateTreeNode(node, {});
        assert.strictEqual(treeNode.props.children[1].type, TreeRadioBox);
      });

      it('should render without select', () => {
        const wrapper = mount(<TreeView data={sampleData} context={context} />);
        wrapper.setProps({ isCheckable: false, isMultiSelect: false });
        const node = {
          state: {
            indeterminate: true,
          },
        };
        const treeNode = wrapper.instance().generateTreeNode(node, {});
        assert.strictEqual(treeNode.props.children[1]); // undefined
      });

      it('should render TreeCheckBox at leaf', () => {
        const wrapper = mount(<TreeView data={sampleData} context={context} />);
        wrapper.setProps({ isLeafCheckable: true });
        const node = {
          state: {
            indeterminate: true,
          },
        };
        const treeNode = wrapper.instance().generateTreeNode(node, {});
        assert.strictEqual(treeNode.props.children[1].type, TreeCheckBox);
      });
    });

    describe('icons', () => {
      it('should render collapsed', () => {
        const wrapper = mount(<TreeView data={sampleData} context={context} />);
        const node = {
          state: {
            open: false,
          },
          children: [{ state: { open: false, foo: 'foo' } }],
        };
        const treeNode = wrapper.instance().generateTreeNode(node, {});
        assert.strictEqual(treeNode.props.children[2].props.state, 'closed');
      });

      it('should render expanded', () => {
        const wrapper = mount(<TreeView data={sampleData} context={context} />);
        const node = {
          state: {
            open: true,
          },
          children: [{ state: { open: true, foo: 'foo' } }],
        };
        const treeNode = wrapper.instance().generateTreeNode(node, {});
        assert.strictEqual(treeNode.props.children[2].props.state, 'opened');
      });
    });

    it('should render node detail', () => {
      const wrapper = mount(<TreeView data={sampleData} context={context} />);
      const node = {
        state: {
          indeterminate: true,
        },
        detail: 'test',
      };
      const treeNode = wrapper.instance().generateTreeNode(node, {});
      const span = treeNode.props.children[3];
      assert.strictEqual(span.props.children[1].props.children[2].props.children, 'test');
    });
  });

  it('should change nodes', () => {
    const wrapper = mount(<TreeView data={sampleData} context={context} />);
    wrapper.instance().selectedNode = { id: 5 };
    wrapper.setProps({ isMultiSelect: false });
    const nodes = wrapper.state().nodes;
    wrapper.instance().handleChange(nodes);

    nodes.forEach((node) => {
      if (node.state === undefined) node.state = {};
      if (node.state.checked && node.id !== wrapper.instance().selectedNode.id) {
        node.state.checked = false;
      }
    });
    assert.strictEqual(nodes, wrapper.state().nodes);
  });

  it('should change selectedNode', () => {
    const wrapper = mount(<TreeView data={sampleData} context={context} />);
    const node = { id: 5 };
    wrapper.instance().onSelectedTreeNode(node);

    assert.strictEqual(node, wrapper.instance().selectedNode);
  });

  it('should getValue', () => {
    const wrapper = mount(<TreeView data={sampleData} context={context} />);
    wrapper.setProps({ isCheckable: true });
    assert.deepEqual(wrapper.instance().getValue(), wrapper.instance().getCheckedNodes());

    wrapper.setProps({ isCheckable: false });
    assert.deepEqual(wrapper.instance().getValue(), wrapper.instance().selectedNode);
  });

  it('should wrap', () => {
    const wrapper = mount(<TreeView data={sampleData} context={context} />);
    const test = 'test';
    const wrappedSpan = wrapper.instance().wrap(test);
    const testSpan = `<span style="color: ${
      context.theme.boaPalette.pri500
      }; background-color: #b618ce29">${test}</span>`;
    assert.strictEqual(testSpan, wrappedSpan);
  });

  it('should highlightSearchTerm', () => {
    const wrapper = mount(<TreeView data={sampleData} context={context} />);
    const filterTerm = wrapper.instance().filteringContainer
      && wrapper.instance().filteringContainer.getInstance().getFilterTerm();
    const node = { name: 'test' };
    const returnValue = wrapper.instance().highlightSearchTerm(node);

    if (filterTerm && node.name) {
      const regex = new RegExp(filterTerm, 'gi');
      const p = node.name.replace(regex, match => wrapper.instance().wrap(match));
      // eslint-disable-next-line react/no-danger
      assert.strictEqual(returnValue, <span dangerouslySetInnerHTML={{ __html: p }} />);
    } else assert.strictEqual(returnValue, node.name);
  });

  describe('style', () => {
    it('should return correct style', () => {
      const wrapper = mount(<TreeView context={context} />);
      const style = wrapper.instance().getStyle();
      assert.strictEqual(style.mainDiv.outline, 'none');
      assert.strictEqual(style.mainDiv.background, 'white');
      // eslint-disable-next-line max-len
      const shadow = '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)';
      assert.strictEqual(style.mainDiv.boxShadow, shadow);

      const startAdornmentStyle = {
        paddingLeft: '24px',
        marginLeft: '0',
        paddingBottom: '12px',
        marginTop: '6px',
      };
      assert.deepEqual(style.startAdornmentStyle, startAdornmentStyle);

      const inputDiv = {
        marginTop: '0px',
        marginBottom: '18px',
        height: '30px',
      };
      assert.deepEqual(style.inputDiv, inputDiv);
    });

    it('should assign style', () => {
      const wrapper = mount(<TreeView style={{ margin: 10 }} context={context} />);
      const style = wrapper.instance().getStyle();
      assert.strictEqual(style.mainDiv.margin, 10);
    });

    it('should assign width', () => {
      const wrapper = mount(<TreeView width="60%" context={context} />);
      let style = wrapper.instance().getStyle();
      assert.strictEqual(style.width, '60%');
      wrapper.setProps({ width: 70 });
      style = wrapper.instance().getStyle();
      assert.strictEqual(style.width, '70px');
    });
  });

  it('should save snapshot', () => {
    const wrapper = mount(<TreeView data={sampleData} context={context} />);
    const snapshot = wrapper.instance().getSnapshot();
    const first = Object.assign({}, wrapper.instance());
    wrapper.setProps({ data: [] });
    wrapper.update();
    assert.strictEqual(wrapper.state().nodes.length, 0);
    wrapper.instance().setSnapshot(snapshot);
    wrapper.update();
    const second = Object.assign({}, wrapper.instance());
    assert.strictEqual(first.state.nodes, second.state.nodes);
  });

  it('should expand all', () => {
    const wrapper = mount(<TreeView data={sampleData} context={context} />);
    wrapper.setProps({ expandAll: true });
    const nodes = wrapper.state().nodes;
    nodes.forEach((item) => {
      assert.strictEqual(item.isExpanded, true);
      assert.strictEqual(item.state.expanded, true);
      if (item.children && item.children.length > 0) {
        item.children.forEach((child) => {
          assert.strictEqual(child.state.expanded, true);
          if (child.children && child.children.lenght > 0) {
            assert.strictEqual(child.isExpanded, true);
          }
        });
      }
    });
  });
});

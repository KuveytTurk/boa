import React from 'react';
import PropTypes from 'prop-types';
import { Divider } from '../Divider';
import { ComponentBase, ComponentComposer } from '@kuveytturk/boa-base';
import Tree from 'react-virtualized-tree';
import Toggler from './components/Toggler';
import TreeNode from './components/TreeNode';
import NodeIcon from './components/NodeIcon';
import Footer from './components/Footer';
import TreeRadioBox from './components/TreeRadioBox';
import TreeCheckBox from './components/TreeCheckBox';
import FilteringContainer from './FilteringContainer';
import iterateTree from './iterateTree';

const getTotalNumberOfElements = (nodes, counter = 0) => {
  // eslint-disable-next-line max-len
  return counter + nodes
    ? nodes.length + nodes.reduce((acc, n) => getTotalNumberOfElements(n.children, acc), counter)
    : 0;
};

/**
 * This component visualizes the elements hierarchically.
 * Almost anything can be represented in a tree structure.
 * See the `./data/sampleData.js` for sample data.
 */
@ComponentComposer
class TreeView extends ComponentBase {
  static propTypes = {
    /**
     * Base properties from ComponentBase.
     */
    ...ComponentBase.propTypes,
    /**
     * Data source of the treeview element.
     */
    data: PropTypes.oneOfType([PropTypes.array, PropTypes.object]).isRequired,
    /**
     * If `true`, all nodes of the treeview are expanded.
     */
    expandAll: PropTypes.bool,
    /**
     * Overrides style of the footer element.
     */
    footerStyle: PropTypes.object,
    /**
     * Height of the tree element.
     */
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    /**
     * Hint text of the search element.
     */
    hintText: PropTypes.string,
    /**
     * If `true`, all treeview nodes become checkable.
     */
    isCheckable: PropTypes.bool,
    /**
     * If `true`, only leaf nodes of the treeview become checkable.
     */
    isLeafCheckable: PropTypes.bool,
    /**
     * If `true`, checkboxes appear in nodes and multi selection is actived.
     * If `false`, radio buttons appear in nodes and single selection is actived.
     */
    isMultiSelect: PropTypes.bool,
    /**
     * Callback function when a node is checked.
     */
    onCheckNode: PropTypes.func,
    /**
     * Row height of the treeview nodes.
     */
    rowHeight: PropTypes.oneOfType([PropTypes.number]),

    /**
     * If `false`, the parent node hasn't icon.
     */
    showFolderIcon: PropTypes.bool,
    /**
     * If `true`, footer of the treeview is visible.
     */
    showFooter: PropTypes.bool,
    /**
     * If `true`, icons of all nodes are visible.
     */
    showIcons: PropTypes.bool,
    /**
     * If `true`, search input element is visible.
     */
    showSearch: PropTypes.bool,
    /**
     * Width of the treeview.
     */
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  };

  static defaultProps = {
    ...ComponentBase.defaultProps,
    data: [],
    width: '100%',
    height: 500,
    rowHeight: 36,
    expandAll: false,
    isMultiSelect: true,
    showFooter: true,
    isCheckable: true,
    isLeafCheckable: false,
    showIcons: true,
    showSearch: true,
    canCheckChildsByParent: true,
    showFolderIcon: true,
  };

  state = {
    disabled: this.props.disabled,
    nodes: this.manageNodes(this.props.data, this.props.expandAll),
  };

  constructor(props, context) {
    super(props, context);
    this.onSelectedTreeNode = this.onSelectedTreeNode.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    /* istanbul ignore else */
    if (nextProps.data !== this.props.data || nextProps.expandAll !== this.props.expandAll) {
      this.setState({
        nodes: this.manageNodes(nextProps.data, nextProps.expandAll),
      });
    }
  }

  getSnapshot() {
    return {
      state: this.state,
      nodes: this.nodes,
      selectedNode: this.selectedNode,
    };
  }

  setSnapshot(snapshot) {
    const { state, nodes, selectedNode } = snapshot;
    this.setState({ ...state });
    this.nodes = nodes;
    this.selectedNode = selectedNode;
  }

  manageNodes(data, expandAll) {
    const newData = Array.isArray(data) ? data : [data];
    iterateTree(newData, item => {
      const node = item;
      if (node.state === undefined) {
        node.state = {};
      }
      node.state.expanded = expandAll === true || node.isExpanded !== undefined;
      node.state.checked = node.isSelected;
    });
    this.nodes = newData;
    return newData;
  }

  handleChange(nodes) {
    if (this.props.isMultiSelect !== true) {
      iterateTree(nodes, item => {
        const node = item;
        if (node.state === undefined) node.state = {};
        if (node.state.checked && node.id !== this.selectedNode.id) node.state.checked = false;
      });
    }
    this.nodes = nodes;
    this.setState({ nodes });
  }

  getValue() {
    if (this.props.isCheckable) return this.getCheckedNodes();
    return this.selectedNode;
  }

  getCheckedNodes() {
    const list = [];
    iterateTree(this.nodes || this.state.nodes, item => {
      const node = item;
      if (node.state === undefined) node.state = {};
      if (node.state.checked) list.push(node);
    });
    return list;
  }

  onSelectedTreeNode(node) {
    this.selectedNode = node;
  }

  generateTreeNode(node, rest) {
    const hasChildren = node.children && node.children.length > 0;
    let toggleState = '';
    if ((!node.children && node.loadOnDemand) || (hasChildren && node.state && !node.state.open)) {
      toggleState = 'closed';
    }
    if (hasChildren && node.state && node.state.open) {
      toggleState = 'opened';
    }

    const { isCheckable, isMultiSelect, context } = this.props;
    const theme = context.theme;
    let checkBox;

    if (isCheckable && isMultiSelect) {
      checkBox = (
        <TreeCheckBox
          context={this.props.context}
          node={node}
          {...rest}
          rowHeight={this.props.rowHeight}
          onCheckNode={this.props.onCheckNode}
        />
      );
    } else if (isCheckable) {
      checkBox = (
        <TreeRadioBox
          context={this.props.context}
          node={node}
          {...rest}
          rowHeight={this.props.rowHeight}
          onCheckNode={this.props.onCheckNode}
        />
      );
    }

    return (
      <TreeNode
        context={this.props.context}
        depth={node.deepness}
        rowHeight={this.props.rowHeight}
        node={node}
        onSelected={this.onSelectedTreeNode}
      >
        <Toggler
          context={this.props.context}
          node={node}
          {...rest}
          rowHeight={this.props.rowHeight}
        />
        {this.props.isLeafCheckable ? (node.children || []).length === 0 && checkBox : checkBox}
        {this.props.showIcons && (
          <NodeIcon
            state={toggleState}
            hasChildren={hasChildren}
            showFolderIcon={this.props.showFolderIcon}
            context={this.props.context}
            icon={node.icon}
            rowHeight={this.props.rowHeight}
          />
        )}
        <span
          style={{
            cursor: 'pointer',
            margin: 0,
            userSelect: 'none',
            display: 'inline-block',
            verticalAlign: 'middle',
            whiteSpace: 'nowrap',
            height: this.props.rowHeight,
            fontSize: '14px',
            color: this.props.context.theme.boaPalette.base450,
            lineHeight: `${this.props.rowHeight}px`,
          }}
        >
          {' '}
          {node.detail ? (
            <span style={{ lineHeight: '15px', display: 'inline-block', verticalAlign: 'middle' }}>
              {this.highlightSearchTerm(node)}
              <br />
              <span
                style={{
                  color: theme.boaPalette.base400,
                  fontWeight: '400',
                  fontSize: '12px',
                }}
              >
                {node.detail}
              </span>
            </span>
          ) : (
              this.highlightSearchTerm(node)
            )}
        </span>
      </TreeNode>
    );
  }

  wrap(match) {
    // eslint-disable-next-line max-len
    return `<span style="color: ${
      this.props.context.theme.boaPalette.pri500
      }; background-color: #b618ce29">${match}</span>`;
  }

  highlightSearchTerm(node) {
    // eslint-disable-next-line max-len
    const filterTerm =
      this.filteringContainer && this.filteringContainer.getInstance().getFilterTerm();
    if (filterTerm && node.name) {
      const regex = new RegExp(filterTerm, 'gi');
      const p = node.name.replace(regex, match => this.wrap(match));
      // eslint-disable-next-line react/no-danger
      return <span dangerouslySetInnerHTML={{ __html: p }} />;
    }
    return node.name;
  }

  getStyle() {
    const mainDiv = {
      outline: 'none',
      background: 'white',
      ...this.props.style,
    };

    // eslint-disable-next-line max-len
    mainDiv.boxShadow = '0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)';
    const width = typeof this.props.width === 'string' ? this.props.width : `${this.props.width}px`;

    const startAdornmentStyle = {
      paddingLeft: '24px',
      marginLeft: '0',
      paddingBottom: '12px',
      marginTop: '6px',
    };

    if (this.props.context.localization.isRightToLeft) {
      startAdornmentStyle.paddingLeft = '0px';
      startAdornmentStyle.paddingRight = '24px';
    }

    const endAdornmentStyle = { paddingBottom: '12px', marginTop: '6px', paddingRight: '12px' };
    if (this.props.context.localization.isRightToLeft) {
      endAdornmentStyle.paddingLeft = '12px';
      endAdornmentStyle.paddingRight = '0px';
    }

    const inputDiv = {
      marginTop: '0px',
      marginBottom: '18px',
      height: '30px',
    };

    return {
      mainDiv,
      width,
      startAdornmentStyle,
      endAdornmentStyle,
      inputDiv,
    };
  }

  getFooterText(nodes) {
    let footerText = this.getMessage('BOA', 'TreeviewItemNotSelected');
    // eslint-disable-next-line max-len
    const filterTerm =
      this.filteringContainer && this.filteringContainer.getInstance().getFilterTerm();
    if (filterTerm) {
      const totalNumberOfNodes = getTotalNumberOfElements(nodes);
      footerText = this.getMessage('BOA', 'TreeviewItemNotFound');
      if (totalNumberOfNodes > 0) {
        footerText = `${totalNumberOfNodes} ${this.getMessage('BOA', 'TreeviewItemFound')}`;
      }
      return footerText;
    }

    const checkedNodes = this.getCheckedNodes();
    if (checkedNodes.length > 0) {
      footerText = `${checkedNodes.length} ${this.getMessage('BOA', 'TreeviewItemSelected')}`;
    }
    return footerText;
  }

  calculateHeight() {
    let h = this.props.height;
    if (this.props.showSearch) h -= 50;
    if (this.props.showFooter) h -= 50;
    return h;
  }

  render() {
    const style = this.getStyle();

    return (
      <div style={style.mainDiv}>
        <FilteringContainer
          ref={r => (this.filteringContainer = r)}
          context={this.props.context}
          style={style}
          showSearch={this.props.showSearch}
          hintText={this.props.hintText}
          nodes={this.state.nodes}
        >
          {({ nodes }) => (
            <div>
              <div style={{ height: this.calculateHeight() }}>
                <Tree ref={r => (this.tree = r)} nodes={nodes} onChange={this.handleChange}>
                  {({ node, ...rest }) => this.generateTreeNode(node, rest)}
                </Tree>
              </div>
              {this.props.isCheckable && this.props.showFooter && (
                <div>
                  <Divider style={{ margin: 0 }} />
                  <Footer style={this.props.footerStyle} context={this.props.context}>
                    {this.getFooterText(nodes)}
                  </Footer>
                </div>
              )}
            </div>
          )}
        </FilteringContainer>
      </div>
    );
  }
}

export default TreeView;

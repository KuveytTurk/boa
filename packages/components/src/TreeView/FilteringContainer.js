import React from 'react';
import PropTypes from 'prop-types';
import { Node } from 'react-virtualized-tree';
import { InputAction } from '@kuveytturk/boa-components/InputAction';
import { ComponentBase, ComponentComposer } from '@kuveytturk/boa-base';
import { Localization } from '@kuveytturk/boa-utils';
import filterNodes from './selectors/filtering';

const nameMatchesSearchTerm = searchTerm => ({ name }) => {
  const upperCaseName = Localization.stringLowerCase(name);
  const upperCaseSearchTerm = Localization.stringLowerCase(searchTerm);

  return upperCaseName.indexOf(upperCaseSearchTerm.trim()) > -1;
};

@ComponentComposer
class FilteringContainer extends ComponentBase {
  static propTypes = {
    children: PropTypes.func.isRequired,
  };

  state = {
    filterText: '',
    filterTerm: '',
  };

  static childContextTypes = {
    unfilteredNodes: PropTypes.arrayOf(PropTypes.shape(Node)).isRequired,
  };

  searchActionButton = {
    dynamicIcon: 'Search',
    iconProperties: { color: 'primary' },
    onClick: () => {
      this.search();
    },
  };

  clearActionButton = {
    dynamicIcon: 'Clear',
    iconProperties: { color: 'primary' },
    onClick: () => {
      this.setState({ filterTerm: '' });
    },
  };

  getChildContext = () => {
    return { unfilteredNodes: this.props.nodes };
  };

  handleOnSearchTextKeyDown(event) {
    clearTimeout(this.searchTextTimer);

    const { keyCode } = event;
    const ENTER = 13;

    if (keyCode === ENTER) {
      this.search();
      clearTimeout(this.searchTextTimer);
    } else {
      this.searchTextTimer = setTimeout(() => {
        this.search();
      }, 1000);
    }
  }

  search() {
    const filterTerm = this.searchInput.getInstance().getValue();
    this.setState({ filterTerm });
  }

  getFilterTerm() {
    return this.state.filterTerm;
  }

  render() {
    const { filterTerm } = this.state;
    const { nodes, children: treeRenderer } = this.props;

    const relevantNodes = { nodes };

    const { nodes: filteredNodes } = filterTerm
      ? filterNodes(nameMatchesSearchTerm(filterTerm), relevantNodes.nodes)
      : relevantNodes;

    return (
      <div>
        {this.props.showSearch && (
          <div style={this.props.style.inputDiv}>
            <InputAction
              ref={r => (this.searchInput = r)}
              style={{ width: this.props.style.width }}
              inputStyle={{ height: 30 }}
              startAdornmentStyle={this.props.style.startAdornmentStyle}
              endAdornmentStyle={this.props.style.endAdornmentStyle}
              context={this.props.context}
              rightIconList={filterTerm ? [this.clearActionButton] : []}
              leftIconList={[this.searchActionButton]}
              hintText={this.props.hintText}
              value={filterTerm === null ? '' : filterTerm}
              type={'text'}
              onKeyDown={event => {
                this.handleOnSearchTextKeyDown(event);
              }}
            />
          </div>
        )}
        {treeRenderer({ nodes: filteredNodes })}
      </div>
    );
  }
}

export default FilteringContainer;

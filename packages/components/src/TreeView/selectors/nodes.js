import { createSelector } from 'reselect';
import UPDATE_TYPE from '../contants';

export const getNodeRenderOptions = createSelector(
  node => (node.state || {}).expanded,
  node => (node.state || {}).checked,
  node => node.children,
  (expanded, checked, children = []) => ({
    hasChildren: !!children.length,
    isExpanded: !!expanded,
    isChecked: !!checked,
  }),
);

export const updateNode = (originalNode, newState) => ({
  node: {
    ...originalNode,
    state: {
      ...originalNode.state,
      ...newState,
    },
  },
  type: UPDATE_TYPE.UPDATE,
});

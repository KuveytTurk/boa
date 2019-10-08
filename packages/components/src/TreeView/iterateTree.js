/**
 * treeForEach
 * @param {*} nodes
 * @param {*} doJop
 */
const iterateTree = (nodes, doJop) => {
  /* istanbul ignore else */
  if (nodes && Array.isArray(nodes)) {
    const array = nodes;
    array.forEach(node => {
      /* istanbul ignore else */
      if (doJop) {
        doJop(node);
      }
      if ((node.children || []).length > 0) {
        iterateTree(node.children, doJop);
      }
    });
  }
};

export default iterateTree;

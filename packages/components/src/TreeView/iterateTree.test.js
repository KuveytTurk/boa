import { assert } from 'chai';
import { spy } from 'sinon';
import iterateTree from './iterateTree';

describe('TreeView:iterateTree', () => {
  it('should iterate each element', () => {
    const nodes = [1, 2, 3];
    const iterateSpy = spy();
    iterateTree(nodes, iterateSpy);
    assert.strictEqual(iterateSpy.callCount, 3);
    assert.strictEqual(iterateSpy.args[0][0], 1);
    assert.strictEqual(iterateSpy.args[1][0], 2);
    assert.strictEqual(iterateSpy.args[2][0], 3);
  });

  it('should iterate with childs', () => {
    const nodes = [
      {
        id: 1,
        children: [1, 2, 3],
      },
      {
        id: 2,
        children: [4, 5, 6],
      },
      {
        id: 3,
      },
      {
        id: 4,
        children: [
          {
            id: 5,
            children: [7, 8, 9],
          },
        ],
      },
    ];
    const iterateSpy = spy();
    iterateTree(nodes, iterateSpy);
    assert.strictEqual(iterateSpy.callCount, 14);
  });
});

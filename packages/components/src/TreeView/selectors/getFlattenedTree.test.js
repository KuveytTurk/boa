import { assert } from 'chai';
import getFlattenedTree from './getFlattenedTree';

describe('TreeView:getFlattenedTree', () => {
  it('should flat with no child', () => {
    const result = getFlattenedTree([
      {
        foo: 'test',
      },
    ]);
    assert.strictEqual(result[0].foo, 'test');
    assert.strictEqual(result[0].deepness, 0);
    assert.strictEqual(result[0].parents.length, 0);
  });

  it('should flat with child and collapsed', () => {
    const result = getFlattenedTree([
      {
        foo: 'test',
        children: [
          {
            bar: 'test',
          },
        ],
      },
    ]);
    assert.strictEqual(result[0].foo, 'test');
    assert.strictEqual(result[0].deepness, 0);
    assert.strictEqual(result[0].parents.length, 0);
    assert.strictEqual(result[0].children.length, 1);
    assert.strictEqual(result[0].children[0].bar, 'test');
    assert.strictEqual(result[0].children[0].bar, 'test');
  });

  it('should flat with child and expanded', () => {
    const result = getFlattenedTree([
      {
        foo: 'test',
        state: {
          expanded: true,
        },
        children: [
          {
            bar: 'test',
          },
        ],
      },
    ]);
    assert.strictEqual(result[0].foo, 'test');
    assert.strictEqual(result[0].deepness, 0);
    assert.strictEqual(result[0].parents.length, 0);
    assert.strictEqual(result[1].bar, 'test');
    assert.strictEqual(result[1].deepness, 1);
  });
});

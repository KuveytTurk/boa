import { assert } from 'chai';
import filterNodes from './filtering';

describe('TreeView:filterNodes', () => {
  it('should filter', () => {
    const filter = node => node;
    const result = filterNodes(filter, [{ foo: 'test' }, { foo: 'test2' }]);
    assert.strictEqual(result.nodes.length, 2);
    assert.strictEqual(result.nodes[0].foo, 'test');
    assert.strictEqual(result.nodes[0].children.length, 0);
    assert.strictEqual(result.nodes[1].foo, 'test2');
    assert.strictEqual(result.nodes[1].children.length, 0);
  });

  it('should filter child', () => {
    const filter = node => node;
    const result = filterNodes(filter, [
      {
        foo: 'test',
        children: [
          {
            bar: 'test',
          },
        ],
      },
      {
        foo: 'test2',
      },
    ]);
    assert.strictEqual(result.nodes.length, 2);
    assert.strictEqual(result.nodes[0].foo, 'test');
    assert.strictEqual(result.nodes[0].children.length, 1);
    assert.strictEqual(result.nodes[0].children[0].bar, 'test');
    assert.strictEqual(result.nodes[1].foo, 'test2');
    assert.strictEqual(result.nodes[1].children.length, 0);
  });

  it('should filter node', () => {
    const filter = node => node.foo === 'test' && node;
    const result = filterNodes(filter, [
      {
        foo: 'test',
        children: [
          {
            bar: 'test',
          },
        ],
      },
      {
        foo: 'test2',
      },
    ]);
    assert.strictEqual(result.nodes.length, 1);
    assert.strictEqual(result.nodes[0].foo, 'test');
    assert.strictEqual(result.nodes[0].children.length, 0);
  });

  it('should filter leaf', () => {
    const filter = node => node.bar === 'test' && node;
    const result = filterNodes(filter, [
      {
        foo: 'test',
        children: [
          {
            bar: 'test',
          },
        ],
      },
      {
        foo: 'test2',
      },
    ]);
    assert.strictEqual(result.nodes.length, 1);
    assert.strictEqual(result.nodes[0].foo, 'test');
    assert.strictEqual(result.nodes[0].children.length, 1);
    assert.strictEqual(result.nodes[0].children[0].bar, 'test');
  });
});

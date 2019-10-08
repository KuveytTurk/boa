import { assert } from 'chai';
import * as NodeHelper from './nodes';

describe('TreeView:nodes', () => {
  describe('getNodeRenderOptions', () => {
    it('should return options', () => {
      const result = NodeHelper.getNodeRenderOptions({});
      assert.strictEqual(result.hasChildren, false);
      assert.strictEqual(result.isExpanded, false);
      assert.strictEqual(result.isChecked, false);
    });

    it('should return expanded', () => {
      const result = NodeHelper.getNodeRenderOptions({ state: { expanded: true } });
      assert.strictEqual(result.hasChildren, false);
      assert.strictEqual(result.isExpanded, true);
      assert.strictEqual(result.isChecked, false);
    });

    it('should return checked', () => {
      const result = NodeHelper.getNodeRenderOptions({ state: { checked: true } });
      assert.strictEqual(result.hasChildren, false);
      assert.strictEqual(result.isExpanded, false);
      assert.strictEqual(result.isChecked, true);
    });

    it('should return children', () => {
      const result = NodeHelper.getNodeRenderOptions({ state: {}, children: ['foo'] });
      assert.strictEqual(result.hasChildren, true);
      assert.strictEqual(result.isExpanded, false);
      assert.strictEqual(result.isChecked, false);
    });
  });

  describe('updateNodes', () => {
    it('should updateNode', () => {
      const node = {
        foo: 'foo',
        state: {
          expanded: true,
          foo: 'foo',
        },
        bar: 'foo',
      };
      const newState = {
        expanded: false,
        bar: 'bar',
      };

      const result = NodeHelper.updateNode(node, newState).node;
      assert.strictEqual(result.foo, 'foo');
      assert.strictEqual(result.bar, 'foo');
      assert.strictEqual(result.state.foo, 'foo');
      assert.strictEqual(result.state.bar, 'bar');
      assert.strictEqual(result.state.expanded, false);
    });
  });
});

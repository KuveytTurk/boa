import { assert } from 'chai';
import { capitalize } from './helpers';

describe('capitalize', () => {
  it('should work', () => {
    assert.strictEqual(capitalize('foo'), 'Foo');
  });

  it('should throw when not used correctly', () => {
    assert.throw(() => {
      capitalize();
    }, /expects a string argument/);
  });
});

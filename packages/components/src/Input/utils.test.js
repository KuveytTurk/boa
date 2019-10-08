import { assert } from 'chai';
import * as Utils from './utils';

describe('Input utility', () => {
  describe('timeInfo', () => {
    it('should return duration {MM:ss} format', () => {
      const timeInfo = Utils.getTimeInfo(100);
      assert.strictEqual(timeInfo, '01:40');
    });
  });

  describe('hasValue', () => {
    it('should return true when value exists', () => {
      const result = Utils.hasValue('test');
      assert.strictEqual(result, true);
    });

    it('should return false when value one of undefined, null, empty', () => {
      [undefined, null, ''].forEach(item => {
        const result = Utils.hasValue(item);
        assert.strictEqual(result, false);
      });
    });
  });

  it('should check has value', () => {
    const timeInfo = Utils.getTimeInfo(100);
    assert.strictEqual(timeInfo, '01:40');
  });
});

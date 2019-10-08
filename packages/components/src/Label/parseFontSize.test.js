import { assert } from 'chai';
import parseFontSize from './parseFontSize';

describe('parseFontSize', () => {
  it('should parse number', () => {
    const result = parseFontSize(10);
    assert.strictEqual(result, 10);
  });

  it('should parse string', () => {
    const result = parseFontSize('10.2');
    assert.strictEqual(result, 10.2);
  });

  it('should not parse anouther type', () => {
    const result = parseFontSize({ fontSize: 10 });
    assert.strictEqual(result, undefined);
  });
});

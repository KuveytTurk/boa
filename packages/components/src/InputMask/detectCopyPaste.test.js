import { assert } from 'chai';
import detectCopyPaste from './detectCopyPaste';

describe('detectCopyPaste', () => {
  it('should handle ctrl + c', () => {
    const result = detectCopyPaste(67, { ctrlKey: true }); // '67: c'
    assert.strictEqual(result, true);
  });

  it('should handle ctrl + v', () => {
    const result = detectCopyPaste(86, { ctrlKey: true }); // '86: v'
    assert.strictEqual(result, true);
  });

  it('should handle ctrl + a', () => {
    const result = detectCopyPaste(65, { ctrlKey: true }); // '67: a'
    assert.strictEqual(result, true);
  });

  it('should handle cmd + c', () => {
    const result = detectCopyPaste(67, { metaKey: true }); // '67: c'
    assert.strictEqual(result, true);
  });

  it('should handle cmd + v', () => {
    const result = detectCopyPaste(86, { metaKey: true }); // '86: v'
    assert.strictEqual(result, true);
  });

  it('should return false other combinations', () => {
    const result = detectCopyPaste(12, {});
    assert.strictEqual(result, false);
  });
});

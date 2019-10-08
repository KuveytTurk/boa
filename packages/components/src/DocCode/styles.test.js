import { assert } from 'chai';
import styles from './styles';

describe('DocCode:styles', () => {
  it('should have editor styles', () => {
    Object.keys(styles).forEach(key => {
      assert.strictEqual(
        [
          'androidStudio',
          'atomOneDark',
          'atomOneLight',
          'github',
          'monokaiSublime',
          'rainbow',
          'vs',
          'xcode',
        ].includes(key),
        true,
        `${key} must be placed in styles`,
      );
    });
  });
});

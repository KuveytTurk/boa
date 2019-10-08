import { getTheme, getThemeList } from '.';
import { assert } from 'chai';
import { getTestRunner } from '@kuveytturk/boa-test/utils';

describe('Themes', () => {
  it('should load theme', () => {
    const theme = getTheme({ themeName: 'summer' });
    assert.strictEqual(theme.typography.useNextVariants, true);
    assert.strictEqual(theme.themeName, 'summer');
  });

  it('should load default theme', () => {
    const theme = getTheme({ themeName: 'notfoundtheme' });
    assert.strictEqual(theme.typography.useNextVariants, true);
    assert.strictEqual(theme.themeName, 'winter');
  });

  it('should list and load all theme directories', () => {
    const themeList = getThemeList();
    if (getTestRunner() === 'mocha') {
      const fs = require('fs'); // eslint-disable-line
      const path = require('path'); // eslint-disable-line
      fs.readdirSync(__dirname).forEach(file => {
        if (fs.statSync(path.join(__dirname, file)).isDirectory()) {
          assert.isObject(themeList.find(x => x.name === file && x.id >= 0));
          const theme = getTheme({ themeName: file });
          assert.strictEqual(theme.typography.useNextVariants, true);
          assert.strictEqual(theme.themeName, file);
        }
      });
    }
  });
});

import merge from 'lodash/merge';
import { createMuiTheme } from '@material-ui/core/styles';

export function getThemeList() {
  return [
    { name: 'winter', id: 0 },
    { name: 'summer', id: 1 },
    { name: 'fall', id: 2 },
    { name: 'spring', id: 3 },
    { name: 'night', id: 4 },
    { name: 'violet', id: 5 },
    { name: 'rose', id: 6 },
    { name: 'sea', id: 7 },
    { name: 'dark', id: 8 },
    { name: 'kuveytturk', id: 9 },
    { name: 'ash', id: 10 },
    { name: 'orange', id: 11 },
    { name: 'magenta', id: 12 },
  ];
}

export function loadTheme(colors) {
  return {
    typography: {
      fontFamily: 'Roboto, sans-serif',
      fontSize: 14,
      htmlFontSize: 16,
      useNextVariants: true,
    },
    palette: {
      primary: {
        light: colors.pri300,
        main: colors.pri500,
        dark: colors.pri500, // todo dark pri700

        300: colors.pri500, // dx-react-grid-material-ui
      },
      secondary: {
        light: colors.sec300,
        main: colors.sec500,
        dark: colors.sec500, // todo dark pri700
      },
      error: {
        light: colors.error500,
        main: colors.error500,
        dark: colors.error500, // todo dark pri700
      },
      // Used by `getContrastText()` to maximize the contrast between the background and
      // the text.
      contrastThreshold: 3,
      // Used to shift a color's luminance by approximately
      // two indexes within its tonal palette.
      // E.g., shift from Red 500 to Red 300 or Red 700.
      tonalOffset: 0.2,
      type: 'light',
    },
    boaPalette: colors,
  };
}

export function getTheme(opt) {
  const options = merge(
    {
      themeName: 'winter',
      kendoThemePath: 'assets/themes',
      externalTheme: {},
    },
    opt,
  );

  const themeId = getThemeList().findIndex(t => {
    return t.name === options.themeName.toLowerCase().replace(' ', '');
  });

  if (themeId === -1) {
    options.themeName = 'winter';
  }

  // eslint-disable-next-line
  const theme = loadTheme(require(`./${options.themeName}/colors`));

  const targetTheme = merge(
    {
      centeredLayout: false,
      themeName: options.themeName,
      kendoThemePath: options.kendoThemePath,
    },
    theme,
    options.externalTheme,
    {
      typography: {
        useNextVariants: true,
      },
    },
  );

  const targetMuiTheme = createMuiTheme(targetTheme);
  return targetMuiTheme;
}

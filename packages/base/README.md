# @kuveytturk/boa-base

@kuveytturk/boa-base package is the core package of boa.

## Installation


```sh
// with npm
npm install @kuveytturk/boa-base

// with yarn
yarn add @kuveytturk/boa-base
```

## API Reference

### AppProvider

This component wraps MuiThemeProvider and it also has an [error wrapper](#ErrorBoundary). It takes a theme as a property. It makes the theme available down the React tree thanks to the React context. This component should preferably be used at the root of your component tree.

### ComponentBase

This component is the base component of UI components. All UI components are inherited from ComponentBase. It has some common props:

- **componentSize**: In our design guideline, all components on a page must be placed inside a card. The ComponentSize prop defines the size of the component.  The ComponentSize constant is exported from [`enums`](/packages/base/src/enums/index.js#L10).
- **context**: The context property defines application requirements such as localization, theme, platform. We are storing our context parameters at Redux store, in our SPA. Please refer to our [Storybook Container](/.storybook/container.js) for how we change the theme, language or device size.
- **disabled**: All components should have disabled prop.
- **id**: All components should have id prop.
- **newLine**: As described in `componentSize` prop, if a component takes part in the new line on a card, we are using this prop.
- **snapshot&ast;**: In our SPA, we want to keep the state of each component when a page will unmount. And when the same page will mount again, the component mounts with snapshot prop and it get the previous state.
- **snapKey&ast;**: The snapKey property is used to manage snapshots of the child components.
- **style**: All components should have style prop.
- **valueConstraint**: The valueConstraint is used for some validation on components like limit, required etc.
- **visible**: In ComponentComposer, we change the visibility of the component with this prop.

&ast;To be detailed in next releases.

Also it has a Mui CHANNEL contextType in the ```contextTypes```. If the theme is changed from the AppProvider, the ComponentBase assigns new theme to ```props.context.theme```.

ComponentBase methods:

- **getInstance**: Returns component instance.
- **getMessage**: Gets message online or offline from [@kuveytturk/boa-utils](/packages/utils#messaging) 
- **getSnapshot**: Returns the current state of the component to provide status. 
- **setSnapshot**: Changes component status to the given snapshot.
- **validateConstraint**: Checks the valueConstraint requirements.

### ComponentComposer

ComponentComposer is a Higher-Order Component. It renders the wrapped component inside an [error wrapper](#ErrorBoundary) to prevent crashing of the component.


### EditorBase

ErrorBoundary is a wrapper for input components. It has some validation methods.

### ErrorBoundary

ErrorBoundary is an error wrapper. It has the componentDidCatch method from the React lifecyle to prevent crashes when an error occurs in the components. If an error occurs, it is indicated by the Dialog.

### Themes

We are using different color palettes with [custom themes](/packages/base/src/themes). To get the theme:

```js
import { getTheme } from '@kuveytturk/boa-base';
const theme = getTheme({ themeName: themeName });
```

After getting the theme, theme prop of the AppProvider should be re-assigned.

Current theme palettes:

```js
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
```

#### setLocalization

This function is exported from `@kuveytturk/boa-base` package to configure the [@kuveytturk/boa-utils](/packages/utils) package. See the [@kuveytturk/boa-utils](/packages/utils) package for details. Example configuration:

```js
import { setLocalization } from '@kuveytturk/boa-base';
import { Language } from '@kuveytturk/boa-utils';

setLocalization({
  url: 'http://boaonedev',
  path: '/messaging/',
  versionPath: 'MessagingVersions.json',
  fileNameFormat: 'BOA.Messaging.{0}.json',
  timeout: 3000,
  languageId: Language.TR,
});
```

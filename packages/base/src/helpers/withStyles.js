export default function isWrappedWithStyles(WrappedComponent) {
  return !!WrappedComponent.contextTypes && !!WrappedComponent.contextTypes.muiThemeProviderOptions;
}

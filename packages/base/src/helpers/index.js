export { default as shallowEqual } from './shallowEqual';
export { default as isWrappedWithStyles } from './withStyles';
export { default as findIndex } from './findIndex';

/* istanbul ignore next */
Array.prototype.findIndex = Array.prototype.findIndex || findIndex; // eslint-disable-line

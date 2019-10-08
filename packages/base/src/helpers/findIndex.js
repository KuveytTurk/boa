export default function findIndex(callback) {
  /* istanbul ignore next */
  if (this === null) {
    throw new TypeError('Array.prototype.findIndex called on null or undefined');
  } else if (typeof callback !== 'function') {
    throw new TypeError('callback must be a function');
  }
  const list = Object(this);
  const length = list.length >>> 0; // eslint-disable-line
  const thisArg = arguments[1]; // eslint-disable-line
  for (let i = 0; i < length; i++) {
    if (callback.call(thisArg, list[i], i, list)) {
      return i;
    }
  }
  return -1;
}

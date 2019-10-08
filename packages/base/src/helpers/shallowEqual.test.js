/* test cases copied https://raw.githubusercontent.com/dashed/shallowequal/master/test/shallowequal.test.js  */
import { expect } from 'chai';
import shallowEqual from './shallowEqual';

describe('shallowEqual', () => {
  it('returns false if either argument is null', () => {
    expect(shallowEqual(null, {})).to.equals(false);
    expect(shallowEqual({}, null)).to.equals(false);
  });

  it('returns true if both arguments are null or undefined', () => {
    expect(shallowEqual(null, null)).to.equals(true);
    expect(shallowEqual(undefined, undefined)).to.equals(true);
  });

  it('returns true if arguments are shallow equal', () => {
    expect(shallowEqual({ a: 1, b: 2, c: 3 }, { a: 1, b: 2, c: 3 })).to.equals(true);
  });

  it('returns false if arguments are not objects and not equal', () => {
    expect(shallowEqual(1, 2)).to.equals(false);
  });

  it('returns false if only one argument is not an object', () => {
    expect(shallowEqual(1, {})).to.equals(false);
  });

  it('returns false if first argument has too many keys', () => {
    expect(shallowEqual({ a: 1, b: 2, c: 3 }, { a: 1, b: 2 })).to.equals(false);
  });

  it('returns false if second argument has too many keys', () => {
    expect(shallowEqual({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 })).to.equals(false);
  });

  it('returns true if values are not primitives but are ===', () => {
    const obj = {};
    expect(shallowEqual({ a: 1, b: 2, c: obj }, { a: 1, b: 2, c: obj })).to.equals(true);
  });

  // subsequent test cases are copied from lodash tests
  it('returns false if arguments are not shallow equal', () => {
    expect(shallowEqual({ a: 1, b: 2, c: {} }, { a: 1, b: 2, c: {} })).to.equals(false);
  });
});

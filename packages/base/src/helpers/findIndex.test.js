import { assert } from 'chai';
import { stub } from 'sinon';
import findIndex from './findIndex';

describe('findIndex', () => {
  it('should return indexOf item from array', () => {
    const findIndexStub = stub(Array.prototype, 'findIndex').callsFake(findIndex);
    const indexOfOne = [1, 2, 3, 4, 5].findIndex(x => x === 1);
    const indexOfTwo = [1, 2, 3, 4, 5].findIndex(x => x === 2);
    findIndexStub.restore();
    assert.strictEqual(indexOfOne, 0);
    assert.strictEqual(indexOfTwo, 1);
  });

  it('should return -1 when item not exists', () => {
    const findIndexStub = stub(Array.prototype, 'findIndex').callsFake(findIndex);
    const indexOf = [1, 2, 3, 4, 5].findIndex(x => x === 0);
    findIndexStub.restore();
    assert.strictEqual(indexOf, -1);
  });
});

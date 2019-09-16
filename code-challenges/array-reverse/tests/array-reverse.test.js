'use-strict';

describe('Array reverse', () => {
  const arrayReverse = require('../array-reverse');

  const testArray1 = [1, 2, 3, 4, 5];
  const testArray2 = [1, 2];
  const testArray3 = [];
  const testArray4 = null;

  it('reverses any array', () => {
    expect(arrayReverse(testArray1)).toEqual([5, 4, 3, 2, 1]);
    expect(arrayReverse(testArray2)).toEqual([2, 1]);
    expect(arrayReverse(testArray3)).toEqual([]);
    expect(() => arrayReverse(testArray4)).toThrowError(new Error('Null pointer exception'));
  });
})
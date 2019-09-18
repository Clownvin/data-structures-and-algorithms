'use-strict';

const arrayShift = require('../array-shift');

describe('ArrayShift', () => {
  let arr = [];
  it('Works on empty array', () => {
    arr = arrayShift(arr, 1);
    expect(arr).toEqual([1]);
  });

  it('Works on arrays with 1 element', () => {
    arr = arrayShift(arr, 2);
    expect(arr).toEqual([2, 1]);
  });

  it('Works on arrays with even elements', () => {
    arr = arrayShift(arr, 3);
    expect(arr).toEqual([2, 3, 1]);
  });

  it('Works on arrays with odd elements', () => {
    arr = arrayShift(arr, 4);
    expect(arr).toEqual([2, 4, 3, 1]);
  });
});

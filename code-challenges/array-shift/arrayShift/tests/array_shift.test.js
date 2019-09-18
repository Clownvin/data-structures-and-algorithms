'use-strict';

const {insertShiftArray, removeShiftArray} = require('../array-shift');
let arr = [];

describe('insertShiftArray', () => {
  it('Works on empty array', () => {
    arr = insertShiftArray(arr, 1);
    expect(arr).toEqual([1]);
  });

  it('Works on arrays with 1 element', () => {
    arr = insertShiftArray(arr, 2);
    expect(arr).toEqual([2, 1]);
  });

  it('Works on arrays with even elements', () => {
    arr = insertShiftArray(arr, 3);
    expect(arr).toEqual([2, 3, 1]);
  });

  it('Works on arrays with odd elements', () => {
    arr = insertShiftArray(arr, 4);
    expect(arr).toEqual([2, 4, 3, 1]);
  });
});

describe('removeShiftArray', () => {

  it('Works on arrays with odd elements', () => {
    arr = removeShiftArray(arr);
    expect(arr).toEqual([2, 3, 1]);
  });

  it('Works on arrays with even elements', () => {
    arr = removeShiftArray(arr);
    expect(arr).toEqual([2, 1]);
  });

  it('Works on arrays with 1 element', () => {
    arr = removeShiftArray(arr);
    expect(arr).toEqual([1]);
  });

  it('Works on empty array', () => {
    arr = removeShiftArray(arr);
    expect(arr).toEqual([]);
  });
});

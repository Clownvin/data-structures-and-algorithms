'use strict';

const sort = require('../quick-sort');

describe('Quick Sort', () => {
  it('Can sort an array of nothing', () => {
    const arr = [];
    sort(arr);
    expect(arr).toStrictEqual([]);
  });

  it('Can sort an array of length 1', () => {
    const arr = [1];
    sort(arr);
    expect(arr).toStrictEqual([1]);
  });

  it('Can sort an array that is in order', () => {
    const arr = [1, 2, 3, 4, 5];
    sort(arr);
    expect(arr).toStrictEqual([1, 2, 3, 4, 5]);
  });

  it('Can sort an array that is in reverse order', () => {
    const arr = [5, 4, 3, 2, 1];
    sort(arr);
    expect(arr).toStrictEqual([1, 2, 3, 4, 5]);
  });

  it('Can sort an array containing duplicates', () => {
    const arr = [5, 4, 3, 2, 5, 5, 3, 3, 1, 5, 5];
    const sorted = [...arr];
    sort(sorted);
    expect(sorted).toStrictEqual(arr.sort((a, b) => a - b));
  });

  it('Can sort any mismatched array', () => {
    const arr = [5, 2, 7, 20, 1, -10, 3, 50, 2, 5];
    const sorted = [...arr];
    sort(sorted);
    expect(sorted).toStrictEqual(arr.sort((a, b) => a - b));
  });
});

'use-strict';

const { emojify } = require('../../../randomojis/randomojis');
const mergeSort = require('../merge-sort');

describe('Merge Sort', () => {
  it(emojify('will sort an array with 3 elements'), () => {
    let array = [3, 2, 1];
    mergeSort(array);
    expect(array).toStrictEqual([1, 2, 3]);
  });

  it(emojify('will sort an array of 3 in order'), () => {
    let array = [1, 2, 3];
    mergeSort(array);
    expect(array).toStrictEqual([1, 2, 3]);
  });

  it(emojify('will sort any mismatched array'), () => {
    const array = [1, 4, 2, 56, 2, 1, 4, 2, 3, 5, 1, 2, 67, 4, 0, -5, 100];
    const sorted = array.slice();
    mergeSort(sorted);
    expect(sorted).toStrictEqual(array.sort((a, b) => a - b));
  });
});

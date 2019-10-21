'use strict';

const sort = require('../insertion-sort');

describe('Insertion Sort', () => {
  it ('Can sort an empty array', () => {
    let arr = [];
    let sorted = sort(arr);
    expect(sorted).toEqual([]);
  });

  it ('Can sort a sorted array', () => {
    let arr = [1, 2, 3, 4, 5];
    let sorted = sort(arr);
    expect(sorted).toEqual([1, 2, 3, 4, 5]);
  });

  it ('Can sort an unsorted array', () => {
    let arr = [5, 4, 3, 2, 1];
    let sorted = sort(arr);
    expect(sorted).toEqual([1, 2, 3, 4, 5]);
  });
});

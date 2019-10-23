'use strict';

function quickSort(arr, left = 0, right = arr.length - 1) {
  if (left < right) {
    const position = partition(arr, left, right);
    quickSort(arr, left, position - 1);
    quickSort(arr, position + 1, right);
  }
}

function partition(arr, left, right) {
  const pivot = arr[right];
  let low = left - 1;
  for (let i = left; i < right; i++) {
    if (arr[i] <= pivot) {
      low++;
      swap(arr, i, low);
    }
  }
  low++;
  swap(arr, right, low);
  return low;
}

function swap(arr, i, low) {
  const temp = arr[i];
  arr[i] = arr[low];
  arr[low] = temp;
}

module.exports = exports = quickSort;

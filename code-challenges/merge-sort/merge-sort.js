'use-strict';

function mergeSort(array) {
  let n = array.length;
  if (n > 1) {
    const mid = n / 2;
    const left = array.slice(0, mid);
    const right = array.slice(mid, n);
    mergeSort(left);
    mergeSort(right);
    merge(left, right, array);
  }
}

function merge(left, right, array) {
  let i = 0, j = 0, k = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      array[k] = left[i++];
    } else {
      array[k] = right[j++];
    }
    k++;
  }

  while (i < left.length) {
    array[k++] = left[i++];
  }
  while (j < right.length) {
    array[k++] = right[j++];
  }
}

module.exports = exports = mergeSort;

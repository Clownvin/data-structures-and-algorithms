function binarySearch(arr, key) {
  let index = Math.floor(arr.length / 2);
  let start = 0;
  let end = arr.length;
  while (arr[index] !== key) {
    if (start >= end) {
      index = -1;
      break;
    }
    if (arr[index] < key) {
      start = index + 1;
    } else {
      end = index - 1;
    }
    index = Math.floor(((end - start) / 2) + start);
  }
  return index;
}

function recursiveBinarySearch(arr, key, start, end) {
  if (start === undefined || end === undefined) {
    start = 0;
    end = arr.length;
  }
  const index = Math.floor(((end - start) / 2) + start);
  if (arr[index] === key) {
    return index;
  }
  if (start >= end) {
    return -1;
  }
  if (arr[index] < key) {
    return recursiveBinarySearch(arr, key, index + 1, end);
  } else {
    return recursiveBinarySearch(arr, key, start, index - 1);
  }
};

module.exports = exports = { binarySearch, recursiveBinarySearch };

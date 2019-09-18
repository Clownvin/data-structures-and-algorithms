module.exports = exports = {
  insertShiftArray: (arr, val) => {
    const newArr = [];
    if (arr.length === 0) {
      newArr.push(val);
    }
    const halfway = Math.floor(arr.length / 2);
    for (let i = 0; i < arr.length; i++) {
      if (i === halfway) {
        newArr.push(val);
      }
      newArr.push(arr[i]);
    }
    return newArr;
  },

  removeShiftArray: (arr) => {
    const newArr = [];
    const halfway = Math.floor(arr.length / 2) - (arr.length % 2 ? 0 : 1);
    for (let i = 0; i < arr.length; i++) {
      if (i === halfway) {
        continue;
      }
      newArr.push(arr[i]);
    }
    return newArr;
  }
};

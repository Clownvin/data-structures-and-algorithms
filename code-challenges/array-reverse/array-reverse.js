module.exports = function reverseArray(array) {
  if (!array) {
    throw new Error('Null pointer exception');
  }
  [() => {}]
  for (let i = 0; i < Math.floor(array.length / 2); i++) {
    const temp = array[i];
    array[i] = array[array.length - i - 1];
    array[array.length - i - 1] = temp;
  }
  return array;
};

function fizzBuzz(value) {
  return value % 15 === 0 ? 'FizzBuzz' : value % 5 === 0 ? 'Buzz' : value % 3 === 0 ? 'Fizz' : value;
}

function fizzBuzzArray(array) {
  return array.map(value => fizzBuzz(value));
}

function fizzBuzzTree(tree) {
  if (!tree) {
    throw 'Tree is not defined';
  }
  tree.preOrder(node => {
    node.value = fizzBuzz(node.value);
  });
  return tree;
}

module.exports = exports = { fizzBuzz, fizzBuzzArray, fizzBuzzTree };

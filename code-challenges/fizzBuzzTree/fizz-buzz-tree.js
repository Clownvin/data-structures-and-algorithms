module.exports = exports = (tree) => {
  if (!tree) {
    throw 'Tree is not defined';
  }
  tree.preOrder(node => {
    if (node.value % 15 === 0) {
      node.value = 'FizzBuzz';
    } else if (node.value % 5 === 0) {
      node.value = 'Buzz';
    } else if (node.value % 3 === 0) {
      node.value = 'Fizz';
    }
  });
  return tree;
};

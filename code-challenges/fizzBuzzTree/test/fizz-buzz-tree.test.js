const fizzBuzzTree = require('../fizz-buzz-tree');
const {BinarySearchTree} = require('../../../tree/tree');

function fizzBuzzArray(arr) {
  return arr.map(num => num % 15 === 0 ? 'FizzBuzz' : num % 5 === 0 ? 'Buzz' : num % 3 === 0 ? 'Fizz' : num);
}

function getRandomNumber(trueRandom) {
  if (trueRandom) {
    return Number.MAX_VALUE - (Math.random() * (Number.MAX_VALUE / 2));
  }
  const rand = Math.random();
  let base = rand < .333 ? 3 : rand < .666 ? 5 : 15;
  base *= Math.random() * 10;
  return base;
}

describe('FizzBuzzTree', () => {

  it('Throws an error if no tree provided', () => {
    expect(() => fizzBuzzTree(null)).toThrow();
  });

  for (let i = 0; i < 100; i++) {
    let tree;
    for (let j = 0; j < 10; j++) {
      tree = new BinarySearchTree();
      for (let k = 0; k < i; k++) {
        tree.add(getRandomNumber(j > 4 ? true : false));
      }
      describe(`BST with ${i} random values ${j > 4 ? ', all multiples of 3, 5, or 15' : ', all totally random'}`, () => {
        const expectedInOrder = fizzBuzzArray(tree.inOrder());
        expect(fizzBuzzTree(tree).inOrder()).toStrictEqual(expectedInOrder);
      });
    }
  }
});

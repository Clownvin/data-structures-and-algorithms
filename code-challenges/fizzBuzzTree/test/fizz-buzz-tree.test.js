'use-strict';
const {emojify} = require('../../../randomojis/randomojis');
const { fizzBuzzArray, fizzBuzzTree } = require('../fizz-buzz-tree');
const {BinarySearchTree} = require('../../../tree/tree');

function getRandomNumber(trueRandom) {
  if (trueRandom) {
    return Math.floor(Number.MAX_VALUE - (Math.random() * (Number.MAX_VALUE / 2)));
  }
  const rand = Math.random();
  let base = rand < .333 ? 3 : rand < .666 ? 5 : 15;
  base *= Math.floor(Math.random() * 10);
  return base;
}

describe('FizzBuzzTree', () => {
  let tree;

  beforeEach(() => {
    tree = new BinarySearchTree();
  });

  it('Throws an error if no tree provided', () => {
    expect(() => fizzBuzzTree(null)).toThrow();
  });

  for (let i = 1; i <= 100; i++) {
    it(emojify(`Works for trees with ${i} nodes`), () => {
      for (let k = 0; k < 10; k++) {
        tree = new BinarySearchTree();
        for (let j = 0; j < i; j++) {
          tree.add(getRandomNumber(k > 5));
        }
        const expected = fizzBuzzArray(tree.inOrder());
        const got = fizzBuzzTree(tree).inOrder();
        expect(got).toStrictEqual(expected);
      }
    });
  }
});

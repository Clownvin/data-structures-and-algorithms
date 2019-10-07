'use-strict';
const randomEmoji = require('../../../randomojis/randomojis');
const fizzBuzzTree = require('../fizz-buzz-tree');
const {BinarySearchTree} = require('../../../tree/tree');

function fizzBuzzArray(arr) {
  return arr.map(num => num % 15 === 0 ? 'FizzBuzz' : num % 5 === 0 ? 'Buzz' : num % 3 === 0 ? 'Fizz' : num);
}

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
    const emoji = randomEmoji();
    it(`${emoji} Works for trees with ${i} nodes ${emoji}`, () => {
      for (let k = 0; k < 10; k++) {
        tree = new BinarySearchTree();
        for (let j = 0; j < i; j++) {
          tree.add(getRandomNumber(k > 5));
        }
        const expected = fizzBuzzArray(tree.inOrder());
        const got = fizzBuzzTree(tree).inOrder();
        //console.log(`Expecting ${expected} to equal ${got}`);
        expect(got).toStrictEqual(expected);
      }
    });
  }
});

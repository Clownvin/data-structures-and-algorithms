'use strict';

const doIntersection = require('../tree-intersection');
const {BinarySearchTree} = require('../../../tree/tree');

describe('tree-intersection', () => {
  let tree1;
  let tree2;

  beforeEach(() => {
    tree1 = new BinarySearchTree();
    tree2 = new BinarySearchTree();
  });

  it('Will return an empty array if either tree is empty', () => {
    expect(doIntersection(tree1, tree2)).toEqual([]);
    tree1.add(1);
    tree1.add(2);
    expect(doIntersection(tree1, tree2)).toEqual([]);
  });

  it('Will return an array of duplicate values', () => {
    tree1.add(5);
    tree1.add(1);
    tree1.add(4);
    tree1.add(35);

    tree2.add(5);
    tree2.add(2);
    tree2.add(3);
    tree2.add(35);

    expect(doIntersection(tree1, tree2)).toEqual([5, 35]);
  });
});

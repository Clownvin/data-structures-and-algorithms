'use-strict';

const {emojify} = require('../../randomojis/randomojis');

const {BinarySearchTree, KaryTree} = require('../tree');

describe('KaryTree', () => {
  let tree;

  beforeEach(() => {
    tree = new KaryTree(3);
  });

  it('☕ Can successfully instantiate an empty tree ☕', () => {
    expect(tree.size).toBe(0);
    expect(tree.root).toBe(null);
  });

  it('🌭 Can successfully instantiate an empty tree 🌭', () => {
    tree = new KaryTree(3, 1);
    expect(tree.size).toBe(1);
    expect(tree.height).toBe(0);
    expect(tree.root.value).toBe(1);
  });

  it('🌮 Can successfully add multiple values to the tree 🌮', () => {
    tree.add(1);
    tree.add(2);
    tree.add(3);
    expect(tree.size).toBe(3);
    expect(tree.height).toBe(1);
    expect(tree.inOrder()).toEqual([2, 1, 3]);
    tree.add(4);
    expect(tree.size).toBe(4);
    expect(tree.height).toBe(1);
    expect(tree.inOrder()).toEqual([2, 4, 1, 3]);
    tree.add(5);
    expect(tree.size).toBe(5);
    expect(tree.height).toBe(2);
    expect(tree.inOrder()).toEqual([5, 2, 4, 1, 3]);
  });

  it('🍔 Can return a collection from a preorder traversal 🍔', () => {
    tree.add(50);
    tree.add(1);
    tree.add(100);
    expect(tree.preOrder()).toEqual([50, 1, 100]);
    tree = new KaryTree(3, 100);
    tree.add(1);
    tree.add(50);
    expect(tree.preOrder()).toEqual([100, 1, 50]);
    tree = new KaryTree(3, 1);
    tree.add(50);
    tree.add(100);
    expect(tree.preOrder()).toEqual([1, 50, 100]);
  });

  it('🍕 Can return a collection from an inorder traversal 🍕', () => {
    tree.add(50);
    tree.add(1);
    tree.add(100);
    expect(tree.inOrder()).toEqual([1, 50, 100]);
    tree = new KaryTree(3, 100);
    tree.add(1);
    tree.add(50);
    expect(tree.inOrder()).toEqual([1, 100, 50]);
    tree = new KaryTree(3, 1);
    tree.add(50);
    tree.add(100);
    expect(tree.inOrder()).toEqual([50, 1, 100]);
  });

  it('🍗 Can return a collection from a postorder traversal 🍗', () => {
    tree.add(50);
    tree.add(1);
    tree.add(100);
    expect(tree.postOrder()).toEqual([1, 100, 50]);
    tree = new KaryTree(3, 100);
    tree.add(1);
    tree.add(50);
    expect(tree.postOrder()).toEqual([1, 50, 100]);
    tree = new KaryTree(3, 1);
    tree.add(50);
    tree.add(100);
    expect(tree.postOrder()).toEqual([50, 100, 1]);
  });

  it(emojify('Can return a collection from a breadth-first traversal'), () => {
    expect(tree.breadthFirst()).toEqual([]);
    tree.add(50);
    tree.add(100);
    tree.add(1);
    tree.add(4);
    expect(tree.breadthFirst()).toEqual([50, 100, 4, 1]);
  });

  it('🍟 Can check for an element using contains 🍟', () => {
    tree.add(50);
    tree.add(1);
    tree.add(100);
    expect(tree.contains(50)).toBeTruthy();
    expect(tree.contains(1)).toBeTruthy();
    expect(tree.contains(100)).toBeTruthy();
    tree = new KaryTree(3, 100);
    tree.add(1);
    tree.add(50);
    expect(tree.contains(50)).toBeTruthy();
    expect(tree.contains(1)).toBeTruthy();
    expect(tree.contains(100)).toBeTruthy();
    tree = new KaryTree(3, 1);
    tree.add(50);
    tree.add(100);
    expect(tree.contains(50)).toBeTruthy();
    expect(tree.contains(1)).toBeTruthy();
    expect(tree.contains(100)).toBeTruthy();
    expect(tree.contains(0)).toBeFalsy();
  });

});

describe('BinarySearchTree', () => {
  let tree;

  beforeEach(() => {
    tree = new BinarySearchTree();
  });

  it('☕ Can successfully instantiate an empty tree ☕', () => {
    expect(tree.size).toBe(0);
    expect(tree.root).toBe(null);
  });

  it('🌭 Can successfully instantiate a tree with a single root node 🌭', () => {
    tree = new BinarySearchTree(1);
    expect(tree.size).toBe(1);
    expect(tree.height).toBe(0);
    expect(tree.root.value).toBe(1);
  });

  it('🌮 Can successfully add to an empty tree 🌮', () => {
    tree.add(1);
    expect(tree.size).toBe(1);
    expect(tree.height).toBe(0);
    expect(tree.root.value).toBe(1);
  });

  it('🌯 Can successfully add a left and right child to a single root node 🌯', () => {
    tree.add(50);
    tree.add(1);
    expect(tree.size).toBe(2);
    expect(tree.height).toBe(1);
    expect(tree.root.leftChildren[0].value).toBe(1);
    tree.add(100);
    expect(tree.size).toBe(3);
    expect(tree.height).toBe(1);
    expect(tree.root.rightChildren[0].value).toBe(100);
  });

  it('🍔 Can return a collection from a preorder traversal 🍔', () => {
    tree.add(50);
    tree.add(1);
    tree.add(100);
    expect(tree.preOrder()).toEqual([50, 1, 100]);
    expect(tree.height).toBe(1);
    tree = new BinarySearchTree(100);
    tree.add(1);
    tree.add(50);
    expect(tree.height).toBe(2);
    expect(tree.preOrder()).toEqual([100, 1, 50]);
    tree = new BinarySearchTree(1);
    tree.add(50);
    tree.add(100);
    expect(tree.height).toBe(2);
    expect(tree.preOrder()).toEqual([1, 50, 100]);
  });

  it('🍕 Can return a collection from an inorder traversal 🍕', () => {
    tree.add(50);
    tree.add(1);
    tree.add(100);
    expect(tree.height).toBe(1);
    expect(tree.inOrder()).toEqual([1, 50, 100]);
    tree = new BinarySearchTree(100);
    tree.add(1);
    tree.add(50);
    expect(tree.height).toBe(2);
    expect(tree.inOrder()).toEqual([1, 50, 100]);
    tree = new BinarySearchTree(1);
    tree.add(50);
    tree.add(100);
    expect(tree.height).toBe(2);
    expect(tree.inOrder()).toEqual([1, 50, 100]);
  });

  it('🍗 Can return a collection from a postorder traversal 🍗', () => {
    tree.add(50);
    tree.add(1);
    tree.add(100);
    expect(tree.height).toBe(1);
    expect(tree.postOrder()).toEqual([1, 100, 50]);
    tree = new BinarySearchTree(100);
    tree.add(1);
    tree.add(50);
    expect(tree.height).toBe(2);
    expect(tree.postOrder()).toEqual([50, 1, 100]);
    tree = new BinarySearchTree(1);
    tree.add(50);
    tree.add(100);
    expect(tree.height).toBe(2);
    expect(tree.postOrder()).toEqual([100, 50, 1]);
  });

  it(emojify('Can return a collection from a breadth-first traversal'), () => {
    expect(tree.breadthFirst()).toEqual([]);
    tree.add(50);
    tree.add(1);
    tree.add(100);
    expect(tree.height).toBe(1);
    expect(tree.breadthFirst()).toEqual([50, 1, 100]);
    tree = new BinarySearchTree(100);
    tree.add(1);
    tree.add(50);
    expect(tree.height).toBe(2);
    expect(tree.breadthFirst()).toEqual([100, 1, 50]);
    tree = new BinarySearchTree(1);
    tree.add(50);
    tree.add(100);
    expect(tree.height).toBe(2);
    expect(tree.breadthFirst()).toEqual([1, 50, 100]);
  });

  it('🍟 Can check for an element using contains 🍟', () => {
    tree.add(50);
    tree.add(1);
    tree.add(100);
    expect(tree.contains(50)).toBeTruthy();
    expect(tree.contains(1)).toBeTruthy();
    expect(tree.contains(100)).toBeTruthy();
    tree = new BinarySearchTree(100);
    tree.add(1);
    tree.add(50);
    expect(tree.contains(50)).toBeTruthy();
    expect(tree.contains(1)).toBeTruthy();
    expect(tree.contains(100)).toBeTruthy();
    tree = new BinarySearchTree(1);
    tree.add(50);
    tree.add(100);
    expect(tree.contains(50)).toBeTruthy();
    expect(tree.contains(1)).toBeTruthy();
    expect(tree.contains(100)).toBeTruthy();
    expect(tree.contains(0)).toBeFalsy();
  });
});

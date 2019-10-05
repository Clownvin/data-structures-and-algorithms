'use-strict';

const {BinarySearchTree} = require('../tree');

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
    expect(tree.root.value).toBe(1);
  });

  it('🌮 Can successfully add to an empty tree 🌮', () => {
    tree.add(1);
    expect(tree.size).toBe(1);
    expect(tree.root.value).toBe(1);
  });

  it('🌯 Can successfully add a left and right child to a single root node 🌯', () => {
    tree.add(50);
    tree.add(1);
    expect(tree.size).toBe(2);
    expect(tree.root.left.value).toBe(1);
    tree.add(100);
    expect(tree.size).toBe(3);
    expect(tree.root.right.value).toBe(100);
  });

  it('🍔 Can return a collection from a preorder traversal 🍔', () => {
    tree.add(50);
    tree.add(1);
    tree.add(100);
    expect(tree.preOrder()).toEqual([50, 1, 100]);
    tree = new BinarySearchTree(100);
    tree.add(1);
    tree.add(50);
    expect(tree.preOrder()).toEqual([100, 1, 50]);
    tree = new BinarySearchTree(1);
    tree.add(50);
    tree.add(100);
    expect(tree.preOrder()).toEqual([1, 50, 100]);
  });

  it('🍕 Can return a collection from an inorder traversal 🍕', () => {
    tree.add(50);
    tree.add(1);
    tree.add(100);
    expect(tree.inOrder()).toEqual([1, 50, 100]);
    tree = new BinarySearchTree(100);
    tree.add(1);
    tree.add(50);
    expect(tree.inOrder()).toEqual([1, 50, 100]);
    tree = new BinarySearchTree(1);
    tree.add(50);
    tree.add(100);
    expect(tree.inOrder()).toEqual([1, 50, 100]);
  });

  it('🍗 Can return a collection from a postorder traversal 🍗', () => {
    tree.add(50);
    tree.add(1);
    tree.add(100);
    expect(tree.postOrder()).toEqual([1, 100, 50]);
    tree = new BinarySearchTree(100);
    tree.add(1);
    tree.add(50);
    expect(tree.postOrder()).toEqual([50, 1, 100]);
    tree = new BinarySearchTree(1);
    tree.add(50);
    tree.add(100);
    expect(tree.postOrder()).toEqual([100, 50, 1]);
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
  });
});

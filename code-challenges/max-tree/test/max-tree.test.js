'use-strict';

const MaxTree = require('../max-tree');

describe('MaxTree', () => {

  describe('findMaxValue', () => {
    let tree;

    beforeEach(() => {
      tree = new MaxTree();
    });

    it('Will return undefined if the tree is empty', () => {
      expect(tree.findMaxValue()).not.toBeDefined();
    });

    it('Will return the max value if the tree has a single node (which will be that nodes value)', () => {
      tree.add(100);
      expect(tree.findMaxValue()).toBe(100);
    });

    it('Will return the max value if the tree has many nodes', () => {
      tree.add(100);
      tree.add(101);
      expect(tree.findMaxValue()).toBe(101);
      tree.add(-15);
      tree.add(123);
      tree.add(120);
      expect(tree.findMaxValue()).toBe(123);
    });
  });
});

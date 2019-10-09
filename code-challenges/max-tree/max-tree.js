'use-strict';

const BinaryTree = require('../../tree/tree').BinaryTree;

class MaxTree extends BinaryTree {
  constructor(value) {
    super(value);
  }

  findMaxValue() {
    return this.reduce((max, node) => max < node.value ? node.value : max);
  }
}

module.exports = exports = MaxTree;

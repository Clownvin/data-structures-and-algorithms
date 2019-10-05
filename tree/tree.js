'use-strict';

class Node {
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
  }
}

function addRecursivelyToBT(value, node, maxDepth, depth = 0) {
  if (depth === maxDepth) {
    return false;
  }
  if (!node.left) {
    node.left = new Node(value);
    return true;
  } else if (addRecursivelyToBT(value, node.left, maxDepth, depth + 1)) {
    return true;
  }
  if (!node.right) {
    node.right = new Node(value);
    return true;
  } else if (addRecursivelyToBT(value, node.right, maxDepth, depth + 1)) {
    return true;
  }
  return false;
}

class BinaryTree {
  constructor(rootValue) {
    this.size = typeof rootValue !== 'undefined' ? 1 : 0;
    this.root = this.size ? new Node(rootValue) : null;
    this.height = this.size - 1;
  }

  full() {
    const topWidth = Math.pow(2, this.height);
    return topWidth + (topWidth - 1) === this.size;
  }

  add(value) {
    if (!this.root) {
      this.root = new Node(value);
    } else {
      const maxDepth = this.full() ? this.height + 1 : this.height;
      if (!addRecursivelyToBT(value, this.root, maxDepth)) {
        throw `Failed to add to BinaryTree, this should never happen`;
      }
      this.height = maxDepth;
    }
    this.size++;
  }

  inOrder(node = this.root, values = []) {
    if (!node) {
      return values;
    }
    this.inOrder(node.left, values);
    values.push(node.value);
    this.inOrder(node.right, values);
    return values;
  }

  preOrder(node = this.root, values = []) {
    if (!node) {
      return values;
    }
    values.push(node.value);
    this.preOrder(node.left, values);
    this.preOrder(node.right, values);
    return values;
  }

  postOrder(node = this.root, values = []) {
    if (!node) {
      return values;
    }
    this.postOrder(node.left, values);
    this.postOrder(node.right, values);
    values.push(node.value);
    return values;
  }
}

function addRecursivelyToBST(value, node, depth = 0) {
  if (node.value >= value) {
    if (!node.left) {
      node.left = new Node(value);
      return depth + 1;
    }
    return addRecursivelyToBST(value, node.left, depth + 1);
  }
  if (!node.right) {
    node.right = new Node(value);
    return depth + 1;
  }
  return addRecursivelyToBST(value, node.right, depth + 1);
}

class BinarySearchTree extends BinaryTree {
  constructor(rootValue) {
    super(rootValue);
  }

  add(value) {
    if (!this.root) {
      this.root = new Node(value);
      this.height++;
    } else {
      const heightAdded = addRecursivelyToBST(value, this.root);
      if (heightAdded > this.height) {
        this.height = heightAdded;
      }
    }
    this.size++;
  }

  contains(value, node = this.root) {
    if (!node) {
      return false;
    }
    if (node.value === value) {
      return true;
    }
    if (node.value > value) {
      return this.contains(value, node.left);
    }
    return this.contains(value, node.right);
  }
}

module.exports = exports = {BinaryTree, BinarySearchTree};

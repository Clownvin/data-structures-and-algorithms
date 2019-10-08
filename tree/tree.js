'use-strict';

function traverseLeft(thisNode, traversal, callback, depth, order, ...args) {
  let ret;
  for (const node of thisNode.leftChildren) {
    ret = node[traversal](callback, depth, order++, ...args) || ret;
    if (ret)
      break;
  }
  return ret;
}

function traverseRight(thisNode, traversal, callback, depth, order, ...args) {
  let ret;
  for (const node of thisNode.rightChildren) {
    ret = node[traversal](callback, depth, order++, ...args) || ret;
    if (ret)
      break;
  }
  return ret;
}

class Node {
  constructor(k, value) {
    this.k = k;
    this.value = value;
    this.leftChildren = [];
    this.rightChildren = [];
  }
  addLeft(node) {
    this.leftChildren.push(node);
  }
  addRight(node) {
    this.rightChildren.push(node);
  }
  full() {
    return (this.leftChildren.length + this.rightChildren.length) === this.k;
  }
  preOrder(callback, depth = 0, order = 0) {
    return callback(this, depth, order)
      || traverseLeft(this, 'preOrder', callback, depth + 1, order += 1)
      || traverseRight(this, 'preOrder', callback, depth + 1, order += this.leftChildren.length);
  }
  inOrder(callback, depth = 0, order = 0) {
    return traverseLeft(this, 'inOrder', callback, depth + 1, order)
      || callback(this, depth, order += this.leftChildren.length)
      || traverseRight(this, 'inOrder', callback, depth + 1, order += 1);
  }
  postOrder(callback, depth = 0, order = 0) {
    return traverseLeft(this, 'postOrder', callback, depth + 1, order)
      || traverseRight(this, 'postOrder', callback, depth + 1, order += this.leftChildren.length)
      || callback(this, depth, order += this.rightChildren.length);
  }
  breadthFirst(callback) {
    const children = [];
    children.push(this);
    let ret;
    while (children.length) {
      const child = children.shift();
      ret = callback(child);
      if (ret) {
        return ret;
      }
      children.push(...child.leftChildren);
      children.push(...child.rightChildren);
    }
  }
}

function calcSizeForDepth(k, depth) {
  if (depth <= 0) {
    return depth + 1;
  }
  return Math.pow(k, depth) + calcSizeForDepth(k, depth - 1);
}

class KaryTree {
  constructor(k, rootValue) {
    this.k = k;
    this.size = 0;
    this.root = null;
    this.height = -1;
    if (rootValue) {
      this.add(rootValue);
    }
  }

  perfect() {
    return calcSizeForDepth(this.k, this.height) === this.size;
  }

  add(value) {
    if (!this.root) {
      this.height += 1;
      this.root = new Node(this.k, value);
    } else if (this.perfect()) {
      this.height += 1;
      this.root.inOrder((node) => {
        node.addLeft(new Node(this.k, value));
        return true;
      });
    } else {
      this.root.inOrder((node, depth) => {
        if (depth > this.height - 1 || node.full()) {
          return;
        }
        if (node.leftChildren.length === node.rightChildren.length) {
          node.addLeft(new Node(this.k, value));
        } else {
          node.addRight(new Node(this.k, value));
        }
        return true;
      });
    }
    this.size++;
  }

  reduceOrdered(order, callback, acc) {
    if (!this.root) {
      return acc;
    }
    this.root[order]((...args) => {
      if (!acc) {
        acc = args[0];
      } else {
        acc = callback(acc, ...args);
      }
    });
    return acc;
  }

  reduce(callback, acc) {
    return this.reduceOrdered('inOrder', callback, acc);
  }

  forEachOrdered(order, callback) {
    if (!this.root) {
      return;
    }
    return this.root[order](callback);
  }

  forEach(callback) {
    return this.forEachOrdered('inOrder', callback);
  }

  mapOrdered(order, callback) {
    if (!this.root) {
      return [];
    }
    const arr = [];
    this.root[order]((...args) => {
      arr.push(callback(...args));
    });
    return arr;
  }

  map(callback) {
    return this.mapOrdered('inOrder', callback);
  }

  preOrder(callback) {
    if (callback) {
      return this.forEachOrdered('preOrder', callback);
    } else {
      return this.mapOrdered('preOrder', node => node.value);
    }
  }

  inOrder(callback) {
    if (callback) {
      return this.forEachOrdered('inOrder', callback);
    } else {
      return this.mapOrdered('inOrder', node => node.value);
    }
  }

  postOrder(callback) {
    if (callback) {
      return this.forEachOrdered('postOrder', callback);
    } else {
      return this.mapOrdered('postOrder', node => node.value);
    }
  }

  breadthFirst(callback) {
    if (callback) {
      return this.forEachOrdered('breadthFirst', callback);
    } else {
      return this.mapOrdered('breadthFirst', node => node.value);
    }
  }

  contains(value) {
    if (!this.root) {
      return false;
    }
    return this.inOrder(node => node.value === value);
  }
}

class BinaryTree extends KaryTree {
  constructor(rootValue) {
    super(2, rootValue);
  }
}

function addRecursivelyToBST(newNode, currNode, depth = 0) {
  if (currNode.value >= newNode.value) {
    if (!currNode.leftChildren.length) {
      currNode.addLeft(newNode);
      return depth + 1;
    }
    return addRecursivelyToBST(newNode, currNode.leftChildren[0], depth + 1);
  }
  if (!currNode.rightChildren.length) {
    currNode.addRight(newNode);
    return depth + 1;
  }
  return addRecursivelyToBST(newNode, currNode.rightChildren[0], depth + 1);
}

class BinarySearchTree extends BinaryTree {
  constructor(rootValue) {
    super(rootValue);
  }

  add(value) {
    const node = new Node(this.k, value);
    if (!this.root) {
      this.root = node;
      this.height++;
    } else {
      const heightAdded = addRecursivelyToBST(node, this.root);
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
      return this.contains(value, node.leftChildren[0] || null);
    }
    return this.contains(value, node.rightChildren[0] || null);
  }
}

module.exports = exports = { BinaryTree, BinarySearchTree, KaryTree };

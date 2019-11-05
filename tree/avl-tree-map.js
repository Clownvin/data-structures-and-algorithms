'use strict';

const {Stack} = require('../stacks-and-queues/stacks-and-queues');

function getTreeMap(compare) {

  class Node {
    constructor(key, value) {
      this.key = key;
      this.value = value;
      this.height = 1;
    }
  }

  function remove(start, key, retrieve = () => {}) {
    if (!start) throw `TreeMap does not contain key: ${key}`;
    if (start.key === key) {
      retrieve(start.value);
      if (!start.left) return start.right;
      if (!start.right) return start.left;

      const successor = findSuccessor(start.right);
      start.key = successor.key;
      start.value = successor.value;
      start.right = remove(start.right, successor.key);

    } else if (compare(key, start.key) <= 0) {
      start.left = remove(start.left, key, retrieve);
    } else {
      start.right = remove(start.right, key, retrieve);
    }

    start.height = Math.max(getHeight(start.right), getHeight(start.left)) + 1;
    return start;
  }

  function findSuccessor(start) {
    while (start.left) {
      start = start.left;
    }
    return start;
  }

  function getHeight(node) {
    return node ? node.height : 0;
  }

  function insert(start, key, value, onNew) {
    if (!start) {
      onNew();
      return new Node(key, value);
    }
    if (start.key === key) {
      start.value = value;
      return start;
    }
    if (compare(key, start.key) <= 0) {
      start.left = insert(start.left, key, value, onNew);
    } else {
      start.right = insert(start.right, key, value, onNew);
    }

    start.height = Math.max(getHeight(start.left), getHeight(start.right)) + 1;

    return balance(start, key);
  }

  function balance(start, key) {
    const balance = getBalance(start);
    if (balance > 1) {
      return balanceRight(start, key);
    } else if (balance < -1) {
      return balanceLeft(start, key);
    }
    return start;
  }

  function balanceRight(start, key) {
    if (compare(key, start.left.key) <= 0) {
      return rotateRight(start);
    }
    start.left = rotateLeft(start.left);
    return rotateRight(start);
  }

  function balanceLeft(start, key) {
    if (compare(key, start.right.key) > 0) {
      return rotateLeft(start);
    }
    start.right = rotateRight(start.right);
    return rotateLeft(start);
  }

  function rotateRight(start) {
    const left = start.left;
    const leftRight = left.right;

    left.right = start;
    start.left = leftRight;

    start.height = Math.max(getHeight(start.left), getHeight(start.right)) + 1;
    left.height = Math.max(getHeight(left.left), getHeight(left.right)) + 1;

    return left;
  }

  function rotateLeft(start) {
    const right = start.right;
    const rightLeft = right.left;

    right.left = start;
    start.right = rightLeft;

    start.height = Math.max(getHeight(start.left), getHeight(start.right)) + 1;
    right.height = Math.max(getHeight(right.left), getHeight(right.right)) + 1;

    return right;
  }

  function getBalance(start) {
    if (!start) return 0;
    return getHeight(start.left) - getHeight(start.right);
  }

  function contains(start, key) {
    if (!start) return false;
    if (start.key === key) return true;
    if (compare(key, start.key) <= 0)
      return contains(start.left, key);
    return contains(start.right, key);
  }

  function find(start, key) {
    if (!start) return;
    if (start.key === key) return start.value;
    if (compare(key, start.key) <= 0)
      return find(start.left, key);
    return find(start.right, key);
  }

  function preOrder(start, callback) {
    if (!start) return;
    callback(start.value, start.key);
    preOrder(start.left, callback);
    preOrder(start.right, callback);
  }

  function inOrder(start, callback) {
    if (!start) return;
    inOrder(start.left, callback);
    callback(start.value, start.key);
    inOrder(start.right, callback);
  }

  function postOrder(start, callback) {
    if (!start) return;
    postOrder(start.left, callback);
    postOrder(start.right, callback);
    callback(start.value, start.key);
  }


  class TreeMap {
    constructor(root) {
      this.root = root ? new Node(root) : root;
      this.size = root ? 1 : 0;
    }

    set(key, value) {
      this.root = insert(this.root, key, value, () => this.size++);
    }

    preOrder(callback) {
      preOrder(this.root, callback);
    }

    inOrder(callback) {
      inOrder(this.root, callback);
    }

    forEach(callback) {
      this.inOrder(callback);
    }

    postOrder(callback) {
      postOrder(this.root, callback);
    }

    has(key) {
      return contains(this.root, key);
    }

    get(key) {
      return find(this.root, key);
    }

    delete(key) {
      let ret;
      this.root = remove(this.root, key, val => ret = val);
      this.size--;
      return ret;
    }

    *[Symbol.iterator]() {
      let curr = this.root;
      const stack = new Stack();
      while (curr || stack.getSize() > 0) {
        while (curr) {
          stack.push(curr);
          curr = curr.left;
        }
        curr = stack.pop();
        yield [curr.key, curr.value];
        curr = curr.right;
      }
    }

    *keys() {
      let curr = this.root;
      const stack = new Stack();
      while (curr || stack.getSize() > 0) {
        while (curr) {
          stack.push(curr);
          curr = curr.left;
        }
        curr = stack.pop();
        yield curr.key;
        curr = curr.right;
      }
    }
  }

  return TreeMap;
}

module.exports = exports = getTreeMap;

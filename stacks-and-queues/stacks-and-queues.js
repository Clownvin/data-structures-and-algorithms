const LinkedList = require('../linked-lists/linked-list');

class Stack {
  constructor(...values) {
    this.list = new LinkedList(...values);
  }
  push(...values) {
    this.list.add(...values);
  }
  pop() {
    if (this.list.getSize() === 0) {
      throw `Cannot pop an empty stack`;
    }
    return this.list.pop();
  }
  peek() {
    if (this.list.getSize() === 0) {
      throw `Cannot peek an empty stack`;
    }
    return this.list.get(this.list.getSize() - 1);
  }
  toString() {
    return this.list.toString();
  }
  getSize() {
    return this.list.getSize();
  }
  toArray() {
    return this.list.toArray();
  }
}

class Queue {
  constructor(...values) {
    this.list = new LinkedList(...values);
  }
  enqueue(...values) {
    this.list.add(...values);
  }
  dequeue() {
    if (this.list.getSize() === 0) {
      throw `Cannot dequeue an empty queue`;
    }
    return this.list.shift();
  }
  peek() {
    if (this.list.getSize() === 0) {
      throw `Cannot peek an empty queue`;
    }
    return this.list.get(0);
  }
  toString() {
    return this.list.toString();
  }
  getSize() {
    return this.list.getSize();
  }
  toArray() {
    return this.list.toArray();
  }
}

module.exports = exports = { Stack, Queue };

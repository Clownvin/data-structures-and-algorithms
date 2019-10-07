const LinkedList = require('../linked-lists/linked-list');

class Stack {
  constructor(...values) {
    this.list = new LinkedList();
    this.list.unshift(...values);
    //Adding a top just because codefellows says to...
    this.top = this.list.head;
  }
  push(...values) {
    //For loop is to gaurantee correct order of adding to stack
    for (let i = 0; i < values.length; i++) {
      this.list.insert(values[i]);
    }
    this.top = this.list.head;
  }
  pop() {
    if (this.list.getSize() === 0) {
      throw `Cannot pop an empty stack`;
    }
    const popped = this.list.shift();
    this.top = this.list.head;
    return popped;
  }
  peek() {
    if (this.list.getSize() === 0) {
      throw `Cannot peek an empty stack`;
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

class Queue {
  constructor(...values) {
    this.list = new LinkedList(...values);
    //Adding a front simply because codefellows says to...
    this.front = this.list.head;
  }
  enqueue(...values) {
    this.list.add(...values);
  }
  dequeue() {
    if (this.list.getSize() === 0) {
      throw `Cannot dequeue an empty queue`;
    }
    const shifted = this.list.shift();
    this.front = this.list.head;
    return shifted;
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

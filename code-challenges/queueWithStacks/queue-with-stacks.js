const {Stack} = require('../../stacks-and-queues/stacks-and-queues');

class StackedQueue {
  constructor(...values) {
    this.mainStack = new Stack();
    this.secondaryStack = new Stack();
    this.enqueue(...values);
  }

  enqueue(...values) {
    while (this.mainStack.getSize()) {
      this.secondaryStack.push(this.mainStack.pop());
    }
    this.secondaryStack.push(...values);
    while (this.secondaryStack.getSize()) {
      this.mainStack.push(this.secondaryStack.pop());
    }
  }

  dequeue() {
    return this.mainStack.pop();
  }
  
  peek() {
    return this.mainStack.peek();
  }

  getSize() {
    return this.mainStack.getSize();
  }

  toString() {
    return this.mainStack.toString();
  }

  toArray() {
    return this.mainStack.toArray();
  }
}

module.exports = exports = StackedQueue;

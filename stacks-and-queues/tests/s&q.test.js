const {Stack, Queue} = require('../stacks-and-queues');

describe('Stack', () => {
  let stack;
  beforeEach(() => {
    stack = new Stack();
  });
  it('Can add to the top using push', () => {
    stack.push(1, 2, 3);
    expect(stack.toString()).toBe('[1, 2, 3]');
  });
  it('Can remove from the top using pop', () => {
    stack.push(1, 2, 3);
    expect(stack.pop()).toBe(3);
    expect(stack.pop()).toBe(2);
    expect(stack.pop()).toBe(1);
  });
  it('Can check the value at the top using peek', () => {
    stack.push(1, 2, 3);
    expect(stack.peek()).toBe(3);
  });
  it('Will throw an error if trying to peek/pop an empty stack', () => {
    expect(() => stack.peek()).toThrow('Cannot peek an empty stack');
    expect(() => stack.pop()).toThrow('Cannot pop an empty stack');
  });
});

describe('Queue', () => {
  let queue;
  beforeEach(() => {
    queue = new Queue();
  });
  it('Can add to the end using enqueue', () => {
    queue.enqueue(1, 2, 3);
    expect(queue.toString()).toBe('[1, 2, 3]');
  });
  it('Can remove from the front using dequeue', () => {
    queue.enqueue(1, 2, 3);
    expect(queue.dequeue()).toBe(1);
    expect(queue.dequeue()).toBe(2);
    expect(queue.dequeue()).toBe(3);
  });
  it('Can check the value at the front using peek', () => {
    queue.enqueue(1, 2, 3);
    expect(queue.peek()).toBe(1);
  });
  it('Will throw an error if trying to peek/dequeue an empty queue', () => {
    expect(() => queue.peek()).toThrow('Cannot peek an empty queue');
    expect(() => queue.dequeue()).toThrow('Cannot dequeue an empty queue');
  });
});

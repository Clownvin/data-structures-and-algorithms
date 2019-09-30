const Queue = require('../queue-with-stacks');

describe('Queue', () => {
  let queue;
  beforeEach(() => {
    queue = new Queue();
  });
  it('Can successfully enqueue into a queue', () => {
    queue.enqueue(1);
    expect(queue.toString()).toBe('[1]');
  });
  it('Can successfully enqueue multiple values into a queue', () => {
    queue.enqueue(1, 2, 3, 4, 5);
    expect(queue.toString()).toBe('[1, 2, 3, 4, 5]');
  });
  it('Can successfully dequeue out of a queue the expected value', () => {
    queue.enqueue(1, 2, 3, 4, 5);
    expect(queue.dequeue()).toBe(1);
    expect(queue.toString()).toBe('[2, 3, 4, 5]');
  });
  it('Can successfully peek into a queue, seeing the expected value', () => {
    queue.enqueue(1, 2, 3, 4, 5);
    expect(queue.peek()).toBe(1);
    expect(queue.toString()).toBe('[1, 2, 3, 4, 5]');
  });
  it('Can successfully empty a queue after multiple dequeues', () => {
    queue.enqueue(1, 2, 3, 4, 5);
    for (let i = 1; i <= 5; i++) {
      expect(queue.dequeue()).toBe(i);
    }
    expect(() => queue.dequeue()).toThrow();
  });
  it('Can successfully instantiate an empty queue', () => {
    expect(queue.getSize()).toBe(0);
    expect(queue.toString()).toBe('[]');
    expect(queue.toArray()).toEqual([]);
  });
});

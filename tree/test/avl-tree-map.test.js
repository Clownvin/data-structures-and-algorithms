'use strict';

const AVLTreeMap = require('../avl-tree-map')((a, b) => a - b);

describe('AVL Tree Map', () => {
  let map = new AVLTreeMap();

  it('Can add key/value pairs using add', () => {
    let inOrder = [];
    for (let i = 1; i < 1000; i++) {
      let val;
      while (!val || map.has(val)) {
        val = Math.ceil(Math.random() * 100000);
      }
      inOrder.push(val);
      map.set(val, val);
      let arr = [];
      map.inOrder(value => arr.push(value));
      expect(arr).toEqual(inOrder.sort((a, b) => Number(a) - Number(b)));
    }
    expect(map.size).toBe(999);
  });

  it('Can remove any key, returning the previously stored value', () => {
    let inOrder = [];
    map.inOrder((value, key) => inOrder.push({key, value}));
    
    while (inOrder.length) {
      const [node] = inOrder.splice(Math.floor(Math.random() * inOrder.length), 1);
      expect(map.has(node.key)).toBeTruthy();
      const removedVal = map.delete(node.key);
      expect(removedVal).toBe(node.value);
      //expect(map.has(node.key)).toBeFalsy();
    }
    expect(map.size).toBe(0);
  });

  it('Can iterate over values inOrder', () => {
    map = new AVLTreeMap();
    for (let i = 0; i < 10; i++) {
      map.set(i, i);
    }
    expect([...map]).toEqual([[0, 0], [1, 1], [2, 2], [3, 3], [4, 4], [5, 5], [6, 6], [7, 7], [8, 8], [9, 9]]);
  });

  it('Can get all keys using keys (returns iterator)', () => {
    map = new AVLTreeMap();
    for (let i = 0; i < 10; i++) {
      map.set(i, i);
    }
    expect([...map.keys()]).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });
});

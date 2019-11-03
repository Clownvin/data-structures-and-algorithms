'use strict';

const AVLTreeMap = require('../avl-tree-map')((a, b) => a - b);

describe('AVL Tree Map', () => {
  let map = new AVLTreeMap();

  it('Can add key/value pairs using add', () => {
    let inOrder = [];
    for (let i = 1; i < 1000; i++) {
      const val = Math.ceil(Math.random() * 1000);
      inOrder.push(val);
      map.add(val, val);
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
      const removedVal = map.remove(node.key);
      expect(removedVal).toBe(node.value);
      //expect(map.has(node.key)).toBeFalsy();
    }
    expect(map.size).toBe(0);
  });
});

'use strict';

const HashTable = require('../../hashtable/hashtable.js');

const getIntersections = (tree1, tree2) => {
  const map = tree1.reduce((map, node) => {map.put(node.value, true); return map;}, new HashTable());
  return tree2.reduce((arr, node) => {
    if (map.contains(node.value)) {
      map.remove(node.value);
      arr.push(node.value);
    }
    return arr;
  }, []);
};

module.exports = exports = getIntersections;

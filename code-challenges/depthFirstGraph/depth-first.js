'use strict';

module.exports = exports = (graph, start) => {
  let arr = [];
  graph.preOrder(start, vertex => {
    arr.push(vertex);
  });
  return arr;
};

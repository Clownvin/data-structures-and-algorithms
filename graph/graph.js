'use strict';

const { Queue } = require('../stacks-and-queues/stacks-and-queues');
const TreeMap = require('../tree/avl-tree-map')((a, b) => a.localeCompare(b));

function removeConnections(arrowsMap, vertex) {
  /* eslint-disable-next-line no-unused-vars */
  for (const [from, arrows] of arrowsMap) {
    arrows.delete(vertex);
  }
}

function defaultReducer(weight1, weight2) {
  if (typeof weight1 === 'undefined') {
    return weight1;
  }
  if (typeof weight2 === 'undefined') {
    return weight2;
  }
  if (weight1 === weight2) {
    return weight1;
  }
  throw (
    `Could not determine results from inequal weights.
You should specify a reducer function that takes in the weight of both arrows using getEdgeWeight(from, to, reducer)`
  );
}

class Graph {
  constructor() {
    this.arrows = new TreeMap();
  }

  add(vertex) {
    if (this.includes(vertex)) throw `Graph already contains vertex: ${vertex}`;
    this.arrows.set(vertex, new TreeMap());
  }

  addArrow(from, to, weight = 0) {
    if (!this.includes(from)) throw `Graph does not contain from vertex: ${from}`;
    if (!this.includes(to)) throw `Graph does not contain to vertex: ${to}`;
    this.arrows.get(from).set(to, weight);
  }

  addEdge(from, to, weight = 0) {
    this.addArrow(from, to, weight);
    this.addArrow(to, from, weight);
  }

  setArrowWeight(from, to, weight) {
    this.addArrow(from, to, weight);
  }

  setEdgeWeight(from, to, weight = 0) {
    this.setArrowWeight(from, to, weight);
    this.setArrowWeight(to, from, weight);
  }

  getArrowWeight(from, to) {
    const arrows = this.arrows.get(from);
    return arrows && arrows.get(to);
  }

  getEdgeWeight(from, to, reducer = defaultReducer) {
    return reducer(this.getArrowWeight(from, to), this.getArrowWeight(to, from));
  }

  removeArrow(from, to) {
    const arrows = this.arrows.get(from);
    arrows && arrows.delete(to);
  }

  removeEdge(from, to) {
    this.removeArrow(from, to);
    this.removeArrow(to, from);
  }

  hasArrow(from, to) {
    const arrows = this.arrows.get(from);
    return arrows && arrows.has(to);
  }

  hasEdge(from, to) {
    return this.hasArrow(from, to) && this.hasArrow(to, from);
  }

  remove(vertex) {
    this.arrows.delete(vertex);
    removeConnections(this.arrows, vertex);
  }

  getVertices() {
    return this.arrows.keys();
  }

  getSize() {
    return this.arrows.size;
  }

  includes(vertex) {
    return this.arrows.has(vertex);
  }

  getArrowsFrom(vertex) {
    const arrows = this.arrows.get(vertex);
    return arrows ? [...arrows] : arrows;
  }

  getArrowsTo(vertex) {
    const arr = [];
    this.arrows.forEach((arrows, from) => arrows.has(vertex) ? arr.push([from, arrows.get(vertex)]) : null);
    return arr;
  }

  breadthFirst(from, callback, stack = new Queue(), visited = new Set(from)) {
    if (!this.includes(from)) throw `Graph does not contain vertex: ${from}`;
    callback(from);
    for (const [to] of this.arrows.get(from)) {
      if (visited.has(to)) continue;
      visited.add(to);
      stack.enqueue(to);
    }
    if (stack.getSize() === 0) return;
    this.breadthFirst(stack.dequeue(), callback, stack, visited);
  }

  preOrder(from, callback, visited = new Set()) {
    if (!this.includes(from)) throw `Graph does not contain vertex: ${from}`;
    callback(from);
    visited.add(from);
    for (const [to] of this.arrows.get(from)) {
      if (visited.has(to)) continue;
      this.preOrder(to, callback, visited);
    }
  }

  postOrder(from, callback, visited = new Set()) {
    if (!this.includes(from)) throw `Graph does not contain vertex: ${from}`;
    visited.add(from);
    for (const [to] of this.arrows.get(from)) {
      if (visited.has(to)) continue;
      this.postOrder(to, callback, visited);
    }
    callback(from);
  }

}

module.exports = exports = Graph;

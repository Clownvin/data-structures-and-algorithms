'use strict';

const { Queue } = require('../stacks-and-queues/stacks-and-queues');

function removeConnections(arrowsMap, vertex) {
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
You should specify a reducer function that takes in the weight of both arrows using getEdgeWeight(start, end, reducer)`
  );
}

class Graph {
  constructor() {
    this.vertices = new Set();
    this.arrows = new Map();
  }

  add(vertex) {
    if (this.vertices.has(vertex)) throw `Graph already contains vertex: ${vertex}`;
    this.vertices.add(vertex);
    this.arrows.set(vertex, new Map());
  }

  addArrow(start, end, weight = 0) {
    if (!this.includes(start)) throw `Graph does not contain start vertex: ${start}`;
    if (!this.includes(end)) throw `Graph does not contain end vertex: ${end}`;
    this.arrows.get(start).set(end, weight);
  }

  addEdge(start, end, weight = 0) {
    this.addArrow(start, end, weight);
    this.addArrow(end, start, weight);
  }

  setArrowWeight(start, end, weight) {
    this.addArrow(start, end, weight);
  }

  setEdgeWeight(start, end, weight = 0) {
    this.setArrowWeight(start, end, weight);
    this.setArrowWeight(end, start, weight);
  }

  getArrowWeight(start, end) {
    const arrows = this.arrows.get(start);
    return arrows && arrows.get(end);
  }

  getEdgeWeight(start, end, reducer = defaultReducer) {
    return reducer(this.getArrowWeight(start, end), this.getArrowWeight(end, start));
  }

  removeArrow(start, end) {
    const arrows = this.arrows.get(start);
    arrows && arrows.delete(end);
  }

  removeEdge(start, end) {
    this.removeArrow(start, end);
    this.removeArrow(end, start);
  }

  hasArrow(start, end) {
    const arrows = this.arrows.get(start);
    return arrows && arrows.has(end);
  }

  hasEdge(start, end) {
    return this.hasArrow(start, end) && this.hasArrow(end, start);
  }

  remove(vertex) {
    this.vertices.delete(vertex);
    this.arrows.delete(vertex);
    removeConnections(this.arrows, vertex);
  }

  getVertices() {
    return this.vertices;
  }

  getSize() {
    return this.vertices.size;
  }

  includes(vertex) {
    return this.vertices.has(vertex);
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

  breadthFirst(start, callback, stack = new Queue(), visited = new Set(start)) {
    if (!this.includes(start)) throw `Graph does not contain vertex: ${start}`;
    console.log('Doing', start);
    callback(start);
    for (const [end] of this.arrows.get(start)) {
      if (visited.has(end)) continue;
      visited.add(end);
      console.log('Pushing', end);
      stack.enqueue(end);
    }
    if (stack.getSize() === 0) return;
    this.breadthFirst(stack.dequeue(), callback, stack, visited);
  }

  depthFirst(start, callback, visited = new Set()) {
    if (!this.includes(start)) throw `Graph does not contain vertex: ${start}`;
    visited.add(start);
    for (const [end] of this.arrows.get(start)) {
      if (visited.has(end)) continue;
      this.depthFirst(end, callback, visited);
    }
    callback(start);
  }

}

module.exports = exports = Graph;

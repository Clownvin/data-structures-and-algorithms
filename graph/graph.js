'use strict';

import { isModuleDeclaration } from "@babel/types";

/*
AddNode()
  Adds a new node to the graph
  Takes in the value of that node
  Returns the added node
AddEdge()
  Adds a new edge between two nodes in the graph
  Include the ability to have a “weight”
  Takes in the two nodes to be connected by the edge
  Both nodes should already be in the Graph
GetNodes()
  Returns all of the nodes in the graph as a collection (set, list, or similar)
GetNeighbors()
  Returns a collection of nodes connected to the given node
  Takes in a given node
  Include the weight of the connection in the returned collection
Size()
  Returns the total number of nodes in the graph
*/

function removeFromEdgeMap(edgeMap, vertex) {
  for (const edges of edgeMap) {
    edges.delete(vertex);
  }
}

class Graph {
  constructor() {
    this.vertices = new Set();
    this.edgeMap = new Map();
  }

  add(vertex) {
    this.vertices.add(vertex);
    this.edgeMap.set(vertex, new Map());
  }

  addEdge(start, end, weight = 0) {
    this.edgeMap.get(start).set(end, weight);
  }

  setWeight(start, end, weight) {
    this.addEdge(start, end, weight);
  }

  getWeight(start, end) {
    return this.edgeMap.get(start).get(end);
  }

  removeEdge(start, end) {
    this.edgeMap.get(start).delete(end);
  }

  adjacent(start, end) {
    return this.edgeMap.get(start).contains(end);
  }

  remove(vertex) {
    this.vertices.delete(vertex);
    this.edgeMap.delete(vertex);
    removeFromEdgeMap(this.edgeMap, vertex);
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

  getNeighbors(vertex) {
    return this.edgeMap.get(vertex).entries();
  }

}

module.exports = exports = Graph;
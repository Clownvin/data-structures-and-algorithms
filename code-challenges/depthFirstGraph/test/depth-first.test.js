'use strict';

const Graph = require('../../../graph/graph').createdOrderedGraphConstructor((a, b) => a.localeCompare(b));
const depthFirst = require('../depth-first');

describe('Depth-first', () => {
  const graph = new Graph();
  graph.add('A');
  graph.add('B');
  graph.add('C');
  graph.add('D');
  graph.add('E');
  graph.add('F');
  graph.add('G');
  graph.add('H');
  graph.addEdge('A', 'B');
  graph.addEdge('A', 'D');
  graph.addEdge('B', 'D');
  graph.addEdge('B', 'C');
  graph.addEdge('C', 'G');
  graph.addEdge('D', 'E');
  graph.addEdge('D', 'H');
  graph.addEdge('D', 'F');
  graph.addEdge('H', 'F');

  it('Will throw an error if start vertex is not in graph', () => {
    expect(() => depthFirst(graph, 'I')).toThrow();
  });

  it('Will return all the vertices that can be travered to from the start node in pre-order', () => {
    expect(depthFirst(graph, 'A')).toEqual(['A', 'B', 'C', 'G', 'D', 'E', 'F', 'H']);
    expect(depthFirst(graph, 'B')).toEqual(['B', 'A', 'D', 'E', 'F', 'H', 'C', 'G']);
    expect(depthFirst(graph, 'E')).toEqual(['E', 'D', 'A', 'B', 'C', 'G', 'F', 'H']);
  });
});

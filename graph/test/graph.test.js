'use strict';

const Graph = require('../graph');

describe('Graph', () => {
  let graph = new Graph();

  it('Can add vertices (nodes) with add(vertex)', () => {
    expect(graph.includes('a')).toBeFalsy();
    graph.add('a');
    expect(graph.includes('a')).toBeTruthy();
  });

  it('add will throw an error if the graph already contains the vertex', () => {
    expect(() => graph.add('a')).toThrow(`Graph already contains vertex: a`);
  });

  it('Can check if a vertex exists using includes(vertex)', () => {
    expect(graph.includes('a')).toBeTruthy();
    expect(graph.includes('b')).toBeFalsy();
  });

  it('getArrowsFrom(vertex) will return an empty array if vertex does not exist', () => {
    expect(graph.getArrowsFrom('a')).toEqual([]);
  });

  it('getArrowWeight(start, end) will return undefined if there is no arrow from start to end', () => {
    expect(graph.getArrowWeight('a', 'c')).toBe(undefined);
  });

  it('can add arrows (only the start vertex points to end vertex) with addArrow(start, end)', () => {
    graph.add('b');
    graph.addArrow('a', 'b');
    expect(graph.hasArrow('a', 'b')).toBeTruthy();
  });

  it('can check if arrow exists between two vertices using hasArrow(start, end)', () => {
    expect(graph.hasArrow('a', 'b')).toBeTruthy();
    expect(graph.hasArrow('b', 'a')).toBeFalsy();
  });

  it('getArrowsFrom(vertex) will return an array of [endVertex, weight] if some exist', () => {
    expect(graph.getArrowsFrom('a')).toEqual([['b', 0]]);
  });

  it('getArrowsTo(vertex) will return an empty array if no vertex has an arrow to it', () => {
    expect(graph.getArrowsTo('a')).toEqual([]);
  });

  it('getEdgeWeight will return undefined if the weight of either arrow is undefined', () => {
    expect(graph.getEdgeWeight('a', 'b')).toBe(undefined);
    expect(graph.getEdgeWeight('b', 'a')).toBe(undefined);
  })

  it('can add edges (start and end point at eachother) with addEdge(start, end)', () => {
    graph.addEdge('a', 'b');
    expect(graph.hasEdge('a', 'b')).toBeTruthy();
  });

  it('getArrowsTo(vertex) will return array of [startVertex, weight] if some exist', () => {
    expect(graph.getArrowsTo('a')).toEqual([['b', 0]]);
  });

  it('can check if an edge exists between two vertices using hasEdge(start, end)', () => {
    expect(graph.hasEdge('a', 'b')).toBeTruthy();
    expect(graph.hasEdge('a', 'c')).toBeFalsy();
  });

  it('edges and arrows have an initial weight of 0', () => {
    expect(graph.getArrowWeight('a', 'b')).toBe(0);
    expect(graph.getEdgeWeight('a', 'b')).toBe(0);
  });

  it('can set the weight of an "arrow" with setArrowWeight(start, end, weight)', () => {
    graph.setArrowWeight('a', 'b', 1);
    expect(graph.getArrowWeight('a', 'b')).toBe(1);
    expect(graph.getArrowWeight('b', 'a')).toBe(0);
  });

  it('can set the weight of an "edge" with setEdgeWeight(start, end, weight)', () => {
    graph.setEdgeWeight('a', 'b', 1);
    expect(graph.getEdgeWeight('b', 'a')).toBe(1);
  });

  it('can remove an "arrow" using removeArrow(start, end)', () => {
    expect(graph.getEdgeWeight('b', 'a')).toBe(1);
    expect(graph.hasEdge('b', 'a')).toBeTruthy();
    graph.removeArrow('b', 'a');
    expect(graph.getArrowWeight('a', 'b')).toBe(1);
    expect(graph.getArrowWeight('b', 'a')).toBe(undefined);
    expect(graph.getEdgeWeight('b', 'a')).toBe(undefined);
    expect(graph.hasArrow('a', 'b')).toBeTruthy();
    expect(graph.hasArrow('b', 'a')).toBeFalsy();
    expect(graph.hasEdge('b', 'a')).toBeFalsy();
  });

  it('can remove an "edge" using removeEdge(start, end)', () => {
    graph.addEdge('a', 'b', 1);
    expect(graph.getEdgeWeight('a', 'b')).toBe(1);
    expect(graph.hasEdge('a', 'b')).toBeTruthy();
    graph.removeEdge('b', 'a');
    expect(graph.getArrowWeight('a', 'b')).toBe(undefined);
    expect(graph.getArrowWeight('b', 'a')).toBe(undefined);
    expect(graph.getEdgeWeight('b', 'a')).toBe(undefined);
    expect(graph.hasArrow('a', 'b')).toBeFalsy();
    expect(graph.hasArrow('b', 'a')).toBeFalsy();
    expect(graph.hasEdge('b', 'a')).toBeFalsy();
  });

  it('Can remove a vertex using remove(vertex). This will remove all arrows and edges associated with this vertex', () => {
    graph.addEdge('a', 'b', 1);
    expect(graph.getEdgeWeight('a', 'b')).toBe(1);
    expect(graph.hasEdge('a', 'b')).toBeTruthy();
    graph.remove('b');
    expect(graph.getArrowWeight('a', 'b')).toBe(undefined);
    expect(graph.getArrowWeight('b', 'a')).toBe(undefined);
    expect(graph.getEdgeWeight('b', 'a')).toBe(undefined);
    expect(graph.hasArrow('a', 'b')).toBeFalsy();
    expect(graph.hasArrow('b', 'a')).toBeFalsy();
    expect(graph.hasEdge('b', 'a')).toBeFalsy();
  });

  it('addArrow (and subsequently addEdge, setArrowWeight, and setEdgeWeight) will throw an error if either vertex was previously not added', () => {
    expect(graph.includes('b')).toBeFalsy();
    expect(() => graph.addArrow('a', 'b', 1)).toThrow();
    expect(() => graph.addArrow('b', 'a', 1)).toThrow();
  });

  it('Will throw an exception when doing getEdgeWeight() if they are not equal or one of them is not undefined', () => {
    graph.add('b');
    graph.addArrow('b', 'a', 0);
    graph.addArrow('a', 'b', 1);
    expect(() => graph.getEdgeWeight('b', 'a')).toThrow();
  });

  it('getVertices() will return a Set of all vertices in the graph', () => {
    const verts = new Set();
    verts.add('a');
    verts.add('b');
    expect(graph.getVertices()).toStrictEqual(verts);
  });

  it('getSize() will return the size of the graph (number of vertices)', () => {
    expect(graph.getSize()).toBe(2);
  });
});

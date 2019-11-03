'use strict';

const Graph = require('../graph');

const {emojify} = require('../../randomojis/randomojis');

describe('Graph', () => {
  let graph = new Graph();

  it(emojify('Can add vertices (nodes) with add(vertex)'), () => {
    expect(graph.includes('a')).toBeFalsy();
    graph.add('a');
    expect(graph.includes('a')).toBeTruthy();
  });

  it(emojify('add will throw an error if the graph already contains the vertex'), () => {
    expect(() => graph.add('a')).toThrow(`Graph already contains vertex: a`);
  });

  it(emojify('Can check if a vertex exists using includes(vertex)'), () => {
    expect(graph.includes('a')).toBeTruthy();
    expect(graph.includes('b')).toBeFalsy();
  });

  it(emojify('getArrowsFrom(vertex) will return an empty array if vertex does not exist'), () => {
    expect(graph.getArrowsFrom('a')).toEqual([]);
  });

  it(emojify('getArrowWeight(start, end) will return undefined if there is no arrow from start to end'), () => {
    expect(graph.getArrowWeight('a', 'c')).toBe(undefined);
  });

  it(emojify('can add arrows (only the start vertex points to end vertex) with addArrow(start, end)'), () => {
    graph.add('b');
    graph.addArrow('a', 'b');
    expect(graph.hasArrow('a', 'b')).toBeTruthy();
  });

  it(emojify('can check if arrow exists between two vertices using hasArrow(start, end)'), () => {
    expect(graph.hasArrow('a', 'b')).toBeTruthy();
    expect(graph.hasArrow('b', 'a')).toBeFalsy();
  });

  it(emojify('getArrowsFrom(vertex) will return an array of [endVertex, weight] if some exist'), () => {
    expect(graph.getArrowsFrom('a')).toEqual([['b', 0]]);
  });

  it(emojify('getArrowsTo(vertex) will return an empty array if no vertex has an arrow to it'), () => {
    expect(graph.getArrowsTo('a')).toEqual([]);
  });

  it(emojify('getEdgeWeight will return undefined if the weight of either arrow is undefined'), () => {
    expect(graph.getEdgeWeight('a', 'b')).toBe(undefined);
    expect(graph.getEdgeWeight('b', 'a')).toBe(undefined);
  });

  it(emojify('can add edges (start and end point at eachother) with addEdge(start, end)'), () => {
    if (!graph.includes('a')) graph.add('a');
    if (!graph.includes('b')) graph.add('b');
    graph.addEdge('a', 'b');
    expect(graph.hasEdge('a', 'b')).toBeTruthy();
  });

  it(emojify('getArrowsTo(vertex) will return array of [startVertex, weight] if some exist'), () => {
    expect(graph.getArrowsTo('a')).toEqual([['b', 0]]);
  });

  it(emojify('can check if an edge exists between two vertices using hasEdge(start, end)'), () => {
    expect(graph.hasEdge('a', 'b')).toBeTruthy();
    expect(graph.hasEdge('a', 'c')).toBeFalsy();
  });

  it(emojify('edges and arrows have an initial weight of 0'), () => {
    expect(graph.getArrowWeight('a', 'b')).toBe(0);
    expect(graph.getEdgeWeight('a', 'b')).toBe(0);
  });

  it(emojify('can set the weight of an "arrow" with setArrowWeight(start, end, weight)'), () => {
    graph.setArrowWeight('a', 'b', 1);
    expect(graph.getArrowWeight('a', 'b')).toBe(1);
    expect(graph.getArrowWeight('b', 'a')).toBe(0);
  });

  it(emojify('can set the weight of an "edge" with setEdgeWeight(start, end, weight)'), () => {
    graph.setEdgeWeight('a', 'b', 1);
    expect(graph.getEdgeWeight('b', 'a')).toBe(1);
  });

  it(emojify('can remove an "arrow" using removeArrow(start, end)'), () => {
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

  it(emojify('can remove an "edge" using removeEdge(start, end)'), () => {
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

  it(emojify('Can remove a vertex using remove(vertex). This will remove all arrows and edges associated with this vertex'), () => {
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

  it(emojify('addArrow (and subsequently addEdge, setArrowWeight, and setEdgeWeight) will throw an error if either vertex was previously not added'), () => {
    expect(graph.includes('b')).toBeFalsy();
    expect(() => graph.addArrow('a', 'b', 1)).toThrow();
    expect(() => graph.addArrow('b', 'a', 1)).toThrow();
  });

  it(emojify('Will throw an exception when doing getEdgeWeight() if they are not equal or one of them is not undefined'), () => {
    graph.add('b');
    graph.addArrow('b', 'a', 0);
    graph.addArrow('a', 'b', 1);
    expect(() => graph.getEdgeWeight('b', 'a')).toThrow();
  });

  it(emojify('getVertices() will return a Set of all vertices in the graph'), () => {
    const verts = new Set();
    verts.add('a');
    verts.add('b');
    expect(graph.getVertices()).toStrictEqual(verts);
  });

  it(emojify('getSize() will return the size of the graph (number of vertices)'), () => {
    expect(graph.getSize()).toBe(2);
  });

  it(emojify('breadthFirst() will invoke a callback for each vertex, breadth first starting at a start vertex'), () => {
    graph = new Graph();
    /*
    Breadth-First: A B C D E F
    Pre-Order: A B D E F C
    Post-Order: D F E C B A

    a-c
    |/
    b-e-f
    |
    d
    */
    graph.add('a');
    graph.add('b');
    graph.add('c');
    graph.add('d');
    graph.add('e');
    graph.add('f');
    graph.addEdge('a', 'b');
    graph.addEdge('a', 'c');
    graph.addEdge('b', 'd');
    graph.addEdge('b', 'e');
    graph.addEdge('b', 'c');
    graph.addEdge('e', 'f');
    let arr = [];
    graph.breadthFirst('a', val => arr.push(val));
    expect(arr).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
  });

  it(emojify('preOrder() will invoke a callback for each vertex, pre order starting at a start vertex'), () => {
    let arr = [];
    graph.preOrder('a', val => arr.push(val));
    expect(arr).toEqual(['a', 'b', 'c', 'd', 'e', 'f']);
  });

  it(emojify('postOrder() will invoke a callback for each vertex, post order starting at a start vertex'), () => {
    let arr = [];
    graph.postOrder('a', val => arr.push(val));
    expect(arr).toEqual(['c', 'd', 'f', 'e', 'b', 'a']);
  });
});

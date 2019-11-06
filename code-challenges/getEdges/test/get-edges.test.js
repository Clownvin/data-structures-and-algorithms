'use strict';

const {Graph} = require('../../../graph/graph');
const getEdges = require('../get-edges');

describe('getEdges', () => {
  const graph = new Graph();
  graph.add('Pandora');
  graph.add('Arendelle');
  graph.add('Metroville');
  graph.add('New Monstropolis');
  graph.add('Narnia');
  graph.add('Naboo');
  graph.addEdge('Pandora', 'Arendelle', 150);
  graph.addEdge('Pandora', 'Metroville', 82);
  graph.addEdge('Arendelle', 'Metroville', 99);
  graph.addEdge('Arendelle', 'New Monstropolis', 42);
  graph.addEdge('Metroville', 'New Monstropolis', 105);
  graph.addEdge('Metroville', 'Naboo', 26);
  graph.addEdge('Metroville', 'Narnia', 37);
  graph.addEdge('New Monstropolis', 'Naboo', 73);
  graph.addEdge('Narnia', 'Naboo', 250);

  it('Will return false if there is no direct path from a start to an end', () => {
    expect(getEdges(graph, ['Pandora', 'Narnia'])).toBeFalsy();
    expect(getEdges(graph, ['Narnia', 'New Montropolis'])).toBeFalsy();
    expect(getEdges(graph, ['Pandora', 'Metroville', 'Arendelle', 'Naboo'])).toBeFalsy();
  });

  it('Will return the combined weight of all edge weights if a direct path from each node to the next node exists', () => {
    expect(getEdges(graph, ['Pandora', 'Arendelle'])).toBe(150);
    expect(getEdges(graph, ['Narnia', 'Metroville', 'Naboo', 'New Monstropolis'])).toBe(37 + 26 + 73);
    expect(getEdges(graph, ['Pandora', 'Metroville', 'Arendelle', 'Metroville'])).toBe(82 + 99 + 99);
  });

  it('Will throw an error if only one city is provided', () => {
    expect(() => getEdges(graph, ['Pandora'])).toThrow();
  });
});

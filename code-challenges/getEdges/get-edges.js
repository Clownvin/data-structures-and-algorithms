'use strict';

module.exports = exports = (graph, cities) => {
  if (cities.length < 2) throw `Cities array must contain more than one city.`;
  let start = cities[0];
  let totalCost = 0;
  for(let i = 1; i < cities.length; i++) {
    if (!graph.hasArrow(start, cities[i])) return false;
    totalCost += graph.getArrowWeight(start, cities[i]);
    start = cities[i];
  }
  return totalCost;
};

# Graph
A graph implementation, with arrows (omni-directional), edges (bi-directional) and weights.

## Challenge
Implement your own Graph. The graph should be represented as an adjacency list, and should include the following methods:

### AddNode()
* Adds a new node to the graph
* Takes in the value of that node
* Returns the added node
### AddEdge()
* Adds a new edge between two nodes in the graph
* Include the ability to have a “weight”
* Takes in the two nodes to be connected by the edge
* Both nodes should already be in the Graph
### GetNodes()
* Returns all of the nodes in the graph as a collection (set, list, or similar)
### GetNeighbors()
* Returns a collection of nodes connected to the given node
* Takes in a given node
* Include the weight of the connection in the returned collection
### Size()
* Returns the total number of nodes in the graph

## Approach & Efficiency
This Graph uses a map of arrays, which represents the adjacencies, and a set of vertices which represents all the vertices in the Graph. For efficiency, the graph has a time complexity of O(1) for almost all methods, except remove(vertex), getArrowsFrom/To(vertex), and the traversals, which are all O(n).

## API
### add(vertex)
Adds a vertex to the graph
### addArrow(start, end[, weight])
Adds an arrow from start to end
### addEdge(start, end[, weight])
Adds an edge between start and end (they both get arrows)
### setArrowWeight(start, end, weight)
Invokes addArrow(start, end, weight)
### setEdgeWeight(start, end, weight)
Invokes addEdge(start, end, weight);
### getArrowWeight(start, end)
Returns the weight of the arrow from start to end, or undefined otherwise
### getEdgeWeight(start, end[, reducer])
Returns the shared weight between the two, or calls the reducer
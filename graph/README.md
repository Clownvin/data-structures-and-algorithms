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
Returns the shared weight between the two by calling the reducer, which by default will return the value if it's equal for both, or throw an error since there's no good way how to handle that situation without further input from the caller.
### removeArrow(start, end) 
Will remove an arrow that starts at start and ends at end.
### removeEdge(start, end)
Will remove both arrows from start and end
### hasArrow(start, end)
Will return true if an arrow from start to end exists, false otherwise
### hasEdge(start, end)
Will return true if both vertices have an arrow pointing to eachother, false otherwise
### remove(vertex)
Will remove the vertex from the graph, and all arrows that pointed to it will be deleted
### getVertices()
Will return a Set of all the vertices in the graph
### getSize()
Will return the count of vertices in the graph
### includes(vertex)
Will return true if the vertex exists in this graph, false otherwise
### getArrowsFrom(vertex)
Will return all the arrows that come from that vertex, or undefined if there is no vertex
### getArrowsTo(vertex)
Will return all the arrows that go to that vertex, or an empty array otherwise.
### breadthFirst(start, callback)
Will start at the start vertex, and call the callback for all reachable nodes in breadth first order
### depthFirst(start, callback)
Will start at the start vertex, and call the callback for all reachable nodes in depth first order
# Depth-First Graph Traversal
It's a function that uses my Graph's preOrder traversal method to compile an array of the nodes visited by the traversal function in pre-order.

## Approach & Efficiency
Since I already had made a preOrder traversal method which accepts a callback, it was rather easy to just use this callback to create the array. The method works in O(n) time.

## API
### depthFirst(graph, start)
Takes in a graph, and a start vertex, and creates an array of the visited vertices in pre-order. Throws an error if the start vertex is not contained in the graph.

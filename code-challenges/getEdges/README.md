# Get Edges
It's a function that takes in a graph and an array of vertices, and returns the total of the edges between the vertices in the order presented in the array. If any of the edges are missing, it will return false. If there is one or less vertices in the array, it will throw an error.

## Challenge
* Write a function based on the specifications above, which takes in a graph, and an array of city names. Without utilizing any of the built-in methods available to your language, return whether the full trip is possible with direct flights, and how much it would cost.

## Approach & Efficiency
First, it checks that the array contains more than one element. Then, starting with the first node, it tallys the weights between the nodes. If at any point there is no arrow between a set of nodes, it will return false. Otherwise, it will return the total "cost" at the very end.

## API
### getEdges(graph, [...vertices])
It tallys the weights between a set of edges. getEdges is a terrible name for this function just so you know, code fellows.
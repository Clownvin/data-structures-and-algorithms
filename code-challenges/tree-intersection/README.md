# Tree-Intersection
A single method that will take two trees, and return a set of elements that are present in both trees.

## Challenge
* Write a function called tree_intersection that takes two binary tree parameters.
* Without utilizing any of the built-in library methods available to your language, return a set of values found in both trees.

## Approach & Efficiency
* treeIntersection - Adds all the elements from tree 1 into a hashtable, then, for each element in tree 2 that is present in the hashtable, add it to an array. Return the array at the end.


## API
* treeIntersection(tree1, tree2) - Returns an array of all the values present in both trees.
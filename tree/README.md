# Tree
A binary tree implementation (tree with only 2 branches per node), and a binary search tree implementation (binary tree, with the left branch nodes being less than the root, and the right side nodes being greater than the root, recursively)

## Challenge
Create a Node class that has properties for the value stored in the node, the left child node, and the right child node.  
Create a BinaryTree class  
Define a method for each of the depth first traversals called preOrder, inOrder, and postOrder which returns an array of the values, ordered appropriately.  
Any exceptions or errors that come from your code should be semantic, capturable errors. For example, rather than a default error thrown by your language, your code should raise/throw a custom, semantic error that describes what went wrong in calling the methods you wrote for this lab.  

Create a BinarySearchTree class  
Define a method named add that accepts a value, and adds a new node with that value in the correct location in the binary search tree.  
Define a method named contains that accepts a value, and returns a boolean indicating whether or not the value is in the tree at least once.  

## Approach & Efficiency
I made a Node class with a value, right and left.  
I made a BinaryTree class which has a root (which starts null), a size (how many nodes are in the tree) and a height (how "tall" is the tree)
I then made a BinarySearchTree which extends BinaryTree  

## API
### KaryTree
* add(value) - Adds the value to the next unfilled leaf on the current height, or adds it to the left and increases height if tree is perfect.
* contains(value) - Checks if a value is in the tree.
* inOrder([, callback]) - Invokes the callback for each value in "inOrder" order, or returns an array of the values in the tree using an inOrder traversal if no callback given.
* preOrder([, callback]) - Invokes the callback for each value in "preOrder" order, or returns an array of the values in the tree using an inOrder traversal if no callback given.
* postOrder([, callback]) - Invokes the callback for each value in "postOrder" order, or returns an array of the values in the tree using an inOrder traversal if no callback given.
* breadthFirst([, callback]) - Invokes the callback for each value in "breadthFirst" order, or returns an array of the values in the tree using a breadthFirst traversal if no callback given.

### BinaryTree
A KaryTree with a max node children of 2

### BinarySearchTree
* add - Adds a value to the tree by traversing the nodes, going left if the value is less than or equal to the node, or right if greater.
* contains - Checks if a value is in the tree.

## UML/Diagrams
![alt text](https://i.imgur.com/qGw8v4Q.jpg "Diagram from when testing tree height and width relationships")
![alt text](https://i.imgur.com/64Q4Cp8.jpg "Diagram from breadthFirst")
# Stack and Queue
A Stack and Queue, implemented using a LinkedList.

## Challenge
Create a Stack class that has a top property. It creates an empty Stack when instantiated.
* This object should be aware of a default empty value assigned to top when the stack is created.
* Define a method called push which takes any value as an argument and adds a new node with that value to the top of the stack with an O(1) Time performance.
* Define a method called pop that does not take any argument, removes the node from the top of the stack, and returns the node’s value.
* Define a method called peek that does not take an argument and returns the value of the node located on top of the stack, without removing it from the stack.

Create a Queue class that has a front property. It creates an empty Queue when instantiated.
* This object should be aware of a default empty value assigned to front when the queue is created.
* Define a method called enqueue which takes any value as an argument and adds a new node with that value to the back of the queue with an O(1) Time performance.
* Define a method called dequeue that does not take any argument, removes the node from the front of the queue, and returns the node’s value.
* Define a method called peek that does not take an argument and returns the value of the node located in the front of the queue, without removing it from the queue.  

At no time should an exception or stack trace be shown to the end user. Catch and handle any such exceptions and return a printed value or operation which cleanly represents the state and either stops execution cleanly, or provides the user with clear direction and output.  
Be sure to follow your languages best practices for naming conventions.  
You have access to the Node class and all the properties on the Linked List class.

## Approach & Efficiency
I wrote a Stack and Queue class, both with an underlying linked list. Since I used a linked list that had a tail pointer already, it was extremely easy to implement both collections, and to meet the O(1) time requirement for push/enqueue. The queue already has O(1) for push/pop (since add to tail, remove from head are O(1) for a linked list anyway (if it has a tail)). In order to get contant time remove and add for Stacks, I opted to insert values at the head, instead of pushing to the tail, that way adding and removing both become constant time (since they both operate on the head now).

## API
### Stack
#### constructor(...values)
Creates a new Stack, taking in any number of values, and inserting them in the order they were passed in (last value will be the top of stack)
#### push(...values)
Takes any number of values, and inserts them in the order they were passed in (last value will be the top of stack)
#### pop()
Pops the top of the stack off, and returns it (this modifies the stack)
#### peek()
Returns the value of the top of the stack (does not modify stack)
#### toString()
Simply calls LinkedList.toString() for the underlying list
#### getSize()
Returns the size of the stack
#### toArray()
Simply calls LinkedList.toArray() for the underlying list

### Queue
#### constructor(...values)
Creates a new Queue, taking in any number of values, and adding them in the order they were passed in (last value will be at the end of the queue)
#### enqueue(...values)
Takes in any number of values, and adds them in the order they were passed in (last value will be at the end of the queue)
#### dequeue()
Removes and returns the value at the front of the queue (this modifies the queue)
#### peek()
Returns the value at the front of the queue (does not modifiy queue)
#### toString()
Simply calls LinkedList.toString() for the underlying list
#### getSize()
Returns the size of the queue
#### toArray()
Simply calls LinkedList.toString() for the underlying list
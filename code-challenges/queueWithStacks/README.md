# Queue with Stacks
It's a queue that uses two stacks underneath to manage state.

## Approach & Efficiency
Wrote a basic stack interface (enqueue, dequeue, peek), instantiated two Stacks, a mainStack and a secondaryStack.

For enqueue:  
  push all of mainStack into secondaryStack,  
  push new values onto secondary stack,  
  push all of secondaryStack into mainStack  
For dequeue:  
  simply return mainStack.pop
For peek:  
  simply return mainStack.peek

## API
### enqueue(...values)
Adds all the values to the queue

### dequeue()
Removes and returns the front of the queue

### peek()
Returns the value of the front of the queue


# Singly Linked List
It's a singly linked list that supports the typical collections interface.

## Challenge
Make a linked list.

## Approach & Efficiency
I made a linked list. I named my "Node" class "Link", as I think that's more intuitive for a linked list. You don't called it a Noded list, do you?

The time complexity for most operations is as follows:
add: O(1)
remove (from head or tail): O(1)
remove (from inside): O(n)
insert (at head or tail): O(1)
insert (inside): O(n)
set (tail or head): O(1)
set (inside): O(n)
get: O(n)

## API
### getSize()
Returns the current size of the list.
### get(index)
Returns the value at the index, or throws an error if index is outside the range of the list.
### add(value)
Adds the value to the end of the list.
### clear()
Removes everything from the list. (Actually just sets the head and tail to null, and size to 0)
### forEach(callback(value, index, list))
Invokes the callback for each value in the list.
### map(callback(value, index, list))
Creates an array with the values returned from invoking the callback for each value in the list.
### filter(callback(value, index, list))
Creates an array with the values from invoking the callback which return true.
### reduce(callback(accumulator, value, index, list), accumulator)
Produces a value from invoking the callback for each value in the list.
### toString()
Produces a string in the format [n, n2, n3,...nN] for this list.
### includes(object)
Returns true if the object is a member of this list, or false otherwise.
### insert(value, index = 0)
Inserts a value at the specified index, or throws an error if index is outside the range of the list.
### set(index, value)
Sets a value at the specified index, or throws an error if index is outside the range of the list.
### remove(index = this.getSize() - 1)
Removes a value from the index specified (or the tail if not specified) and returns that value, or throws an error if index is outside the range of the list.


# Doubly Linked List
It's a doubly linked list that supports the typical collections interface.

## Challenge
Make a doubly linked list.

## Approach & Efficiency
I made a doubly linked list. I named my "Node" class "Link", as I think that's more intuitive for a linked list. You don't called it a Noded list, do you?

The time complexity for most operations is as follows:
add: O(1)
remove (best case): O(1)
remove (worst case): O(n/2)
insert (best case): O(1)
insert (worst case): O(n/2)
set (best case): O(1)
set (worst case): O(n/2)
get (best case): O(1)
get (worst case): O(n/2)

## API
### getSize()
Returns the current size of the list.
### get(index)
Returns the value at the index, or throws an error if index is outside the range of the list.
### add(value)
Adds the value to the end of the list.
### clear()
Removes everything from the list. (Actually just sets the head and tail to null, and size to 0)
### forEach(callback(value, index, list))
Invokes the callback for each value in the list.
### map(callback(value, index, list))
Creates an array with the values returned from invoking the callback for each value in the list.
### filter(callback(value, index, list))
Creates an array with the values from invoking the callback which return true.
### reduce(callback(accumulator, value, index, list), accumulator)
Produces a value from invoking the callback for each value in the list.
### toString()
Produces a string in the format [n, n2, n3,...nN] for this list.
### includes(object)
Returns true if the object is a member of this list, or false otherwise.
### insert(value, index = 0)
Inserts a value at the specified index, or throws an error if index is outside the range of the list.
### set(index, value)
Sets a value at the specified index, or throws an error if index is outside the range of the list.
### remove(index = this.getSize() - 1)
Removes a value from the index specified (or the tail if not specified) and returns that value, or throws an error if index is outside the range of the list.


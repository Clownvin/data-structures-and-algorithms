# mergeLists
It's a single function that merges two linked lists, in a "zipper" fashion ([1, 2], [3, 4] => [1, 3, 2, 4])

## Approach & Efficiency
Wrote a function that accepts two linked lists.
Create four variables:
* a new "head" to refer to the head of the new list.
* a "merged" which referes to the current location in the new list.
* a curr1 and curr2, which both start out as the heads of their respective lists.

While curr1 or curr2 is not null:
* if curr# is not null:
* * merged.next = curr#
* * merged = curr#
* * curr# = curr#.next

Then simply return a new LinkedList created from head.

This function should run in O(2n) time (O(n) if you simply returned the head, or didn't track the tail and passed in the length to LinkedList.fromHead())

## API
### mergeLists(list1, list2)
Returns a new LinkedList with the nodes of both lists, zipped together starting with list1's head, followed by list2's head.

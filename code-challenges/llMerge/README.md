# mergeLists
It's a single function that merges two linked lists, in a "zipper" fashion ([1, 2], [3, 4] => [1, 3, 2, 4])

## Approach & Efficiency
Wrote a function that accepts two linked lists.
Create five variables:
* a "listCurr" which referes to the current location in the host list, and become the tail at the end.
* a "size", which will increment and replace the host lists size at the end.
* a curr1 and curr2, which both start out as the heads of their respective lists.

While curr1 or curr2 is not null:
* if curr# is not null:
* * listCurr.next = curr#
* * listCurr = curr#
* * curr# = curr#.next

Then simply return a new LinkedList created from head.

This function should run in O(n) time

I don't agree with this procedure (as proposed by codefellows) since it will destroy the usability of at least one of the input lists, which is a huge problem in my opinion.

## API
### mergeLists(list1, list2)
Returns the host list with the nodes of both lists, zipped together starting with list1's head, followed by list2's head.

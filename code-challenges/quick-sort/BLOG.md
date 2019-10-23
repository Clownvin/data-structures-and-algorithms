# Blog Notes: Quick Sort
It sorts the array by moving elements to the left or right, depending on if they are greater or less than the currently "selected" value (called pivot)

## Diagram
![alt-text](https://i.imgur.com/3ghrn7W.jpg )

## Algorithm
Pick a pivot
Go through to the edge of the array we're sorting, swapping values less than pivot to left, greater than to right
Swap the pivot into the correct place
Recursively call quicksort for each half of the array, split in two on the pivot index

## Psuedocode
![alt-text](https://i.imgur.com/fqEKOrM.png)

## Readings and References
### Video
* [GeeksforGeeks](https://www.youtube.com/watch?v=PgBzjlCcFvc)
### Articles
* [Wikipedia](https://en.wikipedia.org/wiki/Quicksort)
* [GeeksforGeeks](https://www.geeksforgeeks.org/quick-sort/)

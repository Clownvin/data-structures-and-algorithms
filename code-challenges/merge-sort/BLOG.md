# Blog Notes: Merge Sort
It sorts the array by diving it in half, then sorting each half, then rejoinging them, recursively.

## Diagram
ASCII art, yay

`[5, 4, 3, 2, 1]`
`[5, 4, 3], [2, 1]`
`[5, 4], [ 3]  [1, 2]`
`[4, 5]   ||     ||  `
`    [3, 4, 5]   ||  `
`      [1, 2, 3, 4, 5]`

## Algorithm
Split the array in half
sort each half, recursively.
Joing the two halves together.
done.

## Psuedocode
![alt-text](https://i.imgur.com/2Mq6zGR.png)

## Readings and References
### Video
* [GeeksforGeeks](https://www.youtube.com/watch?v=JSceec-wEyw)
### Articles
* [Wikipedia](https://en.wikipedia.org/wiki/Merge_sort)
* [GeeksforGeeks](https://www.geeksforgeeks.org/merge-sort/)

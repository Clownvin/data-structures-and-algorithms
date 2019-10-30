# Left Join
It's a function that takes two tables, and puts them into a collection like so:
![alt-text](https://codefellows.github.io/common_curriculum/data_structures_and_algorithms/Code_401/class-33/dsa-33-io-table.png)

## Approach & Efficiency
Wrote a function that accepts two hash tables.
* It will reduce the "left" table into an array of arrays, where the inner arrays are like so: [key, value1, value2, value3...]
* Then, it maps over this array, adding in the values at the key in the "right" table, or a null if there are no values stored at that key.
* Then, it simply returns this array.
It can optionally take in a 3rd parameter, order, which is default left, but can be set to right for a right join.

## API
### join(table1, table2, order = 'left')
Does a left or right join on the two tables, specified by the order parameter.

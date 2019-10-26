# Hashtable
It's a hashtable, using LinkedLists for the buckets.

## Challenge
Implement a Hashtable with the following methods:  
* add: takes in both the key and value. This method should hash the key, and add the key and value pair to the table, handling collisions as needed.
* get: takes in the key and returns the value from the table.
* contains: takes in the key and returns a boolean, indicating if the key exists in the table already.
* hash: takes in an arbitrary key and returns an index in the collection.

## Approach & Efficiency
I made a hashtable. It uses linked lists for the buckets.
It's got:
* get(key) - O(1)
* hash(key) - O(1)
* contains(key) - O(1)
* put(key, val) - O(1)
* add(key, val) - O(1)
* update(key, val) - O(1)
* remove(key) - O(1)


## API
* get(key) - retrieve the value associated with a key
* hash(key) - get the index for a key via hash
* contains(key) - return true or false depending on if the key exists.
* put(key, val) - puts a value into the hashtable using the key provided
* add(key, val) - simply calls put(key, val)
* update(key, val) - simply calls put(key, val)
* remove(key) - removes and returns the value associated with the key
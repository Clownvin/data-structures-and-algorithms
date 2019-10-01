# FIFO Animal Shelter
It's an "animal shelter", or basically a queue which can enqueue animals and dequeue animals (with an optional preference)

## Approach & Efficiency
I used a linked list, and whenever an animal is enqueued, it gets added to the end of the list.
Then, if a preference is specified, the first animal matching the preference is removed and returned,
else it returns the first animal in the list (or throws an error if there is no animals)

## API
### enqueue(animal)
Adds an animal to the shelter. If the "animal" is not actually an Animal type, an error will be thrown.

### dequeue(pref)
Removes the first animal in the shelter matching the pref (dog or cat), or it just returns the first animal if no pref is given.
If the animal shelter is empty, an error is thrown.


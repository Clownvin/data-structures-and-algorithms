# Repeat Word
It's a module that contains two functions, countWords and firstRepeating

## Challenge
* Write a function that accepts a lengthy string parameter.
* Without utilizing any of the built-in library methods available to your language, return the first word to occur more than once in that provided string.

## Approach & Efficiency
* I used regex to replace any sequence of non-word characters with a space, and then split the string at each space.
* Using this list of words, I would check if I had already stored each word in the hashtable.
* In the case of firstRepeating, the first duplicate would be immediately returned.
* In the case of countWords, I would store an integer representing the number of times the word had occured, then I would take all the entries from the hashtable, put them into an array, sort them based on number of occurances, and then return this array

## API
### countWords
Takes a block of text, and returns an array containing objects, each with a word property and a count property. This array is sorted so that the most frequent words are close to the start.

### firstRepeating
Takes a block of text, and returns the first word that repeats.

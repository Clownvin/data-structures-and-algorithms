'use strict';

const HashTable = require('../../hashtable/hashtable.js');

function getWords(text) {
  return text.split(/\W+/);
}

function firstRepeating(text) {
  const words = getWords(text);
  const table = new HashTable();
  for (const word of words) {
    if (!word) {
      continue;
    }
    const stored = table.get(word);
    if (stored) {
      return word;
    }
    table.put(word, true);
  }
  return false;
}

function countWords(text) {
  const words = getWords(text);
  const table = new HashTable();
  for (const word of words) {
    if (!word) {
      continue;
    }
    const stored = table.get(word);
    table.put(word, stored ? stored + 1 : 1);
  }
  const count = table.reduce((counts, count, word) => {
    counts.push({word, count});
    return counts;
  }, []).sort((a, b) => b.count - a.count);
  return count;
}

module.exports = exports = {countWords, firstRepeating};

'use strict';

module.exports = exports = (table1, table2, order = 'left') => {
  if (order === 'right') {
    const temp = table2;
    table2 = table1;
    table1 = temp;
  }
  const joined = table1.reduce((joined, words, key) => {
    const wordSet = [];
    wordSet.push(key);
    for (const word of words) {
      wordSet.push(word);
    }
    joined.push(wordSet);
    return joined;
  }, []);
  return joined.map((words) => {
    const t2words = table2.get(words[0]);
    return words.concat(t2words ? t2words : [null]);
  });
};

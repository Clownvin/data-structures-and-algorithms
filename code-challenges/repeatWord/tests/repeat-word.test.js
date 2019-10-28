const {countWords, firstRepeating} = require('../repeat-word');

describe('repeat-word.js', () => {
  describe('firstRepeating', () => {
    it('Will return false if there are no repeating words', () => {
      expect(firstRepeating('')).toBeFalsy();
      expect(firstRepeating('This, is, a, sentance')).toBeFalsy();
    });
    it('Will return the first word to repeat, if there is one', () => {
      expect(firstRepeating('a a')).toBe('a');
      expect(firstRepeating('a b c d e b')).toBe('b');
      expect(firstRepeating('a b c b c')).toBe('b');
    });
  });
  describe('countWords', () => {
    it('Will return an empty array if there are no words', () => {
      expect(countWords('')).toEqual([]);
    });
    it('Will return an array of words paired with their count if there are words', () => {
      expect(countWords('a big fat, lazy cat')).toEqual([{word: 'big', count: 1}, {word: 'fat', count: 1}, {word: 'lazy', count: 1}, {word: 'cat', count: 1}, {word: 'a', count: 1}]);
    });
    it('The array will be ordered by word count, highest to lowest', () => {
      expect(countWords('a b c a b a')).toEqual([{word: 'a', count: 3}, {word: 'b', count: 2}, {word: 'c', count: 1}]);
    });
  });
});

'use strict';

const join = require('../left-join');
const HashTable = require('../../../hashtable/hashtable.js');

describe('join', () => {
  let left;
  let right;

  beforeEach(() => {
    left = new HashTable();
    right = new HashTable();
  });

  it('Will return an empty array if both tables are empty', () => {
    expect(join(left, right)).toEqual([]);
  });

  it('Will return an array of arrays, each containing first the key, then the values, then null, if only the left has values ', () => {
    left.put('yes', ['definitely']);
    expect(join(left, right)).toEqual([['yes', 'definitely', null]]);
    left.put('no', []);
    expect(join(left, right)).toEqual([['no', null], ['yes', 'definitely', null]]);
  });

  it('Will return an array of arrays, each containing first the key, then the values of left, then the values of right or null if right does not share the key, if both have values ', () => {
    left.put('yes', ['definitely']);
    right.put('yes', ['no']);
    expect(join(left, right)).toEqual([['yes', 'definitely', 'no']]);
  });

  it('You can change the order (left join, or right join) by setting a 3rd parameter to "left" or "right" (left default)', () => {
    right.put('yes', ['no']);
    expect(join(left, right, 'right')).toEqual([['yes', 'no', null]]);
    left.put('yes', ['definitely']);
    expect(join(left, right, 'right')).toEqual([['yes', 'no', 'definitely']]);
  });
});

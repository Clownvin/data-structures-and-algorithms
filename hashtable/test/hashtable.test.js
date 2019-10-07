const HashTable = require('../hashtable.js');

describe('HashTable', () => {
  let table;

  beforeEach(() => {
    table = new HashTable(5);
  });

  it('Can put key-value pairs', () => {
    table.put(1, 1);
    table.put(2, 2);
    table.put('JERK!', 'Not me!');
    expect(table.getSize()).toBe(3);
    expect(JSON.parse(table.toString())).toStrictEqual({'1': 1, '2': 2, 'JERK!': 'Not me!'});
  });

  it('Can get key-value pairs', () => {
    table.put(1, 1);
    table.put(2, 2);
    table.put('JERK!', 'Not me!');
    expect(table.get(1)).toBe(1);
    expect(table.get(2)).toBe(2);
    expect(table.get('JERK!')).toBe('Not me!');
  });

  it('Can update key-value pairs, using either put or update (update simply calls put)', () => {
    table.put(1, 1);
    table.put(2, 2);
    table.put('JERK!', 'Not me!');
    table.put(1, 3);
    expect(table.get(1)).toBe(3);
    expect(table.getSize()).toBe(3);
    expect(JSON.parse(table.toString())).toStrictEqual({'1': 3, '2': 2, 'JERK!': 'Not me!'});
  });

  it('Can remove(delete) key-value pairs, returning the previously stored value', () => {
    table.put(1, 1);
    table.put(2, 2);
    table.put('JERK!', 'Not me!');
    expect(table.remove(1)).toBe(1);
    expect(table.getSize()).toBe(2);
    expect(JSON.parse(table.toString())).toStrictEqual({'2': 2, 'JERK!': 'Not me!'});
  });

  it('Can return valid JSON using toString', () => {
    table.put(1, 1);
    table.put(2, 2);
    table.put('JERK!', 'Not me!');
    const obj = JSON.parse(table.toString());
    expect(obj).toStrictEqual({'1': 1, '2': 2, 'JERK!': 'Not me!'});
  });

  it('Can handle MANY collisions (200:1 pairs:buckets)', () => {
    for (let i = 0; i < 1000; i++) {
      const key = i;
      const val = Math.random() * Number.MAX_VALUE;
      table.put(key, val);
      expect(table.get(key)).toBe(val);
    }
  });
});

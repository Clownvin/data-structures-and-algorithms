const LinkedList = require('../../../linked-lists/linked-list');
const mergeLists = require('../ll-merge');

let list;

beforeEach(() => {
  list = new LinkedList();
});

describe('mergeLists', () => {
  it('Will merge two lists together, like a zipper', () => {
    list.add(1, 3, 5, 7, 9);
    const list2 = new LinkedList(2, 4, 6, 8, 10);
    const merged = mergeLists(list, list2);
    expect(merged.toString()).toBe('[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]');
  });

  it('Will correctly merge lists of differing sizes', () => {
    list.add(1, 3, 5, 6, 7, 8, 9);
    const list2 = new LinkedList(2, 4);
    let merged = mergeLists(list, list2);
    expect(merged.toString()).toBe('[1, 2, 3, 4, 5, 6, 7, 8, 9]');
    list.clear(); // We have to clear the lists because mergeLists destroys them.
    list2.clear();
    list.add(2, 4);
    list2.add(1, 3, 5, 6, 7, 8, 9);
    merged = mergeLists(list2, list);
    expect(merged.toString()).toBe('[1, 2, 3, 4, 5, 6, 7, 8, 9]');
  });

  it('Will return a list with 0 size if there are no elements in either list', () => {
    const list2 = new LinkedList();
    let merged = mergeLists(list, list2);
    expect(merged.toString()).toBe('[]');
  });

  it('Will correctly handle either list being emtpy', () => {
    list.add(1, 2, 3, 4, 5);
    const list2 = new LinkedList();
    let merged = mergeLists(list, list2);
    expect(merged.toString()).toBe('[1, 2, 3, 4, 5]');
    list.clear();
    list2.add(1, 2, 3, 4, 5);
    merged = mergeLists(list, list2);
    expect(merged.toString()).toBe('[1, 2, 3, 4, 5]');
  });
  it('Will work with any amount of lists (greater than none, obviously)', () => {
    list.add(1, 4, 7, 10, 13);
    const list2 = new LinkedList(2, 5, 8, 11, 14);
    const list3 = new LinkedList(3, 6, 9, 12, 15);
    const merged = mergeLists(list, list2, list3);
    expect(merged.toString()).toBe('[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]');
  });
});

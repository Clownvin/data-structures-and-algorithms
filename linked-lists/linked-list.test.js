'use-strict';
const LinkedList = require('./linked-list');
const DoublyLinkedList = require('./doubly-linked-list');

function addToList(list, amount = 10) {
  for (let i = 0; i < amount; i++) {
    list.add(i);
  }
}

function listTest(List) {
  let list;

  beforeEach(() => {
    list = new List();
  });

  describe(List.name, () => {
    it(`${List.name} should be empty after creation`, () => {
      expect(list.getSize()).toBe(0);
    });

    it('add/append/push should add to tail', () => {
      list.add(1);
      expect(list.getSize()).toBe(1);
      expect(list.get(0)).toBe(1);
      list.add(2);
      expect(list.getSize()).toBe(2);
      expect(list.get(1)).toBe(2);
      list.add(3);
      expect(list.getSize()).toBe(3);
      expect(list.get(2)).toBe(3);
    });

    it('remove/pop should remove from tail', () => {
      addToList(list, 1);
      expect(list.getSize()).toBe(1);
      expect(list.toString()).toBe('[0]');
      expect(list.remove()).toBe(0);
      expect(list.getSize()).toBe(0);
      addToList(list);
      expect(list.toString()).toBe('[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]');
      expect(list.getSize()).toBe(10);
      expect(list.remove()).toBe(9);
      expect(list.toString()).toBe('[0, 1, 2, 3, 4, 5, 6, 7, 8]');
      expect(list.getSize()).toBe(9);
    });

    it('remove with (0) or shift should remove from head', () => {
      addToList(list, 1);
      expect(list.toString()).toBe('[0]');
      expect(list.remove(0)).toBe(0);
      expect(list.getSize()).toBe(0);
      addToList(list);
      expect(list.toString()).toBe('[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]');
      expect(list.getSize()).toBe(10);
      expect(list.remove(0)).toBe(0);
      expect(list.toString()).toBe('[1, 2, 3, 4, 5, 6, 7, 8, 9]');
      expect(list.getSize()).toBe(9);
    });

    it('insert/unshift should add at the head', () => {
      list.insert(0);
      expect(list.toString()).toBe('[0]');
      list.insert(1);
      expect(list.toString()).toBe('[1, 0]');
    });

    it('insert with (n, getSize()) should add at the tail', () => {
      list.insert(1, list.getSize());
      expect(list.toString()).toBe('[1]');
      list.insert(2, list.getSize());
      expect(list.toString()).toBe('[1, 2]');
    });

    it('toString returns [n1, n2, n3...n4]', () => {
      addToList(list);
      expect(list.toString()).toBe('[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]');
    });

    it('includes returns true for values that exist, false otherwise', () => {
      addToList(list);
      expect(list.includes(0)).toBe(true);
      expect(list.includes(-1)).toBe(false);
      expect(list.includes(9)).toBe(true);
      expect(list.includes(10)).toBe(false);
    });

    it('[Symbol.iterator] works', () => {
      addToList(list);
      let joined = '';
      for(const num of list) {
        joined += num;
      }
      expect(joined).toBe('0123456789');
    });

    it('Should support map', () => {
      addToList(list);
      expect(list.map((value) => value * 2).toString()).toBe('[0, 2, 4, 6, 8, 10, 12, 14, 16, 18]');
    });

    it('Should support forEach', () => {
      addToList(list);
      list.forEach((value, index) => {
        expect(value).toBe(list.get(index));
      });
    });
    //filter reduce
    it('Should support filter', () => {
      addToList(list);
      expect(list.filter((value) => value % 2).toString()).toBe('[1, 3, 5, 7, 9]');
    });

    it('Should support reduce', () => {
      addToList(list);
      expect(list.reduce((total, currVal) => total + currVal)).toBe(45);
      expect(list.reduce((total, currVal) => total + currVal, 0)).toBe(45);
    });

    it('insertBefore inserts values before second value\'s first occurrence', () => {
      addToList(list);
      list.insertBefore(4, 5);
      list.insertBefore(9, 10);
      list.insertBefore(0, 1);
      expect(list.toString()).toBe('[1, 0, 1, 2, 3, 5, 4, 5, 6, 7, 8, 10, 9]');
    });

    it('insertAfter inserts values after second value\'s first occurrence', () => {
      addToList(list);
      list.insertAfter(5, 4);
      list.insertAfter(9, 8);
      list.insertAfter(0, -1);
      expect(list.toString()).toBe('[0, -1, 1, 2, 3, 4, 5, 4, 6, 7, 8, 9, 8]');
    });
  });

  describe(`${List.name}'s lame tests from README`, () => {
    it('Can successfully add a node to the end of the linked list', () => {
      list.append(1);
      expect(list.toString()).toBe('[1]');
    });

    it('Can successfully add multiple nodes to the end of a linked list', () => {
      list.append(1, 2, 3, 4, 5, 6, 7, 8, 9);
      expect(list.toString()).toBe('[1, 2, 3, 4, 5, 6, 7, 8, 9]');
    });

    it('Can successfully insert a node before a node located in the middle of a linked list', () => {
      addToList(list, 9);
      expect(list.toString()).toBe('[0, 1, 2, 3, 4, 5, 6, 7, 8]');
      list.insertBefore(4, 100);
      expect(list.toString()).toBe('[0, 1, 2, 3, 100, 4, 5, 6, 7, 8]');
    });

    it('Can successfully insert a node before the first node of a linked list', () => {
      addToList(list);
      expect(list.toString()).toBe('[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]');
      list.insertBefore(0, 100);
      expect(list.toString()).toBe('[100, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]');
    });

    it('Can successfully insert after a node in the middle of the linked list', () => {
      addToList(list, 9);
      expect(list.toString()).toBe('[0, 1, 2, 3, 4, 5, 6, 7, 8]');
      list.insertAfter(4, 100);
      expect(list.toString()).toBe('[0, 1, 2, 3, 4, 100, 5, 6, 7, 8]');
    });

    it('Can successfully insert a node after the last node of the linked list', () => {
      addToList(list);
      expect(list.toString()).toBe('[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]');
      list.insertAfter(9, 100);
      expect(list.toString()).toBe('[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 100]');
    });
  });
}

listTest(LinkedList);
listTest(DoublyLinkedList);

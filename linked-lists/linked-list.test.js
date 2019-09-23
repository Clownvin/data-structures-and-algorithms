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
    it('Should be empty after creation', () => {
      expect(list.getSize()).toBe(0);
    });
  
    it('List.add()/append() should add to tail', () => {
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

    it('List.remove() should remove from tail', () => {
      addToList(list, 1);
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

    it('List.remove(0) should remove from head', () => {
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

    it('List.insert() should add at the head', () => {
      list.insert(0);
      expect(list.toString()).toBe('[0]');
      list.insert(1);
      expect(list.toString()).toBe('[1, 0]');
    });

    it('List.insert(val, size) should add at the tail', () => {
      list.insert(1, list.getSize());
      expect(list.toString()).toBe('[1]');
      list.insert(2, list.getSize());
      expect(list.toString()).toBe('[1, 2]');
    });

    it('List.toString() returns [n1, n2, n3...n4]', () => {
      addToList(list);
      expect(list.toString()).toBe('[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]');
    });

    it('List.includes() returns true for values that exist, false otherwise', () => {
      addToList(list);
      expect(list.includes(0)).toBe(true);
      expect(list.includes(-1)).toBe(false);
      expect(list.includes(9)).toBe(true);
      expect(list.includes(10)).toBe(false);
    });

    it('Should be iterable', () => {
      addToList(list);
      let joined = '';
      for(const num of list) {
        joined += num;
      }
      expect(joined).toBe('0123456789');
    });
  
    it('Should support toString', () => {
      addToList(list);
      const string = list.toString();
      expect(string).toBe('[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]');
    });
  
    it('Should support \'includes\' method', () => {
      addToList(list);
      expect(list.includes(0)).toBe(true);
      expect(list.includes(-1)).toBe(false);
      expect(list.includes(9)).toBe(true);
      expect(list.includes(10)).toBe(false);
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
  
    it('Should support insertBefore', () => {
      addToList(list);
      console.log(list.toString());
      list.insertBefore(4, 5);
      list.insertBefore(9, 10);
      list.insertBefore(0, 1);
      expect(list.toString()).toBe('[1, 0, 1, 2, 3, 5, 4, 5, 6, 7, 8, 10, 9]');
    });
  
    it('Should support insertAfter', () => {
      addToList(list);
      list.insertAfter(5, 4);
      list.insertAfter(9, 8);
      list.insertAfter(0, -1);
      expect(list.toString()).toBe('[0, -1, 1, 2, 3, 4, 5, 4, 6, 7, 8, 9, 8]');
    });
  });
}

listTest(LinkedList);
listTest(DoublyLinkedList);
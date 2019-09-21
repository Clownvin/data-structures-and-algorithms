'use-strict';

describe('LinkedList', () => {
  const LinkedList = require('./linked-list');
  const list = new LinkedList();
  function repopulate(amount) {
    while (amount--) {
      list.add(amount);
    }
  }

  it('Should add to tail', () => {
    for (let i = 0; i < 10; i++) {
      list.add(i);
      expect(list.getSize()).toBe(i + 1);
      expect(list.get(i)).toBe(i);
    }
  });

  it('Should remove without parameter from tail', () => {
    while (list.getSize()) {
      const startSize = list.getSize();
      const toRemove = list.get(startSize - 1);
      const removed = list.remove();
      expect(list.getSize()).toBe(startSize - 1);
      expect(toRemove).toBe(removed);
    }
    expect(list.getSize()).toBe(0);
  });

  it('Should be able to remove from head till empty', () => {
    repopulate(1000);
    for (let i = 0; i < 1000; i++) {
      const startSize = list.getSize();
      const toRemove = list.get(0);
      const removed = list.remove(0);
      expect(list.getSize()).toBe(startSize - 1);
      expect(toRemove).toBe(removed);
    }
    expect(list.getSize()).toBe(0);
  });

  it('Should be able to remove from tail till empty', () => {
    repopulate(1000);
    for (let i = 0; i < 1000; i++) {
      const startSize = list.getSize();
      const toRemove = list.get(list.getSize() - 1);
      const removed = list.remove(list.getSize() - 1);
      expect(list.getSize()).toBe(startSize - 1);
      expect(toRemove).toBe(removed);
    }
    expect(list.getSize()).toBe(0);
  });

  it('Should be able to remove randomly to empty', () => {
    for (let i = 0; i < 1000; i++) {
      repopulate(3);
      while (list.getSize()) {
        const removeIndex = Math.floor(Math.random() * list.getSize());
        const startSize = list.getSize();
        const toRemove = list.get(removeIndex);
        const removed = list.remove(removeIndex);
        expect(list.getSize()).toBe(startSize - 1);
        expect(toRemove).toBe(removed);
      }
    }
  });

  it('Should be able to insert elements to head', () => {
    expect(list.getSize()).toBe(0);
    for (let i = 0; i < 1000; i++) {
      const toInsert = Math.floor(Math.random() * 1000000);
      const startSize = list.getSize();
      let initially;
      if (list.getSize() > 0) {
        initially = list.get(0);
      }
      list.insert(toInsert);
      expect(list.getSize()).toBe(startSize + 1);
      expect(list.get(0)).toBe(toInsert);
      if (list.getSize() > 1) {
        expect(list.get(1)).toBe(initially);
      }
    }
    list.clear();
  });

  it('Should be able to insert elements to tail', () => {
    expect(list.getSize()).toBe(0);
    for (let i = 0; i < 1000; i++) {
      const toInsert = Math.floor(Math.random() * 1000000);
      const startSize = list.getSize();
      let initially;
      if (list.getSize() > 0) {
        initially = list.get(startSize - 1);
      }
      list.insert(toInsert, startSize);
      expect(list.getSize()).toBe(startSize + 1);
      expect(list.get(startSize)).toBe(toInsert);
      if (list.getSize() > 1) {
        expect(list.get(startSize - 1)).toBe(initially);
      }
    }
    list.clear();
  });

  it('Should be iterable', () => {
    list.clear();
    repopulate(10);
    let joined = '';
    for(const num of list) {
      joined += num;
    }
    expect(joined).toBe('9876543210');
  });

  it('Should support toString', () => {
    list.clear();
    repopulate(10);
    const string = list.toString();
    expect(string).toBe('[9, 8, 7, 6, 5, 4, 3, 2, 1, 0]');
  });

  it('Should support \'includes\' method', () => {
    list.clear();
    repopulate(10);
    expect(list.includes(0)).toBe(true);
    expect(list.includes(-1)).toBe(false);
    expect(list.includes(9)).toBe(true);
    expect(list.includes(10)).toBe(false);
  });

  it('Should support map', () => {
    list.clear();
    repopulate(10);
    expect(list.map((value) => value * 2).toString()).toBe('[18, 16, 14, 12, 10, 8, 6, 4, 2, 0]');
  });

  it('Should support forEach', () => {
    list.clear();
    repopulate(10);
    list.forEach((value, index) => {
      expect(value).toBe(list.get(index));
    });
  });
  //filter reduce
  it('Should support filter', () => {
    list.clear();
    repopulate(10);
    expect(list.filter((value) => value % 2).toString()).toBe('[9, 7, 5, 3, 1]');
  });

  it('Should support reduce', () => {
    list.clear();
    repopulate(10);
    expect(list.reduce((total, currVal) => total + currVal)).toBe(45);
    expect(list.reduce((total, currVal) => total + currVal, 0)).toBe(45);
  });
});

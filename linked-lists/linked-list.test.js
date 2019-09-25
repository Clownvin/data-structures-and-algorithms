'use-strict';
const LinkedList = require('./linked-list');
//const DoublyLinkedList = require('./doubly-linked-list');

function listTest(List) {
  let list;

  describe(List.name, () => {
    it(`${List.name} should be empty after creation`, () => {
      expect(list.getSize()).toBe(0);
    });

    beforeEach(() => {
      list = new List();
    });

    describe('static from(collection, mapFunc, thisArg', () => {
      it('Creates a new LL from a collection', () => {
        const ll = List.from([1, 2, 3, 4, 5, 6, 7]);
        expect(ll.toArray()).toStrictEqual([1, 2, 3, 4, 5, 6, 7]);
      });

      it('Can optionally take a mapFunc to map the input', () => {
        const ll = List.from([1, 2, 3], num => num * 2);
        expect(ll.toArray()).toStrictEqual([2, 4, 6]);
      });
    });

    describe('static isList(object)', () => {
      it('Can identify a linked list', () => {
        const ll = new List();
        expect(List.isList(ll)).toBeTruthy();
      });

      it('Can identify a non-linked list', () => {
        const arr = [];
        expect(List.isList(arr)).toBeFalsy();
      });
    });

    describe('static of(...values)', () => {
      it('Creates a new LL from an arbitrary amount of passed in values', () => {
        const ll = List.of(1, 2, 3);
        expect(ll.toArray()).toStrictEqual([1, 2, 3]);
      });
    });

    describe('getSize()', () => {
      it('Returns the size of the LL', () => {
        expect(list.getSize()).toBe(0);
        list.add(1, 2, 3);
        expect(list.getSize()).toBe(3);
      });
    });

    describe('get(index)', () => {
      it('Returns the value at an index', () => {
        list.add(1, 2, 3);
        expect(list.get(0)).toBe(1);
        expect(list.get(1)).toBe(2);
        expect(list.get(2)).toBe(3);
      });

      it('When given a negative index, will start from the end', () => {
        list.add(1, 2, 3);
        expect(list.get(-1)).toBe(3);
      });

      it('Throws an error if the index doesn\'t exist', () => {
        expect(() => list.get(0)).toThrow();
      });
    });

    describe('add(...values)', () => {
      it('Adds a single passed in value', () => {
        list.add(1);
        expect(list.toArray()).toStrictEqual([1]);
      });

      it('Adds multiple passed in values', () => {
        list.add(1, 2, 3);
        expect(list.toArray()).toStrictEqual([1, 2, 3]);
      });
    });

    describe('append(...values)', () => {
      it('Adds a single passed in value', () => {
        list.append(1);
        expect(list.toArray()).toStrictEqual([1]);
      });

      it('Adds multiple passed in values', () => {
        list.append(1, 2, 3);
        expect(list.toArray()).toStrictEqual([1, 2, 3]);
      });
    });

    describe('concat(collection)', () => {
      it('Can join two lists', () => {
        list.add(1, 2, 3);
        const other = new LinkedList();
        other.add(4, 5, 6);
        expect(list.concat(other).toArray()).toStrictEqual([1, 2, 3, 4, 5, 6]);
      });

      it('Can also join other collections to this list', () => {
        list.add(1, 2, 3);
        const arr = [4, 5, 6];
        expect(list.concat(arr).toArray()).toStrictEqual([1, 2, 3, 4, 5, 6]);
      });

      it('Does nothing if either or both arrays are empty', () => {
        let arr = [];
        expect(list.concat(arr).toArray()).toStrictEqual([]);
        arr.push(1, 2, 3);
        expect(list.concat(arr).toArray()).toStrictEqual([1, 2, 3]);
        arr = [];
        list.add(1, 2, 3);
        expect(list.concat(arr).toArray()).toStrictEqual([1, 2, 3]);
      });
    });

    describe('copyWithin(target, start = 0, end = this.getSize())', () => {
      it('Can copy values within the array', () => {
        list.add(1, 2, 3, 4, 5, 6);
        expect(list.copyWithin(2, 3).toArray()).toStrictEqual([1, 2, 4, 5, 6, 6]);
      });
    });

    describe('entries()', () => {
      it('Can return an array of arrays, where idx 0 is the key, idx 1 is the value', () => {
        list.add(1, 2, 3, 4, 5, 6);
        expect(list.entries()).toStrictEqual([[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6]]);
      });

      it('Will return an empty array if the list is empty', () => {
        expect(list.entries()).toStrictEqual([]);
      });
    });

    describe('every(callback, thisArg)', () => {
      it('Will return true if every element passes the callback', () => {
        list.add(2, 4, 6, 8);
        expect(list.every(num => num % 2 === 0)).toBeTruthy();
      });

      it('Will return false if even a single element fails', () => {
        list.add(2, 4, 5, 8);
        expect(list.every(num => num % 2 === 0)).toBeFalsy();
      });

      it('Will return true if there are no elements', () => {
        expect(list.every(num => num % 2 === 0)).toBeTruthy();
      })
    });

    describe('push(...values)', () => {
      it('Adds a single passed in value', () => {
        list.push(1);
        expect(list.toArray()).toStrictEqual([1]);
      });

      it('Adds multiple passed in values', () => {
        list.push(1, 2, 3);
        expect(list.toArray()).toStrictEqual([1, 2, 3]);
      });
    });

    describe('clear()', () => {
      it('Will clear, or remove all elements from, the list', () => {
        list.add(1, 2, 3);
        expect(list.getSize()).toBe(3);
        list.clear();
        expect(list.toArray()).toStrictEqual([]);
      });
    });

    describe('[Symbol.iterator]()', () => {
      it('Allows for iteration in a for-each loop', () => {
        list.add(1, 2, 3, 4, 5);
        let total = 0;
        for (const num of list) {
          total += num;
        }
        expect(total).toBe(15);
      });
    });

    describe('fill(value, start = 0, end = this.getSize())', () => {
      it('Will fill an array with a value', () => {
        list.add(1, 2, 3, 4, 5);
        list.fill(6);
        expect(list.toArray()).toStrictEqual([6, 6, 6, 6, 6]);
      });

      it('Will fill between a range', () => {
        list.add(1, 2, 3, 4, 5);
        list.fill(6, 3);
        expect(list.toArray()).toStrictEqual([1, 2, 3, 6, 6]);
        list.fill(9, 1, list.getSize());
        expect(list.toArray()).toStrictEqual([1, 9, 9, 9, 9]);
      });

      it('Can accept negatives for the range', () => {
        list.add(1, 2, 3, 4, 5);
        list.fill(6, -3);
        expect(list.toArray()).toStrictEqual([1, 2, 6, 6, 6]);
        list.fill(9, -list.getSize(), -2);
        expect(list.toArray()).toStrictEqual([9, 9, 9, 9, 6]);
      });
    });

    describe('find(callback, thisArg)', () => {
      it('Will find the first value matching the callback', () => {
        list.add(2, 4, 6, 5, 8);
        expect(list.find(num => num % 2 === 1)).toBe(5);
      });

      it('Will return undefined if no match is found', () => {
        list.add(2, 4, 6, 8, 10);
        expect(list.find(num => num % 2 === 1)).toBeFalsy();
      });

      it('Will return undefined if list is empty', () => {
        expect(list.find(num => num % 2 === 1)).toBeFalsy();
      });
    });

    describe('findIndex(callback, thisArg)', () => {
      it('Will find the index of the first value matching the callback', () => {
        list.add(2, 4, 6, 5, 8);
        expect(list.findIndex(num => num % 2 === 1)).toBe(3);
      });

      it('Will return -1 if no match is found', () => {
        list.add(2, 4, 6, 8, 10);
        expect(list.findIndex(num => num % 2 === 1)).toBe(-1);
      });

      it('Will return -1 if list is empty', () => {
        expect(list.findIndex(num => num % 2 === 1)).toBe(-1);
      });
    });

    describe('forEach(callback, thisArg)', () => {
      it('Will loop through each element in the list, calling the callback with the value for each', () => {
        list.add(1, 2, 3, 4, 5);
        let str = '';
        list.forEach(num => str += num);
        expect(str).toBe('12345');
      });

      it('Will pass the index of each element to the callback', () => {
        list.add(1, 2, 3, 4, 5);
        list.forEach((num, index) => {
          expect(index).toBe(num - 1);
        });
      });
    });

    describe('map(callback, thisArg)', () => {
      it('Will loop through each element, returning an array with the results from calling the map function for each value', () => {
        list.add(1, 2, 3, 4, 5);
        const mapped = list.map(num => num * 2);
        expect(mapped.toArray()).toStrictEqual([2, 4, 6, 8, 10]);
      });

      it('Will pass the index of each element to the callback', () => {
        list.add(1, 2, 3, 4, 5);
        const mapped = list.map((num, index) => {
          return index;
        });
        expect(mapped.toArray()).toStrictEqual([0, 1, 2, 3, 4]);
      });
    });

    describe('filter(callback, thisArg)', () => {
      it('Will loop through each element, creating a new list with only the values that pass the filter', () => {
        list.add(1, 2, 3, 4, 5, 6, 7, 8, 9);
        const filtered = list.filter(num => num % 2);
        expect(filtered.toArray()).toStrictEqual([1, 3, 5, 7, 9]);
      });

      it('Will pass the index of each element to the callback', () => {
        //       0  1  2  3  4  5  6  7  8
        list.add(1, 2, 3, 4, 5, 6, 7, 8, 9);
        const filtered = list.filter((num, index) => {
          num -= num;
          return index % 2 === 1;
        });
        expect(filtered.toArray()).toStrictEqual([2, 4, 6, 8]);
      });
    });

    describe('reduce(callback, accumulator, thisArg)', () => {
      it('Will reduce the list to a single value', () => {
        list.add(1, 2, 3, 4, 5);
        const reduced = list.reduce((total, num) => total + num);
        expect(reduced).toBe(15);
      });

      it('Will allow you to specify a starting accumulator', () => {
        list.add(1, 2, 3, 4, 5);
        const reduced = list.reduce((total, num) => total + num, 1);
        expect(reduced).toBe(16);
      });
    });

    describe('reduceRight(callback, accumulator, thisArg)', () => {
      it('Will reduce, but in reverse', () => {
        list.add(1, 2, 3, 4, 5);
        const reduced = list.reduceRight((string, num) => string += num, '');
        expect(reduced).toBe('54321');
      });
    });

    describe('reverse()', () => {
      it('Will reverse the list, in place', () => {
        list.add(1);
        list.reverse();
        expect(list.toArray()).toStrictEqual([1]);
        list.insert(2);
        list.reverse();
        expect(list.toArray()).toStrictEqual([1, 2]);
        list.add(3);
        list.reverse();
        expect(list.toArray()).toStrictEqual([3, 2, 1]);
      });
    });

    describe('slice(start, end = this.getSize())', () => {
      it('Will return a new list with the sliced indices', () => {
        list.add(1, 2, 3, 4, 5);
        expect(list.slice(3).toArray()).toStrictEqual([4, 5]);
        expect(list.slice().toArray()).toStrictEqual([1, 2, 3, 4, 5]);
        expect(list.slice(1, 3).toArray()).toStrictEqual([2, 3]);
      });
    });

    describe('some(callback, thisArg)', () => {
      it('Will return true if at least one value passes the callback', () => {
        list.add(1, 3, 4, 5, 7);
        expect(list.some(num => num % 2 === 0)).toBeTruthy();
      });
      it('Will return false if no value passes the callback', () => {
        list.add(1, 1, 1, 1, 1);
        expect(list.some(num => num > 1)).toBeFalsy();
      });
      it('Will return false if the list is empty', () => {
        expect(list.some(num => num > 0)).toBeFalsy();
      });
    });

    describe('sort(compareFunc)', () => {
      it('Will sort, in place, the list using the given callback', () => {
        list.add(1, 2, 3, 4, 5, 6, 7);
        expect(list.sort(num => (num % 2) - 1).toArray()).toStrictEqual([6, 4, 2, 1, 3, 5, 7]);
      });
      it('Will sort, in place, the list using the default sort if no callback given', () => {
        list.add(7, 6, 5, 4, 3, 2, 1);
        expect(list.sort().toArray()).toStrictEqual([1, 2, 3, 4, 5, 6, 7]);
      });
    });

    describe('join(separator = \',\')', () => {
      it('Will join the elements into a string separated by , if separator is omitted', () => {
        list.add(1, 2, 3, 4, 5);
        expect(list.join()).toBe('1,2,3,4,5');
      });
      it('Will join elements with a passed in separator', () => {
        list.add(1, 2, 3, 4, 5);
        expect(list.join(' ')).toBe('1 2 3 4 5');
      });
    });

    describe('toString()', () => {
      it('Will return a string in the format \'[n, n2, n3...]\'', () => {
        list.add(1, 2, 3, 4);
        expect(list.toString()).toBe('[1, 2, 3, 4]');
      });
      it('Will return \'[]\' if list is empty', () => {
        expect(list.toString()).toBe('[]');
      });
    });

    describe('keys()', () => {
      it('Will return an array of all the indices in the list', () => {
        list.add(1, 2, 3, 4, 5);
        expect(list.keys()).toStrictEqual([0, 1, 2, 3, 4]);
      });
      it('Will return [] if list is empty', () => {
        expect(list.keys()).toStrictEqual([]);
      });
    });

    describe('indexOf(object)', () => {
      it('Will find the first index of the given object', () => {
        list.add(1, 2, 3);
        expect(list.indexOf(1)).toBe(0);
        expect(list.indexOf(2)).toBe(1);
        expect(list.indexOf(3)).toBe(2);
      });
      it('Will return -1 if the object does not exist in the list', () => {
        expect(list.indexOf(1)).toBe(-1);
        list.add(5);
        expect(list.indexOf(1)).toBe(-1);
      });
    });

    describe('lastIndexOf(object)', () => {
      it('Will find the last index of the given object', () => {
        list.add(1, 2, 3, 4, 5, 1);
        expect(list.lastIndexOf(1)).toBe(5);
      });
      it('Will return -1 if the object does not exist in the list', () => {
        expect(list.lastIndexOf(1)).toBe(-1);
        list.add(5, 4, 3);
        expect(list.lastIndexOf(1)).toBe(-1);
      });
    });

    describe('includes(object)', () => {
      it('Returns true if the object exists in the list', () => {
        list.add(1, 2, 3, 4, 5);
        expect(list.includes(1)).toBeTruthy();
        expect(list.includes(2)).toBeTruthy();
        expect(list.includes(3)).toBeTruthy();
        expect(list.includes(4)).toBeTruthy();
        expect(list.includes(5)).toBeTruthy();
      });
      it('Returns false if the object does not exist in the list', () => {
        list.add(1, 2, 3, 4, 5);
        expect(list.includes(6)).toBeFalsy();
      });
      it('Returns false if the list is empty', () => {
        expect(list.includes(5)).toBeFalsy();
      });
    });

    describe('insert(value, index = 0)', () => {
      it('Can insert values at the head by omitting index', () => {
        list.insert(1);
        expect(list.toArray()).toStrictEqual([1]);
        list.insert(2);
        expect(list.toArray()).toStrictEqual([2, 1]);
        list.insert(3);
        expect(list.toArray()).toStrictEqual([3, 2, 1]);
      });
      it('Can insert values anywhere by specifiying index', () => {
        list.add(1, 2, 3, 4, 5);
        list.insert(9, 3);
        expect(list.toArray()).toStrictEqual([1, 2, 3, 9, 4, 5]);
      });
      it('Can accept negative indices', () => {
        list.add(1, 2, 3, 4, 5);
        list.insert(6, -1);
        expect(list.toArray()).toStrictEqual([1, 2, 3, 4, 5, 6]);
      });
    });

    describe('unshift(...values)', () => {
      it('Can add values at the head', () => {
        list.unshift(1);
        expect(list.toArray()).toStrictEqual([1]);
        list.unshift(2);
        expect(list.toArray()).toStrictEqual([2, 1]);
      });
      it('Can add multiple values to the head, in the order the were given', () => {
        list.unshift(1, 2, 3, 4, 5);
        expect(list.toArray()).toStrictEqual([1, 2, 3, 4, 5]);
      });
    });

    describe('insertBefore(value, newValue)', () => {
      it('Can insert a value before another value', () => {
        list.add(1, 2, 3, 4);
        list.insertBefore(3, 5);
        expect(list.toArray()).toStrictEqual([1, 2, 5, 3, 4]);
      });
      it('Can insert a value before the head', () => {
        list.add(2, 3, 4, 5);
        list.insertBefore(2, 1);
        expect(list.toArray()).toStrictEqual([1, 2, 3, 4, 5]);
      });
      it('Will throw an error if value does not exist', () => {
        expect(() => list.insertBefore(3, 5)).toThrow();
        list.add(1, 2, 3, 4);
        expect(() => list.insertBefore(5, 3)).toThrow();
      });
    });

    describe('insertAfter(value, newValue)', () => {
      it('Can insert a value after another value', () => {
        list.add(1, 2, 3, 4, 5);
        list.insertAfter(3, 6);
        expect(list.toArray()).toStrictEqual([1, 2, 3, 6, 4, 5]);
      });
      it('Can insert after the tail', () => {
        list.add(1, 2, 3, 4, 5);
        list.insertAfter(5, 6);
        expect(list.toArray()).toStrictEqual([1, 2, 3, 4, 5, 6]);
      });
      it('Will throw an error if value does not exist', () => {
        expect(() => list.insertAfter(5, 5)).toThrow();
        list.add(1, 2, 3, 4, 5);
        expect(() => list.insertAfter(6, 7)).toThrow();
      });
    });

    describe('set(index, value)', () => {
      it('Can set the value at an index', () => {
        list.add(1, 2, 3, 4, 5);
        list.set(2, 20);
        expect(list.toArray()).toStrictEqual([1, 2, 20, 4, 5]);
      });
      it('Can set the value at the head', () => {
        list.add(1, 2, 3, 4, 5);
        list.set(0, 20);
        expect(list.toArray()).toStrictEqual([20, 2, 3, 4, 5]);
      });
      it('Can set the value at the tail', () => {
        list.add(1, 2, 3, 4, 5);
        list.set(4, 20);
        expect(list.toArray()).toStrictEqual([1, 2, 3, 4, 20]);
      });
      it('Can accept negative indices', () => {
        list.add(1, 2, 3, 4, 5);
        list.set(-1, 20);
        expect(list.toArray()).toStrictEqual([1, 2, 3, 4, 20]);
      });
      it('Will throw an error if the index is out of bounds', () => {
        list.add(1, 2, 3, 4, 5);
        expect(() => list.set(5, 20)).toThrow();
      });
    });

    describe('removeElement(value)', () => {
      it('Can remove a value from the list', () => {
        list.add(1, 2, 3, 4, 5);
        list.removeElement(2);
        expect(list.toArray()).toStrictEqual([1, 3, 4, 5]);
      });
      it('Can remove from the head', () => {
        list.add(1, 2, 3, 4, 5);
        list.removeElement(1);
        expect(list.toArray()).toStrictEqual([2, 3, 4, 5]);
      });
      it('Can remove from the tail', () => {
        list.add(1, 2, 3, 4, 5);
        list.removeElement(5);
        expect(list.toArray()).toStrictEqual([1, 2, 3, 4]);
      });
      it('Will throw an error if the value doesn\'t exist', () => {
        expect(() => list.removeElement(0)).toThrow();
        list.add(1);
        expect(() => list.removeElement(0)).toThrow();
      });
    });

    describe('delete(value)', () => {
      it('Can remove a value from the list', () => {
        list.add(1, 2, 3, 4, 5);
        list.delete(2);
        expect(list.toArray()).toStrictEqual([1, 3, 4, 5]);
      });
      it('Can remove from the head', () => {
        list.add(1, 2, 3, 4, 5);
        list.delete(1);
        expect(list.toArray()).toStrictEqual([2, 3, 4, 5]);
      });
      it('Can remove from the tail', () => {
        list.add(1, 2, 3, 4, 5);
        list.delete(5);
        expect(list.toArray()).toStrictEqual([1, 2, 3, 4]);
      });
      it('Will throw an error if the value doesn\'t exist', () => {
        expect(() => list.delete(0)).toThrow();
        list.add(1);
        expect(() => list.delete(0)).toThrow();
      });
    });

    describe('remove(index = this.getSize() - 1)', () => {
      it('Will remove from the tail when index omitted', () => {
        list.add(1, 2, 3, 4, 5);
        expect(list.remove()).toBe(5);
        expect(list.toArray()).toStrictEqual([1, 2, 3, 4]);
      });
      it('Will remove from the index specified', () => {
        list.add(1, 2, 3, 4, 5);
        expect(list.remove(1)).toBe(2);
        expect(list.toArray()).toStrictEqual([1, 3, 4, 5]);
      });
      it('Can accept negative indices', () => {
        list.add(1, 2, 3, 4, 5);
        expect(list.remove(-1)).toBe(5);
        expect(list.toArray()).toStrictEqual([1, 2, 3, 4]);
      });
      it('Will throw an error if the index is out of bounds', () => {
        expect(() => list.remove(0)).toThrow();
        list.add(1, 2, 3, 4, 5);
        expect(() => list.remove(5)).toThrow();
      });
    });

    describe('shift()', () => {
      it('Will remove from the head', () => {
        list.add(1, 2, 3);
        expect(list.shift()).toBe(1);
        expect(list.getSize()).toBe(2);
        expect(list.shift()).toBe(2);
        expect(list.getSize()).toBe(1);
        expect(list.shift()).toBe(3);
        expect(list.getSize()).toBe(0);
      });
      it('Will throw an error if the list is empty', () => {
        expect(() => list.shift()).toThrow();
      });
    });

    describe('pop()', () => {
      it('Will remove from the tail', () => {
        list.add(1, 2, 3);
        expect(list.pop()).toBe(3);
        expect(list.getSize()).toBe(2);
        expect(list.pop()).toBe(2);
        expect(list.getSize()).toBe(1);
        expect(list.pop()).toBe(1);
        expect(list.getSize()).toBe(0);
      });
      it('Will throw an error if the list is empty', () => {
        expect(() => list.pop()).toThrow();
      });
    });

    describe('toArray()', () => {
      it('Will return an array of all the values, in order', () => {
        list.add(1, 2, 3, 4, 5);
        expect(list.toArray()).toStrictEqual([1, 2, 3, 4, 5]);
        list.clear();
        list.add(1, 3, 2, 4, 5);
        expect(list.toArray()).toStrictEqual([1, 3, 2, 4, 5]);
      });
      it('Will return an empty array if the list is empty', () => {
        expect(list.toArray()).toStrictEqual([]);
      });
    });

    describe('values()', () => {
      it('Will return an array of all the values, in order', () => {
        list.add(1, 2, 3, 4, 5);
        expect(list.values()).toStrictEqual([1, 2, 3, 4, 5]);
        list.clear();
        list.add(1, 3, 2, 4, 5);
        expect(list.values()).toStrictEqual([1, 3, 2, 4, 5]);
      });
      it('Will return an empty array if the list is empty', () => {
        expect(list.values()).toStrictEqual([]);
      });
    });

    describe('kthFromEnd(k)', () => {
      it('Will return the kth value from the end', () => {
        list.add(1, 2, 3, 4, 5);
        expect(list.nthFromEndRec(0)).toBe(5);
        expect(list.nthFromEndRec(1)).toBe(4);
      });
      it('Will throw an error if the kth index would be out of bounds', () => {
        list.add(1, 2, 3, 4, 5);
        expect(() => list.nthFromEndRec(-1)).toThrow();
        expect(() => list.nthFromEndRec(5)).toThrow();
      });
    });

    describe('middleValue()', () => {
      it('Will return the middle value, or the left middle if there is no exact middle', () => {
        list.add(1, 2, 3, 4, 5);
        expect(list.middleValue()).toBe(3);
        expect(list.remove()).toBe(5);
        expect(list.middleValue()).toBe(2);
        list.clear();
        list.add(1);
        expect(list.middleValue()).toBe(1);
      });

      it('Will throw an error if the list is empty', () => {
        expect(() => list.middleValue()).toThrow();
      });
    });

    describe('mergeLists', () => {
      it('Will merge two lists together, like a zipper', () => {
        list.add(1, 3, 5, 7, 9);
        const list2 = new List(2, 4, 6, 8, 10);
        const merged = List.mergeLists(list, list2);
        expect(merged.toString()).toBe('[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]');
      });

      it('Will correctly merge lists of differing sizes', () => {
        list.add(1, 3, 5, 6, 7, 8, 9);
        const list2 = new List(2, 4);
        let merged = List.mergeLists(list, list2);
        expect(merged.toString()).toBe('[1, 2, 3, 4, 5, 6, 7, 8, 9]');
        merged = List.mergeLists(list2, list);
        expect(merged.toString()).toBe('[2, 1, 4, 3, 5, 6, 7, 8, 9]');
      });
    });
  });
}

listTest(LinkedList);
//listTest(DoublyLinkedList);

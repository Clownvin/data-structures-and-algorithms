class Link {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }

  toString() {
    return this.value.toString();
  }
}

function rangeCheck(index, size) {
  if (size <= index || index < 0) {
    throw new Error(`Array index out of bounds: ${index}`);
  }
}

function normalizeIndex(index, size) {
  if (index < 0) {
    index = size + index;
  }
  return index;
}

function normalizeAndCheck(index, size) {
  index = normalizeIndex(index, size);
  rangeCheck(index, size);
  return index;
}

function getLink(index, head) {
  let i = 0;
  let link = head;
  while (i < index) {
    link = link.next;
    i++;
  }
  return link;
}

function getLinkArray(list) {
  const arr = [];
  let link = list.head;
  while (link !== null) {
    arr.push(link);
    link = link.next;
  }
  return arr;
}

module.exports = exports = class LinkedList {
  constructor(...values) {
    this.clear();
    this.add(...values);
  }

  static from(collection, mapFunc, thisArg) {
    const list = new LinkedList();
    if (mapFunc) {
      let i = 0;
      for (const value of collection) {
        list.add(mapFunc.call(thisArg, value, i++, collection));
      }
    } else {
      list.add(...collection);
    }
    return list;
  }

  static fromHead(head) {
    const list = new LinkedList();
    list.head = head;
    let size = 0;
    let prev = null;
    let curr = head;
    while (curr !== null) {
      prev = curr;
      curr = curr.next;
      size++;
    }
    list.tail = prev;
    list.size = size;
    return list;
  }

  static isList(object) {
    return object instanceof LinkedList;
  }

  static of(...values) {
    const list = new LinkedList();
    list.add(...values);
    return list;
  }

  static mergeLists(list1, list2) {
    let curr1 = list1.head;
    let curr2 = list2.head;
    const merged = new LinkedList();
    while (curr1 !== null || curr2 !== null) {
      if (curr1 !== null) {
        merged.add(curr1.value);
        curr1 = curr1.next;
      }
      if (curr2 !== null) {
        merged.add(curr2.value);
        curr2 = curr2.next;
      }
    }
    return merged;
  }

  getSize() {
    return this.size;
  }

  get(index) {
    index = normalizeAndCheck(index, this.getSize());
    if (index === this.getSize() - 1) {
      return this.tail.value;
    }
    const link = getLink(index, this.head);
    return link.value;
  }

  add(...values) {
    for (const value of values) {
      if (this.head === null) {
        this.head = this.tail = new Link(value);
      } else {
        this.tail = this.tail.next = new Link(value);
      }
    }
    this.size += values.length;
    return this;
  }

  append(...values) {
    return this.add(...values);
  }

  concat(collection) {
    const list = new LinkedList();
    list.add(...this);
    list.add(...collection);
    return list;
  }

  copyWithin(target, start = 0, end = this.getSize()) {
    target = normalizeAndCheck(target, this.getSize());
    start = normalizeAndCheck(start, this.getSize());
    end = normalizeAndCheck(end, this.getSize() + 1);
    let values = [];
    let i = 0;
    for (const value of this) {
      if (i >= start && i < end) {
        values.push(value);
      }
      i++;
    }
    let link = this.head;
    i = 0;
    while (link !== null && i - target < values.length) { // 1 2 3
      if (i >= target) {
        link.value = values[i - target];
      }
      link = link.next;
      i++;
    }
    return this;
  }

  entries() {
    let arr = [];
    let i = 0;
    for (const value of this) {
      arr.push([i++, value]);
    }
    return arr;
  }

  every(callback, thisArg) {
    let i = 0;
    for (const value of this) {
      if (!callback.call(thisArg, value, i++, this)) {
        return false;
      }
    }
    return true;
  }

  push(...values) {
    return this.add(...values);
  }

  clear() {
    this.size = 0;
    this.head = null;
    this.tail = null;
  }

  [Symbol.iterator]() {
    let next = this.head;
    return {
      next() {
        const curr = next;
        let value = null;
        if (curr) {
          value = curr.value;
          next = next.next;
        }
        return {
          done: curr === null,
          value: value
        };
      }
    };
  }

  fill(value, start = 0, end = this.getSize()) {
    start = normalizeAndCheck(start, this.getSize());
    end = normalizeAndCheck(end, this.getSize() + 1);
    let i = 0;
    let link = this.head;
    while (link !== null && i < end) {
      if (i >= start) {
        link.value = value;
      }
      link = link.next;
      i++;
    }
    return this;
  }

  find(callback, thisArg) {
    let i = 0;
    let found;
    for (const value of this) {
      if (callback.call(thisArg, value, i++, this)) {
        found = value;
        break;
      }
    }
    return found;
  }

  findIndex(callback, thisArg) {
    let i = 0;
    for (const value of this) {
      if (callback.call(thisArg, value, i, this)) {
        return i;
      }
      i++;
    }
    return -1;
  }

  forEach(callback, thisArg) {
    let i = 0;
    for (const value of this) {
      callback.call(thisArg, value, i++, this);
    }
    return this;
  }

  map(callback, thisArg) {
    const mapped = new LinkedList();
    let i = 0;
    for (const value of this) {
      mapped.add(callback.call(thisArg, value, i++, this));
    }
    return mapped;
  }

  filter(callback, thisArg) {
    const filtered = new LinkedList();
    let i = 0;
    for (const value of this) {
      if (callback.call(thisArg, value, i++, this)) {
        filtered.add(value);
      }
    }
    return filtered;
  }

  reduce(callback, accumulator, thisArg) {
    let skipFirst = false;
    if (accumulator === undefined) {
      accumulator = this.get(0);
      skipFirst = true;
    }
    let i = 0;
    for (const value of this) {
      if (i === 0 && skipFirst) {
        i++;
        continue;
      }
      accumulator = callback.call(thisArg, accumulator, value, i++, this);
    }
    return accumulator;
  }

  reduceRight(callback, accumulator, thisArg) {
    let arr = this.toArray(); //Going to use an array because it'll be faster than traversing list in reverse
    let skipFirst = false;
    if (accumulator === undefined) {
      accumulator = arr[arr.length - 1];
      skipFirst = true;
    }
    for (let i = arr.length - 1; i >= 0; i--) {
      if (i === arr.length - 1 && skipFirst) {
        continue;
      }
      accumulator = callback.call(thisArg, accumulator, arr[i], i, this);
    }
    return accumulator;
  }

  reverse() {
    const linkArr = getLinkArray(this); //An array here will also probably be faster than calling get
    const halfway = linkArr.length / 2;
    for (let i = 0; i < halfway; i++) {
      const temp = linkArr[i].value;
      const mirrorIndex = linkArr.length - i - 1;
      linkArr[i].value = linkArr[mirrorIndex].value;
      linkArr[mirrorIndex].value = temp;
    }
    return this;
  }

  slice(start = 0, end = this.getSize()) {
    start = normalizeAndCheck(start, this.getSize());
    end = normalizeIndex(end, this.getSize() + 1);
    rangeCheck(end, this.getSize() + 1);
    const list = new LinkedList();
    let i = 0;
    let link = this.head;
    while (link !== null && i < end) {
      if (i >= start) {
        list.add(link.value);
      }
      link = link.next;
      i++;
    }
    return list;
  }

  some(callback, thisArg) {
    let i = 0;
    for (const value of this) {
      if(callback.call(thisArg, value, i++, this)) {
        return true;
      }
    }
    return false;
  }

  sort(compareFunc) {
    const arr = this.toArray();
    this.clear();
    if (compareFunc) {
      arr.sort(compareFunc);
    } else {
      arr.sort();
    }
    this.add(...arr);
    return this;
  }

  join(separator = ',') {
    return this.reduce((string, value, index) => index < 1 ? string.toString() : `${string}${separator}${value.toString()}`, this.head ? this.head.value : '');
  }

  toString() {
    return `[${this.join(', ')}]`;
  }

  keys() {
    const keys = [];
    for (let i = 0; i < this.getSize(); i++) {
      keys.push(i);
    }
    return keys;
  }

  indexOf(object) {
    let i = 0;
    for (const value of this) {
      if (value === object) {
        return i;
      }
      i++;
    }
    return -1;
  }

  lastIndexOf(object) {
    let index = -1;
    let i = 0;
    for (const value of this) {
      if (value === object) {
        index = i;
      }
      i++;
    }
    return index;
  }

  includes(object) {
    for (const value of this) {
      if (value === object) {
        return true;
      }
    }
    return false;
  }

  insert(value, index = 0) {
    index = normalizeAndCheck(index, this.getSize() + 1);
    if (index === 0) {
      let currHead = this.head;
      this.head = new Link(value, currHead);
    } else {
      let start = getLink(index - 1, this.head);
      let next = start.next;
      start.next = new Link(value, next);
    }
    this.size++;
    return this;
  }

  unshift(...values) {
    for (let i = values.length - 1; i >= 0; i--) {
      this.insert(values[i]);
    }
    return this;
  }

  //TODO Accept arbitrary length newValues
  insertBefore(value, newValue) {
    let prev = null;
    let link = this.head;
    while (link !== this.tail && link.value !== value) {
      prev = link;
      link = link.next;
    }
    if (!link || link.value !== value) {
      throw `No element exists with value: ${value}`;
    }
    const newLink = new Link(newValue);
    newLink.next = link;
    if (prev) {
      prev.next = newLink;
    }
    if (link === this.head) {
      this.head = newLink;
    }
    this.size++;
    return this;
  }

  toLocaleString() {
    return `[${this.reduce((string, value) => `${string.toLocaleString()}, ${value.toLocaleString()}`)}]`;
  }

  //TODO Accept arbitrary length newValues
  insertAfter(value, newValue) {
    let link = this.head;
    while (link !== this.tail && link.value !== value) { // 1 2 3
      link = link.next;
    }
    if (!link || link.value !== value) {
      throw `No element exists with value: ${value}`;
    }
    const newLink = new Link(newValue);
    newLink.next = link.next;
    link.next = newLink;
    if (link === this.tail) {
      this.tail === newLink;
    }
    this.size++;
    return this;
  }

  set(index, value) {
    index = normalizeAndCheck(index, this.getSize());
    const link = getLink(index, this.head);
    link.value = value;
    return this;
  }

  removeElement(value) {
    let prev = null;
    let link = this.head;
    while (link !== this.tail && link.value !== value) {
      prev = link;
      link = link.next;
    }
    if (!link || link.value !== value) {
      throw `No element exists with value: ${value}`;
    }
    if (prev !== null) {
      prev.next = link.next;
    }
    if (link === this.head) {
      this.head = link.next;
    }
    if (link === this.tail) {
      this.tail = prev;
    }
    this.size--;
    return link.value;
  }

  delete(value) {
    return this.removeElement(value);
  }

  remove(index = this.getSize() - 1) {
    index = normalizeAndCheck(index, this.getSize());
    let toReturn;
    if (index === 0) { //Head
      toReturn = this.head.value;
      this.head = this.head.next;
    } else { //Mid
      const start = getLink(index - 1, this.head);
      const remove = start.next;
      if (remove === this.tail) {
        start.next = null;
        this.tail = start;
      } else {
        const end = remove.next;
        start.next = end;
      }
      toReturn = remove.value;
    }
    this.size--;
    return toReturn;
  }

  shift() {
    return this.remove(0);
  }

  pop() {
    return this.remove();
  }

  toArray() {
    const arr = [];
    for (const value of this) {
      arr.push(value);
    }
    return arr;
  }

  values() {
    return this.toArray();
  }

  kthFromEnd(k) {
    const index = (this.getSize() - k) - 1;
    rangeCheck(index, this.getSize());
    return getLink(index, this.head).value;
  }

  middleValue() {
    let index = this.getSize() % 2 === 0 ? Math.floor(this.getSize() / 2) - 1 : Math.floor(this.getSize() / 2);
    return getLink(index, this.head).value;
  }

  nthFromEndRec(n, index = 0, current = this.head) {
    if (n < 0) {
      throw `Nth from end cannot be negative`;
    }
    if (current === null) {
      return {n: n};
    }
    const results = this.nthFromEndRec(n, index + 1, current.next);
    if ('val' in results) {
      if (index === 0) {
        return results.val;
      }
      return results;
    }
    if (results.n === 0) {
      return {val: current.value};
    } else {
      if (index === 0) {
        throw `There is no ${n} from the end in list`;
      }
      return {n: results.n - 1};
    }
  }
};

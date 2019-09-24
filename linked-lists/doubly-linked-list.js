class Link {
  constructor(value, previous = null, next = null) {
    this.value = value;
    this.next = next;
    this.previous = previous;
  }

  toString() {
    return this.value.toString();
  }

  toLocaleString() {
    return this.value.toLocaleString();
  }
}

function rangeCheck(index, size) {
  if (size <= index || index < 0) {
    throw new Error(`Array index out of bounds: ${index}`);
  }
}

module.exports = exports = class DoublyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  getSize() {
    return this.size;
  }

  getLink(index) {
    let link;
    // It's in the first half of list
    if (index <= this.size / 2) {
      let i = 0;
      link = this.head;
      while (i < index) {
        link = link.next;
        i++;
      }
      // It's in the second half of list
    } else {
      let i = this.size - 1;
      link = this.tail;
      while (i > index) {
        link = link.previous;
        i--;
      }
    }
    return link;
  }

  get(index) {
    rangeCheck(index, this.getSize());
    const link = this.getLink(index);
    return link.value;
  }

  add(...values) {
    for (const value of values) {
      const link = new Link(value);
      if (this.head === null) {
        this.head = this.tail = link;
      } else {
        this.tail.next = link;
        link.previous = this.tail;
        this.tail = link;
      }
    }
    this.size += values.length;
  }

  append(...values) {
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
        }
      }
    }
  }

  forEach(callback) {
    let i = 0;
    for (const value of this) {
      callback(value, i++, this);
    }
  }

  map(callback) {
    const mapped = new DoublyLinkedList();
    let i = 0;
    for (const value of this) {
      mapped.add(callback(value, i++, this));
    }
    return mapped;
  }

  filter(callback) {
    const filtered = new DoublyLinkedList();
    let i = 0;
    for (const value of this) {
      if (callback(value, i++, this)) {
        filtered.add(value);
      }
    }
    return filtered;
  }

  reduce(callback, accumulator) {
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
      accumulator = callback(accumulator, value, i++, this);
    }
    return accumulator;
  }

  toString() {
    return `[${this.reduce((string, val) => `${string.toString()}, ${val.toString()}`)}]`;
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
    rangeCheck(index, this.getSize() + 1);
    if (index === this.getSize()) {
      this.add(value);
      return;
    } else if (index === 0) {
      let currHead = this.head;
      this.head = new Link(value, null, currHead);
    } else {
      let start = this.getLink(index - 1);
      let next = start.next;
      start.next = new Link(value, start, next);
      next.previous = start.next;
    }
    this.size++;
  }

  set(index, value) {
    rangeCheck(index, this.getSize());
    const link = this.getLink(index);
    link.value = value;
  }

  insertBefore(value, newValue) {
    let prev = null;
    let link = this.head;
    while (link !== this.tail && link.value !== value) {
      prev = link;
      link = link.next;
    }
    if (link.value !== value) {
      throw `No element exists with value: ${value}`;
    }
    const newLink = new Link(newValue);
    newLink.next = link;
    link.prev = newLink;
    if (prev) {
      prev.next = newLink;
      newLink.previous = prev;
    }
    if (link === this.head) {
      this.head = newLink;
    }
    this.size++;
  }

  insertAfter(value, newValue) {
    let link = this.head;
    while (link !== this.tail && link.value !== value) {
      link = link.next;
    }
    if (link.value !== value) {
      throw `No element exists with value: ${value}`;
    }
    const newLink = new Link(newValue);
    newLink.next = link.next;
    newLink.previous = link;
    link.next = newLink;
    if (newLink.next) {
      newLink.next.previous = newLink;
    }
    if (link === this.tail) {
      this.tail === newLink;
    }
    this.size++;
  }

  remove(index = this.getSize() - 1) {
    rangeCheck(index, this.size);
    let toReturn;
    if (index === 0) { //Head
      toReturn = this.head.value;
      this.head = this.head.next;
      if (this.head) {
        this.head.previous = null;
      }
    } else { //Mid
      const start = this.getLink(index - 1);
      const remove = start.next;
      if (remove === this.tail) {
        start.next = null;
        this.tail.previous = null;
        this.tail = start;
      } else {
        const end = remove.next;
        start.next = end;
        end.previous = start;
      }
      toReturn = remove.value;
    }
    this.size--;
    return toReturn;
  }
};

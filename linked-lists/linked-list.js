class Link {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

function rangeCheck(index, size) {
  if (size <= index || index < 0) {
    throw new Error(`Array index out of bounds: ${index}`);
  }
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

module.exports = exports = class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  getSize() {
    return this.size;
  }

  get(index) {
    rangeCheck(index, this.getSize());
    const link = getLink(index, this.head);
    return link.value;
  }

  add(value) {
    if (this.head === null) {
      this.head = this.tail = new Link(value);
    } else {
      this.tail = this.tail.next = new Link(value);
    }
    this.size++;
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
    const mapped = new LinkedList();
    let i = 0;
    for (const value of this) {
      mapped.add(callback(value, i++, this));
    }
    return mapped;
  }

  filter(callback) {
    const filtered = new LinkedList();
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
    return `[${this.reduce((string, val) => `${string}, ${val}`, this.get(0).value)}]`;
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
      this.head = new Link(value, currHead);
    } else {
      let start = getLink(index - 1, this.head);
      let next = start.next;
      start.next = new Link(value, next);
    }
    this.size++;
  }

  set(index, value) {
    rangeCheck(index, this.getSize());
    const link = getLink(index, this.head);
    link.value = value;
  }

  remove(index = this.getSize() - 1) {
    rangeCheck(index, this.size);
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
};
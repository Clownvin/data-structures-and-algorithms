const LinkedList = require('../../linked-lists/linked-list');

class Animal {
  constructor(type, name) {
    this.type = type;
    this.name = name;
  }

  toString() {
    return `${this.name} the ${this.type}`;
  }
}

class Dog extends Animal {
  constructor(name = 'Odie') {
    super('dog', name);
  }
}

class Cat extends Animal {
  constructor(name = 'Garfield') {
    super('cat', name);
  }
}

class AnimalShelter {
  constructor() {
    this.list = new LinkedList();
  }

  enqueue(animal) {
    if (!(animal instanceof Animal)) {
      throw `${animal.name} is not an animal`;
    }
    this.list.add(animal);
  }

  dequeue(pref) {
    if (pref) {
      pref = pref.toLowerCase();
      const animal = this.list.find(animal => animal.type === pref);
      if (animal) {
        this.list.removeElement(animal);
        return animal;
      }
    }
    if (this.list.getSize() > 0) {
      return this.list.shift();
    }
    throw `There are no animals in the shelter`;
  }

  getSize() {
    return this.list.getSize();
  }
}

module.exports = exports = {Animal, Dog, Cat, AnimalShelter};

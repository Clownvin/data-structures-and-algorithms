const {Dog, Cat, AnimalShelter} = require('../fifo-animal-shelter');

describe('Animal Shelter', () => {
  let shelter;

  beforeEach(() => {
    shelter = new AnimalShelter();
  });

  it('Starts off empty', () => {
    expect(shelter.getSize()).toBe(0);
  });

  it('Can add animals', () => {
    shelter.enqueue(new Dog('Clifford'));
    shelter.enqueue(new Cat('Smokey'));
    expect(shelter.getSize()).toBe(2);
  });

  it('Can get an animal, by preference (cat or dog)', () => {
    shelter.enqueue(new Dog('Clifford'));
    shelter.enqueue(new Cat('Smokey'));
    shelter.enqueue(new Dog('Blue'));
    shelter.enqueue(new Cat('Matt'));
    shelter.enqueue(new Dog('Lassie'));
    shelter.enqueue(new Cat('A tiger'));
    expect(shelter.dequeue('dog').name).toBe('Clifford');
    expect(shelter.dequeue('dog').name).toBe('Blue');
    expect(shelter.dequeue('cat').name).toBe('Smokey');
  });

  it('Can get the most recently added animal by omitting preference', () => {
    shelter.enqueue(new Dog('Clifford'));
    shelter.enqueue(new Cat('Smokey'));
    shelter.enqueue(new Dog('Blue'));
    shelter.enqueue(new Cat('Matt'));
    shelter.enqueue(new Dog('Lassie'));
    shelter.enqueue(new Cat('A tiger'));
    expect(shelter.dequeue().name).toBe('Clifford');
    expect(shelter.dequeue().name).toBe('Smokey');
  });
});

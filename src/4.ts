class Key {
  private signature: number;

  constructor() {
    this.signature = Math.random();
  }

  getSignature(): number {
    return this.signature;
  }
}

class Person {
  private key: Key;

  constructor(key: Key) {
    this.key = key;
  }

  getKey(): Key {
    return this.key;
  }
}

abstract class House {
  protected door: boolean = false;
  protected key: Key;
  protected tenants: Person[] = [];

  constructor(key: Key) {
    this.key = key;
  }

  comeIn(person: Person): void {
    if (this.door) {
      this.tenants.push(person);
    }
  }

  abstract openDoor(key: Key): void;
}

class MyHouse extends House {
  openDoor(key: Key): void {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
    }
  }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

console.log("Створено ключ з signature:", key.getSignature());
console.log("Двері закриті:", !house["door"]);

house.openDoor(person.getKey());

console.log("Після відкриття дверей - двері відкриті:", house["door"]);
console.log("Кількість мешканців:", house["tenants"].length);

house.comeIn(person);

console.log("Після входу - кількість мешканців:", house["tenants"].length);

export {};

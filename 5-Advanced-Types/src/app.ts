{
  // INTERSECTION TYPE IN TYPESCRIPT

  {
    type stringOrNumber = string | number;
    type boolOrNumber = boolean | number;
    type myNumberType = stringOrNumber & boolOrNumber;

    const x: myNumberType = 42;
    console.log(x); // 42

    // const y: myNumberType = true;       // error: Type 'boolean' is not assignable to type 'number'
    // const z: myNumberType = 'whatever'; // error: Type 'string' is not assignable to type 'number'
  }

  {
    interface user {
      name: string,
      age: number
    }

    interface admin {
      name: string,
      role: string
    }

    type adminUser = user & admin;

    // must provide all (name, age, role)
    var john: adminUser = {
      name: 'john',
      age: 28,
      role: 'admin'
    }
  }

  {
    interface Order {
      id: number,
      items: string[]
    }

    // needs id, items, status
    function processOrder(order: Order & { status: string }) {
      console.log(order.id, ...order.items, order.status)
    }

    processOrder({ id: 123, items: ['item1', 'item2'], status: 'shipped' }) // 123 item1 item2 shipped

    // processOrder({ id: 123, items: ['item1', 'item2']}); // error: Property 'status' is missing in type
  }
}

{
  // TYPE GUARDS IN TYPESCRIPT

  {
    type StringOrNumber = string | number;

    function addition(a: StringOrNumber, b: StringOrNumber) {
      if (typeof a === 'string' || typeof b === 'string')
        return a.toString() + b.toString(); // concatenation
      else
        return a + b;                       // addition
    }

    console.log(addition('hello', 'world')); // helloworld
    console.log(addition(20, 30));           // 50
    console.log(addition('hello', 30));      // hello30
  }

  {
    class Animal {
      makeSound() {
        console.log('Generic animal sound');
      }
    }

    class Dog extends Animal {
      bark() {
        console.log('woof woof')
      }
    }

    function makeCreatureSound(creature: Animal) {
      if (creature instanceof Dog) { // instanceof is code smell; red flag
        creature.bark()
      } else {
        creature.makeSound();
      }
    }

    let animal = new Animal();
    let dog = new Dog();

    makeCreatureSound(animal); // Generic animal sound
    makeCreatureSound(dog);    // woof woof
  }

  {
    interface User {
      name: string,
      email?: string;
    }

    function greetUser(user: User) {
      if ('email' in user) {
        console.log(`Hello ${user.name}. Your email is: ${user.email}`);
      } else {
        console.log(`Hello ${user.name}.`);
      }

    }

    greetUser({ name: 'John' });                          // Hello John.
    greetUser({ name: 'Mark', email: 'mark@gmail.com' }); // Hello Mark. Your email is: mark@gmail.com
  }
}

{
  // DISCRIMINATED UNION

  enum GeoForm {
    CIRCLE,
    SQUARE
  }

  interface circle {
    kind: GeoForm.CIRCLE,
    radius: number;
  }

  interface square {
    kind: GeoForm.SQUARE,
    length: number;
  }

  type Shape = circle | square;

  function calcArea(shape: Shape) {
    let res: number;

    switch (shape.kind) {
      case GeoForm.CIRCLE:
        res = 3.14 * shape.radius * shape.radius;
        break;
      case GeoForm.SQUARE:
        res = shape.length * shape.length;
        break;
    }

    return res;
  }

  console.log(calcArea({ kind: GeoForm.CIRCLE, radius: 12 })); // 452.15999999999997
  console.log(calcArea({ kind: GeoForm.SQUARE, length: 12 })); // 144
}

{
  // TYPE CASTING IN TYPESCRIPT

  // let fname = <HTMLInputElement>document.querySelector('#fname')!;

  let fname = document.querySelector('#fname');

  if (fname) {
    (fname as HTMLInputElement).value = 'John'
  }
}


{
  // INDEX PROPERTIES

  {
    interface Product {
      id: number;
      name: string;
      [prop: string]: string | number
    }

    const product1: Product = {
      id: 1,
      name: "T-Shirt",
      color: 'Red',
      price: 123
    }

    const product2: Product = {
      id: 2,
      name: "Mug",
      material: 'Ceramic',
      capacity: 300
    }

    console.log(product1); // Object { id: 1, name: "T-Shirt", color: "Red", price: 123 }
    console.log(product2); // Object { id: 2, name: "Mug", material: "Ceramic", capacity: 300 }
  }

  {
    interface Settings {
      [props: string]: boolean | string | number
    }

    const mySettings: Settings = {
      darkMode: true,
      customTheme: 'pink',
      fontSize: 16,
    }

    console.log(mySettings); // Object { darkMode: true, customTheme: "pink", fontSize: 16 }
  }

  {
    interface User {
      name: string;
      [prop: string]: any
    }

    const users: User[] = [
      { name: 'John', age: 30, gender: 'male' },
      { name: 'Mark', interests: ['music', 'sports'], location: 'london' }
    ]

    console.log(users[0]); // Object { name: "John", age: 30, gender: "male" }
    console.log(users[1]); // Object { name: "Mark", interests: ['music', 'sports'], location: "london" }
  }
}

{
  // FUNCTION OVERLOADING

  type StringOrNumber = string | number;

  function addition(a: number, b: number): number;
  function addition(a: string, b: string): string;
  function addition(a: number, b: string): string;
  function addition(a: string, b: number): string;

  function addition(a: StringOrNumber, b: StringOrNumber) {
    if (typeof a === 'string' || typeof b === 'string')
      return a.toString() + b.toString();
    else
      return a + b;
  }

  console.log(addition('Hello,', 'World').split(',')); // Array [ "Hello", "World" ]
  console.log(addition(10, 20));                       // 30
}

{
  // WHAT ARE GENERICS ?

  function swap<T>(_arr: T[], _index1: number, _index2: number): T[] {
    {
      // swapping logic
      // ...
    }

    return [];
  }

  swap([1, 2, 3], 0, 2);
  swap(['Hello', 'Hi', 'How are you'], 1, 2);

  const p: Promise<number> = new Promise((resolve, _reject) => {
    setTimeout(() => {
      resolve(100);
    }, 1000)
  });

  console.log(p); // Promise { <state>: "pending" }
}

{
  // CREATING A GENERIC FUNCTION

  {
    function swap<T>(arr: T[], index1: number, index2: number): T[] {

      [arr[index1], arr[index2]] = [arr[index2], arr[index1]];

      return arr;
    }

    console.log(swap([1, 2, 3], 0, 2));                      // Array(3) [ 3, 2, 1 ]
    console.log(swap(['Hello', 'Hi', 'How are you'], 1, 2)); // Array(3) [ "Hello", "How are you", "Hi" ]
  }

  {
    function expand<T extends object, U extends Object>(obj1: T, obj2: U) {
      return Object.assign(obj1, obj2);
    }

    let combined = expand(
      { name: 'john', age: 28 },
      { name: 'john', gender: 'male' });

    console.log(combined);                                   // Object { name: "john", age: 28, gender: "male" }
  }
}

{
  // THE KEYOF CONSTRAINT

  function getPropValue<T extends object, U extends keyof T>(obj: T, key: U) {
    return obj[key];
  }

  console.log(getPropValue({ name: 'john', age: 28 }, 'age')); // 28
}

{
  // CREATING A GENERIC CLASS

  type Book = {
    name: string;
    pages: number;
    price: number
  }

  type Cloth = {
    name: string;
    size: string;
    price: number
  }

  class ShoppingKart<T> {
    private items: T[] = [];

    addItem(item: T) {
      this.items.push(item);
    }

    getItems() {
      return this.items
    }
  }

  const bookCart = new ShoppingKart<Book>();
  bookCart.addItem({ name: 'A Book', pages: 225, price: 20 });
  bookCart.addItem({ name: 'Another Book', pages: 250, price: 25 });

  const clothCart = new ShoppingKart<Cloth>();
  clothCart.addItem({ name: 'T-Shirt', size: 'M', price: 225 });

  const strCart = new ShoppingKart<string>();
  strCart.addItem('Hello');
  strCart.addItem('World');
}

{
  // GENERIC TYPE VS UNION TYPE

  class ShoppingKart<T> {
    private items: T[] = [];

    addItem(item: T) {
      this.items.push(item);
    }
    getItems() {
      return this.items
    }
  }

  const strCart = new ShoppingKart<string>();
  strCart.addItem('Hello');
  strCart.addItem('World');

  const numCart = new ShoppingKart<number>();
  numCart.addItem(200);
  numCart.addItem(300);
}

{
  // PARTIAL & READ ONLY GENERICS

  interface UserSettings {
    username: string;
    email: string;
    darkMode: boolean;
    language: string;
  }

  function updateUserSettings(partialsettings: Partial<UserSettings>) {
    console.log('Updating:', partialsettings)
  }

  const user: Readonly<UserSettings> = {
    username: 'johnsmith',
    email: 'johnsmith@gmail.com',
    darkMode: false,
    language: 'en'
  }

  console.log(user.username); // johnsmith

  const newSettings = {
    darkMode: true,
    language: 'fr'
  }

  // although user is Readonly
  updateUserSettings(newSettings); // Updating: Object { darkMode: true, language: "fr" }

  let arr: Readonly<string[]> = ['john', 'mark'];
  arr.push('merry'); // Property 'push' does not exist on type 'readonly string[]'
  console.log(arr);  // Array(3) [ "john", "mark", "merry" ] (?!)
} 

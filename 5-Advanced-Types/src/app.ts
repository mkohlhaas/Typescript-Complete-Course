{
  // INTERSECTION TYPE IN TYPESCRIPT (&)

  {
    // basic types

    type stringOrNumber = string | number;             // union type
    type boolOrNumber = boolean | number;              // union type

    type myNumberType = stringOrNumber & boolOrNumber; // intersection type

    const x: myNumberType = 42;
    console.log(x); // 42

    // const y: myNumberType = true;       // error: Type 'boolean' is not assignable to type 'number'
    // const z: myNumberType = 'whatever'; // error: Type 'string' is not assignable to type 'number'
  }

  {
    // object types

    type user = {
      name: string,
      age: number
    }

    type admin = {
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
    type Order = {
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
  // TYPE GUARDS IN TYPESCRIPT (typeof, instanceof, in)

  {
    // basic types

    type StringOrNumber = string | number;

    function addition(a: StringOrNumber, b: StringOrNumber) {
      // type guard
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
    // classes

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
      // type guard
      if (creature instanceof Dog)  // instanceof is code smell; red flag
        creature.bark()
      else
        creature.makeSound();

    }

    let animal = new Animal();
    let dog = new Dog();

    makeCreatureSound(animal); // Generic animal sound
    makeCreatureSound(dog);    // woof woof
  }

  {
    type User = {
      name: string,
      email?: string;
    }

    function greetUser(user: User) {
      // type guard
      if ('email' in user)
        console.log(`Hello ${user.name}. Your email is ${user.email}.`);
      else
        console.log(`Hello ${user.name}.`);
    }

    greetUser({ name: 'John' });                          // Hello John.
    greetUser({ name: 'Mark', email: 'mark@gmail.com' }); // Hello Mark. Your email is mark@gmail.com.
  }
}

{
  // DISCRIMINATED UNION (kind, tag)

  enum GeoForm {
    CIRCLE,
    SQUARE
  }

  type circle = {
    kind: GeoForm.CIRCLE, // kind acts as a tag
    radius: number;
  }

  type square = {
    kind: GeoForm.SQUARE,
    length: number;
  }

  type Shape = circle | square;

  function calcArea(shape: Shape) {
    let res: number;

    // discriminated union
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
  // TYPE CASTING IN TYPESCRIPT (<..>, as)

  {
    let inputElem = document.querySelector('input')!;                  // Typescript infers - corretcly - inputElem to be of type HTMLInputElement
    inputElem.value = 'John';
  }

  {
    let fname1 = document.querySelector('#fname')!;                    // Typescript infers fname1 to be of type Element
    console.log(fname1);                                               // <input id="fname" type="text">
  }

  {
    let fname2 = <HTMLInputElement>document.querySelector('#fname')!;  // type-cast (<..>)
    fname2.value = 'John';
  }

  {
    let fname = document.querySelector('#fname')! as HTMLInputElement; // type-cast (as)
    fname.value = 'John';
  }
}

{
  // INDEX PROPERTIES

  // dynamic set of properties (possibly not known beforehand)

  {
    type Product = {
      id: number;
      name: string;
      [prop: string]: string | number
    }

    const p1: Product = {
      id: 1,
      name: "T-Shirt",
      color: 'Red',
      price: 123
    }

    const p2: Product = {
      id: 2,
      name: "Mug",
      material: 'Ceramic',
      capacity: 300
    }

    console.log(p1); // Object { id: 1, name: "T-Shirt", color: "Red", price: 123 }
    console.log(p2); // Object { id: 2, name: "Mug", material: "Ceramic", capacity: 300 }
  }

  {
    type Settings = {
      [props: string]: boolean | string | number
    }

    const s: Settings = {
      darkMode: true,
      customTheme: 'pink',
      fontSize: 16,
    }

    console.log(s); // Object { darkMode: true, customTheme: "pink", fontSize: 16 }
  }

  {
    type User = {
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
  // FUNCTION TYPE OVERLOADING

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
    // type variable constraints (extends)
    function expand<T extends Object, U extends Object>(obj1: T, obj2: U): T & U {
      return Object.assign(obj1, obj2);
    }

    let combined = expand(
      { name: 'john', age: 28 },
      { name: 'john', gender: 'male' }
    );

    console.log(combined);                                   // Object { name: "john", age: 28, gender: "male" }
  }
}

{
  // THE KEYOF CONSTRAINT (extends keyof)

  // function getPropValue<T extends Object>(obj: T, key: string) {            // error: type 'string' can't be used to index type 'Object'
  function getPropValue<T extends Object, U extends keyof T>(obj: T, key: U) { // U are only strings that are properties in T
    return obj[key];                                                           // key is a (string) literal type (in our case 'age')
  }

  console.log(getPropValue({ name: 'john', age: 28 }, 'age'));       // 28

  // console.log(getPropValue({ name: 'john', age: 28 }, 'gender')); // error: Argument of type '"gender"' is not assignable to parameter of type '"name" | "age"'
}

{
  // CREATING A GENERIC CLASS

  type Book = {
    name: string,
    pages: number,
    price: number,
  }

  type Cloth = {
    name: string,
    size: string,
    price: number,
  }

  class ShoppingCart<T> {
    private items: T[] = [];

    addItem(item: T) {
      this.items.push(item);
    }

    getItems() {
      return this.items;
    }
  }

  // books
  const bookCart = new ShoppingCart<Book>();
  bookCart.addItem({ name: 'A Book', pages: 225, price: 20 });
  bookCart.addItem({ name: 'Another Book', pages: 250, price: 25 });
  console.log(...bookCart.getItems());   // Object { name: "A Book", pages: 225, price: 20 } Object { name: "Another Book", pages: 250, price: 25 }

  // cloths
  const clothCart = new ShoppingCart<Cloth>();
  clothCart.addItem({ name: 'T-Shirt', size: 'M', price: 225 });
  console.log(...clothCart.getItems());  // Object { name: "T-Shirt", size: "M", price: 225 }

  // primitive type 
  const stringCart = new ShoppingCart<string>();
  stringCart.addItem('Hello');
  stringCart.addItem('World');
  console.log(stringCart.getItems());    // Array [ "Hello", "World" ]
}

{
  // PARTIAL & READ ONLY GENERICS (Partial<T>, Readonly<T>)

  type UserSettings = {
    username: string;
    email: string;
    darkMode: boolean;
    language: string;
  }

  {
    // Partial makes all properties in UserSettings optional
    function updateUserSettings(partialsettings: Partial<UserSettings>) {
      console.log('Updating:', partialsettings)
    }

    const newSettings = {
      darkMode: true,
      language: 'fr'
    }

    updateUserSettings(newSettings); // Updating: Object { darkMode: true, language: "fr" }
  }

  {
    // Readonly makes all properties in UserSettings readonly
    const user: Readonly<UserSettings> = {
      username: 'johnsmith',
      email: 'js@gmail.com',
      darkMode: false,
      language: 'en'
    }

    // user.language = 'de'; // error: 'language' is a read-only property

    console.log(user.username); // johnsmith
  }

  {
    // string[] == Array<String>
    let arr: Readonly<string[]> = ['john', 'mark'];

    // arr.push('mary');  // Property 'push' does not exist on type 'readonly string[]'

    console.log(arr);     // Array(3) [ "john", "mark", "merry" ] (?!)
  }
} 

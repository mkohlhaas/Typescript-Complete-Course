{
  // LECTURE 3: VARIABLES IN TYPESCRIPT
  const num = 100;
  const Num = 1000;
  const str = "Hello, World!";

  console.log(num, Num, str); // 100 1000 Hello, World!
}

{
  // LECTURE 4: DATATYPES IN TYPESCRIPT

  // 1. STRING DATATYPE
  const str1 = "This is a string created ${str2} using single quotes";
  const str2 = "this is a string created using double quotes";
  const str3 = `This is a string created
                using back ticks ${str1}
                this is another line`;

  console.log(str1); // This is a string created ${str2} using single quotes
  console.log(str2); // this is a string created using double quotes
  console.log(str3);

  // This is a string created
  //                 using back ticks This is a string created ${str2} using single quotes
  //                 this is another line

  // 2. NUMBER TYPE

  let num = 12; //12.0
  num += 1;
  const pi = 3.14;
  console.log(num, pi); // 13 3.14

  // 3. BOOLEAN TYPE
  let isEligible = true;
  isEligible = false;
  let isEqual = false;
  isEqual = true;

  console.log(isEligible, isEqual); // false true
  console.log(Boolean(null)); // false
  console.log(Boolean("Hello")); // true

  let isNotGreater = 10 < 15;
  isNotGreater = !isNotGreater;
  console.log(isNotGreater); // false
}

{
  // LECTURE 5: TYPE ASSIGNMENT & TYPE INFERENCE

  function sumup(n1, n2) {
    return n1 + n2;
  }

  console.log(sumup(1, 2)); // 3
  console.log(sumup("a", "b")); // ab
  console.log(sumup("1", 2)); // 12

  function sum(n1: number, n2: number, isPrint: boolean, msg: string) {
    const res = n1 + n2;
    if (isPrint) {
      console.log(msg + " " + res); // 30
    }
    return res;
  }

  const n1 = 10;
  const n2 = 20;
  console.log(sum(n1, n2, true, "Sum is = ")); // Sum is =  30
}

{
  // LECTURE 6: OBJECT TYPE IN TYPESCRIPT
  const person: { // using curly braces
    name: string;
    age: number;
    address: {
      city: string;
      country: string;
    };
  } = {
    name: "John",
    age: 30,
    address: {
      city: "london",
      country: "UK",
    },
  };

  console.log(person.name); // John
  console.log(person["age"]); // 30
}

{
  // LECTURE 7: ARRAYS IN TYPESCRIPT
  const names: string[] = [];
  names.push("john");
  const person: (string | number)[] = ["john", 28, "male", 1000];

  // person.push(true); // error

  console.log(person); // Array(4) [ "john", 28, "male", 1000 ]

  for (const p of person) {
    console.log(p);
    // john
    // 28
    // male
    // 1000
  }

  const birthyear: number[] = [1998, 1989, 2007];
  for (const year of birthyear) {
    console.log(year);
    // 1998
    // 1989
    // 2007
  }
}

{
  // LECTURE 8: TUPLES IN TYPESCRIPT

  // array
  const employee1: (string | number | boolean)[] = [123, "john", 2000, true];
  console.log(employee1); // Array(4) [ 123, "john", 2000, true ]

  // tuple
  let employee2: [number, string, number, boolean] = [123, "john", 2000, true];
  employee2 = [124, "mark", 1200, false];

  console.log(employee2); // Array(4) [ 124, "mark", 1200, false ]
  employee2.push(true); // doesn't make sense (tuple is an array in disguise)
  employee2.push(true);
  employee2.push(true);
  employee2.push(true);
  console.log(employee2); // Array(4) [ 124, "mark", 1200, false, true, true, true, true ]

  // array
  const employee3 = [123, "john", 2000, true];
  console.log(employee3); // Array(4) [ 123, "john", 2000, true ]
  console.log(employee1 == employee3); // false
  console.log(employee1 === employee3); // false
}

{
  // LECTURE 9: ENUMS IN TYPESCRIPT
  enum Roles {
    ADMIN,
    READ_ONLY,
    WRITE_ONLY,
    READ_WRITE,
  }

  enum Sex {
    MALE = "male",
    FEMALE = "female",
  }

  const user = {
    name: "john",
    age: 30,
    gender: Sex.MALE,
    role: Roles.ADMIN,
  };

  if (user.role === Roles.ADMIN) {
    console.log("This user is an admin"); // This user is an admin
  } else {
    console.log("This user is NOT an admin");
  }
}

{
  // LECTURE 10: ANY TYPE IN TYPESCRIPT
  let dynamicData: any;
  dynamicData = 100;

  let arr: any[];
  arr = ["Hello", 100, true, null, undefined];

  let test;

  console.log(typeof test); // undefined
  console.log(test); // undefined
}

{
  // LECTURE 11: UNION TYPE IN TYPESCRIPT

  {
    function getUser() {
      const uname = "john";
      const uage = 28;
      return { name: uname, age: uage };
    }

    let user: { name: string; age: number } | null = null; // using `|` makes it a union type
    user = getUser();
    console.log(user); // Object { name: "john", age: 28 }
  }

  {
    function printStatus1(
      message: string,
      code: string | number,
    ) {
      switch (typeof code) {
        case "string":
          console.log(`${message}. Status code: ${code.trim()}`);
          break;
        default:
          console.log(`${message}. Status code: ${code}`);
          break;
      }
      if (typeof code === "string") {
        console.log(`${message}. Status code: ${code.trim()}`);
      } else {
        console.log(`${message}. Status code: ${code}`);
      }
    }

    printStatus1("Request was successful", 200); // Request was successful. Status code: 200
    printStatus1("Resource was not found", "404"); // Resource was not found. Status code: 404
    printStatus1("Resource was not found", "     404"); // Resource was not found. Status code: 404
  }
}

{
  // LECTURE 12: LITERAL TYPE IN TYPESCRIPT

  {
    const str = "Hello, World!";
    const str2 = "Some string";

    console.log(str, str2); // Hello, World! Some string
  }
  {
    function roleMessage1(role: "admin" | "read" | "read-write") {
      switch (role) {
        case "admin":
          console.log("You have admin permission on this site."); // You have admin permission on this site.
          break;
        case "read":
          console.log("You have read permission on this site");
          break;
        case "read-write":
          console.log("You have read / write permission on this site");
          break;
      }
    }

    roleMessage1("admin");
    // roleMessage1("adfa"); // error
  }
}

{
  // LECTURE 13: UNDERSTANDING TYPE ALIASES

  {
    type StringType = string;
    const str: StringType = "Hello";
    console.log(str); // Hello
  }

  {
    type StringOrNumber = string | number;

    function printStatus2(message: string, code: StringOrNumber) {
      if (typeof code === "string") {
        console.log(`${message}. Status code: ${code.trim()}`);
      } else {
        console.log(`${message}. Status code: ${code}`);
      }
    }

    printStatus2("Request was successful", 200); // Request was successful. Status code: 200
    printStatus2("Resource was not found", "404"); // Resource was not found. Status code: 404
  }

  {
    type Role = "admin" | "read" | "read-write";

    function roleMessage2(role: Role) {
      switch (role) {
        case "admin":
          console.log("You have admin permission on this site.");
          break;
        case "read":
          console.log("You have read permission on this site");
          break;
        case "read-write":
          console.log("You have read / write permission on this site");
          break;
        default:
          console.log("unknown user permission");
      }
    }

    roleMessage2("admin"); // You have admin permission on this site.
  }

  {
    type User = { fstName: string; lstName: string; age: number }; // User is an alias for an object type

    function getFullName(user: User) {
      return user.fstName + " " + user.lstName;
    }

    function isEligibleForVoting(user: User) {
      return user.age >= 18;
    }

    const user: User = { fstName: "john", lstName: "smith", age: 32 };

    console.log(getFullName(user));         // john smith
    console.log(isEligibleForVoting(user)); // true
  }
}

{
  // LECTURE 14: FUNCTION RETURN TYPE

  function print_add(num1: number, num2: number): void {
    console.log(num1 + num2);
    return;
  }

  console.log(print_add(12, 13)); // 25
}

{
  // LECTURE 15: FUNCTION AS TYPE

  type User = { name: string; age: number };

  function greetUser(user: User) {
    const greetmsg = "Hello, " + user.name;
    console.log(greetmsg);
  }

  function isEligible(user: User) {
    console.log(user.age >= 18);
  }

  type greet_fn = (usr: User) => void; // use `=>` in aliases (arrow function syntax)

  let greet: greet_fn;
  greet = greetUser;

  const user = { name: "john", age: 28 }; // Hello, john
  greet(user);

  function sum1(n1: number, n2: number) {
    return n1 + n2;
  }

  sum1(1, 2);

  // greet = sum1; // error

  greet = isEligible;
  greet(user); // true
}

{
  // LECTURE 16: FUNCTION TYPE FOR CALLBACK

  function sum2(num1: number, num2: number): number {
    return num1 + num2;
  }

  let addNumbers: (n1: number, n2: number) => number;

  addNumbers = sum2;
  console.log(addNumbers(1, 2)); // 3

  function add(num1: number, num2: number) {
    console.log(num1 + num2);
  }

  add(1, 2); // 3

  // addNumbers = add; // error

  type PrintFn = (str: string, n: number) => void;

  function getResult(
    num1: number,
    num2: number,
    print: PrintFn,
  ) {
    const result = num1 + num2;
    print("Sum = ", result);
  }

  function display(msg: string, result: number): void {
    console.log(msg + result);
  }

  getResult(12, 13, display); // Sum = 25
}

{
  // LECTURE 17: UNKNOWN TYPE IN TYPESCRIPT

  let inputVal: unknown;
  let uname: string = "Something";

  inputVal = 100;
  inputVal = "Hello, world";

  // If inputVal would be an `any` it'd work!
  // uname = inputVal; // error: Type 'unknown' is not assignable to type 'string'

  // This works!
  if (typeof inputVal === "string") {
    uname = inputVal; // tsc knows inputVal is a string!
  }

  console.log(uname); // Hello, world
  console.log(typeof inputVal); // string
}

{
  // LECTURE 18: NEVER TYPE IN TYPESCRIPT

  function greetUser1(name: string): void {
    console.log("Hello, " + name);
  }

  greetUser1("John"); // Hello, John

  function createerror(errormsg: string, errorCode: number): never { // returns never
    throw { message: errormsg, code: errorCode };
    // console.log(errormsg); // Unreachable code detected
  }

  function infinite(): never {
    while (true) {
      // ...
    }
  }

  //createerror('Internal server error', 500);     // Unreachable code detected
  console.log(greetUser1("Mark"));                 // Hello, Mark
  console.log(createerror("Page not found", 404)); // Uncaught: Object { message: "Page not found", code: 404 }
}

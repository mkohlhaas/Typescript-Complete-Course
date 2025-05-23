{
    // LECTURE 28: ARRAY DESTRUCTURING

    const person = ['John', 'Smith', 28];
    const [fstName, lstName, age, gender = 'male'] = person;

    console.log(person);                        // Array(3) [ "John", "Smith", 28 ]
    console.log(fstName, lstName, age, gender); // John Smith 28 male
}

{
    // LECTURE 29: OBJECT DESTRUCTURING

    const user = {
        forename: 'John',
        age: 28,
        gender: 'male',
        city: 'london'
    }

    const { forename: fstName, age, gender } = user;
    console.log(fstName, age, gender); // John 28 male
}

{
    // LECTURE 30: SPREAD OPERATOR

    const users: string[] = ['john', 'mark', 'merry'];

    console.log(users);         // Array(3) [ "john", "mark", "merry" ]
    console.log(...users);      // john mark merry

    // creating a shalow copy of array
    const copyArray = [...users];
    copyArray.push('steve');
    console.log(copyArray);     // Array(4) [ "john", "mark", "merry", "steve" ]

    // creating an array from existing array
    const extendedUsers: string[] = ['Ravi', 'steve', ...users]
    console.log(extendedUsers); // Array(5) [ "Ravi", "steve", "john", "mark", "merry" ]

    // spread operator on objects
    const person = {
        fname: 'john',
        age: 28,
        gender: 'male'
    }

    const employee = { ...person, salary: 1200, company: 'Google' };
    console.log(employee);      // Object { fname: "john", age: 28, gender: "male", salary: 1200, company: "Google" }
}

{
    // LECTURE 31: REST PATTERN & REST PARAMETER

    let [a, b, ...rest] = [1, 2, 3, 4, 5];
    console.log(a, b, rest); // 1 2 Array(3) [ 3, 4, 5 ]

    let arr = [10, 20, ...rest];
    console.log(arr);        // Array(5) [ 10, 20, 3, 4, 5 ]

    function addNumbers(...numbers: number[]) {
        let count = 0;
        for (let i of numbers) {
            count += i;
        }
        return count;
    }

    console.log(addNumbers(1, 2));             // 3
    console.log(addNumbers(1, 2, 5, 7));       // 15
    console.log(addNumbers(1, 2, 5, 6, 7, 9)); // 30
}

{
    // LECTURE 32: THE NULLISH COALESCING OPERATOR

    const value = 'VALID VALUE';

    let storage = value ?? 'DEFAULT';

    console.log(storage); // VALID VALUE
}

{
    // LECTURE 33: OPTIONAL CHAINING

    const products = [
        { name: 'iPhone', price: 1200, details: { color: 'black', ram: 8 } },
        { name: 'T-Shirt', price: 120, details: { color: 'red', size: 32 } },
        { name: 'TS Book', price: 50, pages: 120, author: 'Sam' }
    ]

    for (let prod of products) {
        console.log('Product name: ' + prod.name);    // Product name: iPhone       | Product name: T-Shirt      | Product name: TS Book
        console.log('**************************')     // ************************** | ************************** | **************************
        console.log('product price: ' + prod.price);  // product price: 1200        | product price: 120         | product price: 50
        console.log('Color: ' + prod.details?.color); // Color: black               | Color: red                 | Color: undefined
    }
}

{
    // LECTURE 34: ARROW FUNCTION

    //FUNCTION DECLARATION
    function print(message: string) {
        console.log(message);
    }

    print("Hello!"); // Hello!

    // FUNCTION EXPRESSION
    const sum = function (num1: number, num2: number) {
        return num1 + num2;
    }

    sum(1, 2);

    const add1: (n: number) => number = num1 => num1 + 10;
    add1(1);

    const button = document.getElementById('btn');

    button?.addEventListener('click', () => {
        console.log('button clicked');
    });
}

{
    // LECTURE 35: DEFAULT FUNCTION PARAMETER

    function printDetails(name: string, age: number, gender: string = 'male') {
        const message = `Hi! my name is ${name}. And i am ${age} years old ${gender}`;
        console.log(message);
    }

    printDetails('john', 28); // Hi! my name is john. And i am 28 years old male
}


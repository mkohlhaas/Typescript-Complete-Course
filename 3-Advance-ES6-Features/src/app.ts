{
    // LECTURE 28: ARRAY DESTRUCTURING

    const person = ['John', 'Smith', 28];

    // read-write vars
    let [fstName1, lstName1, age1, gender = 'male'] = person;

    // read-only vars
    // const [fstName, lstName, age, gender = 'male'] = person;


    let [fstName2, lstName2] = person;
    let [fstName3, , age3] = person;
    let [fstName4, lstName4, age4, gender4] = person;

    console.log(person);                             // Array(3) [ "John", "Smith", 28 ]
    console.log(fstName1, lstName1, age1, gender);   // John Smith 28 male
    console.log(fstName2, lstName2,);                // John Smith 
    console.log(fstName3, age3);                     // John 28
    console.log(fstName4, lstName4, age4, gender4);  // John Smith 28 undefined
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

    // shallow copy 
    const copyArray1 = users;   // just a reference (they share the same users array!)
    copyArray1.push('adam')
    console.log(users);         // Array(4) [ "john", "mark", "merry", "adam" ]
    console.log(copyArray1);    // Array(4) [ "john", "mark", "merry", "adam" ]

    // deep copy
    const copyArray = [...users];
    copyArray.push('steve');
    console.log(users);         // Array(4) [ "john", "mark", "merry", "adam" ]
    console.log(copyArray);     // Array(4) [ "john", "mark", "merry", "adam", "steve" ]

    // creating an array from existing array
    const extendedUsers: string[] = ['ravi', 'steve', ...users]
    console.log(extendedUsers); // Array(5) [ "ravi", "steve", "john", "mark", "merry", "adam" ]

    // spread operator on objects
    const person = {
        fname: 'john',
        age: 28,
        gender: 'male'
    }

    // embeds person into employee1
    const employee1 = { person, salary: 1200, company: 'Google' };
    // spreads person properties into employee2
    const employee2 = { ...person, salary: 1200, company: 'Google' };

    console.log(employee1);      // Object { person: {…}, salary: 1200, company: "Google" }
    console.log(employee2);      // Object { fname: "john", age: 28, gender: "male", salary: 1200, company: "Google" }
}

{
    // LECTURE 31: REST PATTERN & REST PARAMETER

    // spread operator is on the RHS (spreading)
    // rest   operator is on the LFH (collecting)

    let [a, b, ...rest] = [1, 2, 3, 4, 5]; // rest operator
    console.log(a, b, rest);               // 1 2 Array(3) [ 3, 4, 5 ]

    let arr = [10, 20, ...rest];           // spread operator
    console.log(arr);                      // Array(5) [ 10, 20, 3, 4, 5 ]

    // varargs function using rest operator (collecting)
    function addNumbers(...numbers: number[]) {
        let count = 0;
        for (const i of numbers) {
            count += i;
        }
        return count;
    }

    console.log(addNumbers(1, 2));             // 3
    console.log(addNumbers(1, 2, 5, 7));       // 15
    console.log(addNumbers(1, 2, 5, 6, 7, 9)); // 30
}

{
    // LECTURE 32: THE NULLISH COALESCING OPERATOR (`??`)

    // ?? only checks for null and undefined

    let value: string | null = 'VALUE';
    let storage = value ?? 'DEFAULT';
    console.log(storage);         // VALUE

    value = '';
    storage = value ?? 'DEFAULT'; // `||` wouldn't help as it checks for all kind of falsiness
    console.log(storage);         // <empty string>

    value = null;
    storage = value ?? 'DEFAULT';
    console.log(storage);         // DEFAULT
}

{
    // LECTURE 33: OPTIONAL CHAINING (`?`)

    // Provides safe access to nested properties and calls on potentially null or undefined objects.

    const products = [
        { name: 'iPhone', price: 1200, details: { color: 'black', ram: 8 } },
        { name: 'T-Shirt', price: 120, details: { color: 'red', size: 32 } },
        { name: 'TS Book', price: 50, pages: 120, author: 'Sam' }
    ]

    for (const prod of products) {
        console.log('Product name: ' + prod.name);    // Product name: iPhone       | Product name: T-Shirt      | Product name: TS Book
        console.log('product price: ' + prod.price);  // product price: 1200        | product price: 120         | product price: 50
        console.log('Color: ' + prod.details?.color); // Color: black               | Color: red                 | Color: undefined
        console.log('\n');
    }
}

{
    // LECTURE 34: ARROW FUNCTION (=>)

    {
        // function declaration

        function print(message: string) {
            console.log(message);
        }

        print("Hello!"); // Hello!
    }

    {
        // function expression

        const sum1 = function (num1: number, num2: number) {
            return num1 + num2;
        }
        sum1(1, 2);
    }

    {
        // arrow syntax for type and implementation

        const sum2: (n: number) => number = num1 => num1 + 10;
        sum2(1);
    }

    {
        // callback function

        const button = document.getElementById('btn');

        button?.addEventListener('click', () => {
            console.log('button clicked');
        });
    }
}

{
    // LECTURE 35: DEFAULT FUNCTION PARAMETER

    enum Sex {
        MALE = 'male',
        FEMALE = 'female'
    }

    function printDetails(name: string, age: number, gender = Sex.MALE) {
        const message = `Hi! My name is ${name} and i am a ${age} year-old ${gender}.`;
        console.log(message);
    }

    printDetails('John', 28);             // Hi! My name is John and i am a 28 year-old male.
    printDetails('Mary', 24, Sex.FEMALE); // Hi! My name is Mary and i am a 24 year-old female.
}


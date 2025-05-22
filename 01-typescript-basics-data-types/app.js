{
    // LECTURE 3: VARIABLES IN TYPESCRIPT
    var num = 100;
    var Num = 1000;
    var str = "Hello, World!";
    console.log(num, Num, str); // 100 1000 Hello, World!
}
{
    // LECTURE 4: DATATYPES IN TYPESCRIPT
    //
    // 1. STRING DATATYPE
    var str1 = "This is a string created ${str2} using single quotes";
    var str2 = "this is a string created using double quotes";
    var str3 = "This is a string created\n                using back ticks ".concat(str1, "\n                this is another line");
    console.log(str1); // This is a string created ${str2} using single quotes
    console.log(str2); // this is a string created using double quotes
    console.log(str3);
    // This is a string created
    //                 using back ticks This is a string created ${str2} using single quotes
    //                 this is another line
    // 2. NUMBER TYPE
    var num = 12; //12.0
    num += 1;
    var pi = 3.14;
    console.log(num, pi); // 13 3.14
    // 3. BOOLEAN TYPE
    var isEligible_1 = true;
    isEligible_1 = false;
    var isEqual = false;
    isEqual = true;
    console.log(isEligible_1, isEqual); // false true
    console.log(Boolean(null)); // false
    console.log(Boolean("Hello")); // true
    var isNotGreater = 10 < 15;
    isNotGreater = !isNotGreater;
    console.log(isNotGreater); // false
}
{
    // LECTURE 5: TYPE ASSIGNMENT & TYPE INFERANCE
    // deno-lint-ignore no-inner-declarations
    function sum(num1, num2, isPrint, msg) {
        if (isPrint) {
            var s = num1 + num2;
            console.log(msg + " " + s); // 30
        }
        return num1 + num2;
    }
    var n1 = 10;
    var n2 = 20;
    console.log(sum(n1, n2, true, "Sum is = ")); // Sum is =  30
}
{
    // LECTURE 6: OBJECT TYPE IN TYPESCRIPT
    var person = {
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
    var names = [];
    names.push("john");
    var person = ["john", 28, "male", 1000];
    console.log(person); // Array(4) [ "john", 28, "male", 1000 ]
    for (var _i = 0, person_1 = person; _i < person_1.length; _i++) {
        var p = person_1[_i];
        console.log(p);
        // john
        // 28
        // male
        // 1000
    }
    var birthyear = [1998, 1989, 2007];
    for (var _a = 0, birthyear_1 = birthyear; _a < birthyear_1.length; _a++) {
        var year = birthyear_1[_a];
        console.log(year);
        // 1998
        // 1989
        // 2007
    }
}
{
    // LECTURE 8: TUPLES IN TYPESCRIPT
    //
    // array
    var employee1 = [123, "john", 2000, true];
    console.log(employee1); // Array(4) [ 123, "john", 2000, true ]
    // tuple
    var employee2 = [123, "john", 2000, true];
    employee2 = [124, "mark", 1200, false];
    console.log(employee2); // Array(4) [ 124, "mark", 1200, false ]
    // array
    var employee3 = [123, "john", 2000, true];
    console.log(employee3); // Array(4) [ 123, "john", 2000, true ]
    console.log(employee1 == employee3); // false
    console.log(employee1 === employee3); // false
}
{
    // LECTURE 9: ENUMS IN TYPESCRIPT
    var Roles = void 0;
    (function (Roles) {
        Roles[Roles["ADMIN"] = 0] = "ADMIN";
        Roles[Roles["READ_ONLY"] = 1] = "READ_ONLY";
        Roles[Roles["WRITE_ONLY"] = 2] = "WRITE_ONLY";
        Roles[Roles["READ_WRITE"] = 3] = "READ_WRITE";
    })(Roles || (Roles = {}));
    var user = {
        name: "john",
        age: 30,
        gender: "male",
        role: Roles.ADMIN,
    };
    if (user.role === Roles.ADMIN) {
        console.log("This user is an admin"); // This user is an admin
    }
    else {
        console.log("This user is NOT an admin");
    }
}
{
    // LECTURE 10: ANY TYPE IN TYPESCRIPT
    var dynamicData = void 0;
    dynamicData = 100;
    var arr = void 0;
    arr = ["Hello", 100, true, null, undefined];
    var test = void 0;
    console.log(typeof test); // undefined
    console.log(test); // undefined
}
{
    // LECTURE 11: UNION TYPE IN TYPESCRIPT
    {
        var user_1 = null; // using | makes it a union type
        // deno-lint-ignore no-inner-declarations
        function getUser() {
            var uname = "john";
            var uage = 28;
            user_1 = { name: uname, age: uage };
            return user_1;
        }
        getUser();
    }
    {
        // deno-lint-ignore no-inner-declarations
        function printStatus1(message, code) {
            if (typeof code === "string") {
                console.log("".concat(message, ". Status code: ").concat(code.trim()));
            }
            else {
                console.log("".concat(message, ". Status code: ").concat(code));
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
        var str = "Hello, World!";
        var str2 = "Some string";
        console.log(str, str2); // Hello, World! Some string
    }
    {
        // deno-lint-ignore no-inner-declarations
        function roleMessage1(role) {
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
        roleMessage1("admin");
    }
}
{
    // LECTURE 13: UNDERSTANDING TYPE ALIAS
    {
        var str = "Hello";
        console.log(str);
    }
    {
        // deno-lint-ignore no-inner-declarations
        function printStatus2(message, code) {
            if (typeof code === "string") {
                console.log("".concat(message, ". Status code: ").concat(code.trim()));
            }
            else {
                console.log("".concat(message, ". Status code: ").concat(code));
            }
        }
        printStatus2("Request was successful", 200);
        printStatus2("Resource was not found", "404");
    }
    {
        // deno-lint-ignore no-inner-declarations
        function roleMessage2(role) {
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
        roleMessage2("admin");
    }
    {
        // deno-lint-ignore no-inner-declarations
        function getFullName(user) {
            return user.firstname + " " + user.lastname;
        }
        // deno-lint-ignore no-inner-declarations
        function isEligibleForVoting(user) {
            return user.age >= 18;
        }
        var user = { firstname: "john", lastname: "smith", age: 32 };
        console.log(getFullName(user));
        console.log(isEligibleForVoting(user));
    }
}
{
    // LECTURE 14: FUNCTION RETURN TYPE
    //
    // deno-lint-ignore no-inner-declarations
    function print_add(num1, num2) {
        console.log(num1 + num2);
        return;
    }
    console.log(print_add(12, 13));
}
{
    // deno-lint-ignore no-inner-declarations
    function greetUser(user) {
        var greetmsg = "Hello, " + user.name;
        console.log(greetmsg);
    }
    // deno-lint-ignore no-inner-declarations
    function isEligible(user) {
        console.log(user.age >= 18);
    }
    var greet = void 0;
    greet = greetUser;
    var user = { name: "john", age: 28 };
    greet(user);
    // deno-lint-ignore no-inner-declarations
    function sum1(n1, n2) {
        return n1 + n2;
    }
    sum1(1, 2);
    // greet = sum1; // error
    greet = isEligible;
    greet(user);
}
{
    // LECTURE 16: FUNCTION TYPE FOR CALLBACK
    var addNumbers = void 0;
    // deno-lint-ignore no-inner-declarations
    function sum2(num1, num2) {
        return num1 + num2;
    }
    addNumbers = sum2;
    // deno-lint-ignore no-inner-declarations
    function add(num1, num2) {
        console.log(num1 + num2);
    }
    add(1, 2);
    // addNumbers = add; //Error
    // deno-lint-ignore no-inner-declarations
    function getResult(num1, num2, print) {
        var result = num1 + num2;
        print("Sum = ", result);
    }
    // deno-lint-ignore no-inner-declarations
    function display(msg, result) {
        console.log(msg + result);
    }
    getResult(12, 13, display);
}
{
    // LECTURE 17: UNION TYPE IN TYPESCRIPT
    var inputVal = void 0;
    var uname = "Something";
    inputVal = 100;
    inputVal = "Hello, world";
    if (typeof inputVal === "string") {
        uname = inputVal;
    }
    console.log(uname);
    console.log(typeof inputVal);
}
{
    // LECTURE 18: `never` TYPE IN TYPESCRIPT
    //
    // deno-lint-ignore no-inner-declarations
    function greetUser1(name) {
        console.log("Hello, " + name);
    }
    greetUser1("John");
    // deno-lint-ignore no-inner-declarations
    function createerror(errormsg, errorCode) {
        throw { message: errormsg, code: errorCode };
    }
    //createerror('Internal server error', 500);
    console.log(greetUser1("Mark"));
    console.log(createerror("Page not found", 404));
}
// You have admin permission on this site.
// Hello
// Request was successful. Status code: 200
// Resource was not found. Status code: 404
// You have admin permission on this site.
// john smith
// true
// 25
// undefined
// Hello, john
// true
// 3
// Sum = 25
// Hello, world
// string
// Hello, John
// Hello, Mark
// undefined
// Uncaught
// Object { message: "Page not found", code: 404 }

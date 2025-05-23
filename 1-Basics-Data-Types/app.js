{
    // LECTURE 3: VARIABLES IN TYPESCRIPT
    var num = 100;
    var Num = 1000;
    var str = "Hello, World!";
    console.log(num, Num, str); // 100 1000 Hello, World!
}
{
    // LECTURE 4: DATATYPES IN TYPESCRIPT
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
    // LECTURE 5: TYPE ASSIGNMENT & TYPE INFERENCE
    function sumup(n1, n2) {
        return n1 + n2;
    }
    console.log(sumup(1, 2)); // 3
    console.log(sumup("a", "b")); // ab
    console.log(sumup("1", 2)); // 12
    function sum(n1, n2, isPrint, msg) {
        var res = n1 + n2;
        if (isPrint) {
            console.log(msg + " " + res); // 30
        }
        return res;
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
    // person.push(true); // error
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
    // array
    var employee1 = [123, "john", 2000, true];
    console.log(employee1); // Array(4) [ 123, "john", 2000, true ]
    // tuple
    var employee2 = [123, "john", 2000, true];
    employee2 = [124, "mark", 1200, false];
    console.log(employee2); // Array(4) [ 124, "mark", 1200, false ]
    employee2.push(true); // doesn't make sense (tuple is an array in disguise)
    employee2.push(true);
    employee2.push(true);
    employee2.push(true);
    console.log(employee2); // Array(4) [ 124, "mark", 1200, false, true, true, true, true ]
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
    var Sex = void 0;
    (function (Sex) {
        Sex["MALE"] = "male";
        Sex["FEMALE"] = "female";
    })(Sex || (Sex = {}));
    var user = {
        name: "john",
        age: 30,
        gender: Sex.MALE,
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
        function getUser() {
            var uname = "john";
            var uage = 28;
            return { name: uname, age: uage };
        }
        var user = null; // using `|` makes it a union type
        user = getUser();
        console.log(user); // Object { name: "john", age: 28 }
    }
    {
        function printStatus1(message, code) {
            switch (typeof code) {
                case "string":
                    console.log("".concat(message, ". Status code: ").concat(code.trim()));
                    break;
                default:
                    console.log("".concat(message, ". Status code: ").concat(code));
                    break;
            }
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
        function roleMessage1(role) {
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
        var str = "Hello";
        console.log(str); // Hello
    }
    {
        function printStatus2(message, code) {
            if (typeof code === "string") {
                console.log("".concat(message, ". Status code: ").concat(code.trim()));
            }
            else {
                console.log("".concat(message, ". Status code: ").concat(code));
            }
        }
        printStatus2("Request was successful", 200); // Request was successful. Status code: 200
        printStatus2("Resource was not found", "404"); // Resource was not found. Status code: 404
    }
    {
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
        roleMessage2("admin"); // You have admin permission on this site.
    }
    {
        function getFullName(user) {
            return user.fstName + " " + user.lstName;
        }
        function isEligibleForVoting(user) {
            return user.age >= 18;
        }
        var user = { fstName: "john", lstName: "smith", age: 32 };
        console.log(getFullName(user)); // john smith
        console.log(isEligibleForVoting(user)); // true
    }
}
{
    // LECTURE 14: FUNCTION RETURN TYPE
    function print_add(num1, num2) {
        console.log(num1 + num2);
        return;
    }
    console.log(print_add(12, 13)); // 25
}
{
    function greetUser(user) {
        var greetmsg = "Hello, " + user.name;
        console.log(greetmsg);
    }
    function isEligible(user) {
        console.log(user.age >= 18);
    }
    var greet = void 0;
    greet = greetUser;
    var user = { name: "john", age: 28 }; // Hello, john
    greet(user);
    function sum1(n1, n2) {
        return n1 + n2;
    }
    sum1(1, 2);
    // greet = sum1; // error
    greet = isEligible;
    greet(user); // true
}
{
    // LECTURE 16: FUNCTION TYPE FOR CALLBACK
    function sum2(num1, num2) {
        return num1 + num2;
    }
    var addNumbers = void 0;
    addNumbers = sum2;
    console.log(addNumbers(1, 2)); // 3
    function add(num1, num2) {
        console.log(num1 + num2);
    }
    add(1, 2); // 3
    function getResult(num1, num2, print) {
        var result = num1 + num2;
        print("Sum = ", result);
    }
    function display(msg, result) {
        console.log(msg + result);
    }
    getResult(12, 13, display); // Sum = 25
}
{
    // LECTURE 17: UNKNOWN TYPE IN TYPESCRIPT
    var inputVal = void 0;
    var uname = "Something";
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
    function greetUser1(name) {
        console.log("Hello, " + name);
    }
    greetUser1("John"); // Hello, John
    function createerror(errormsg, errorCode) {
        throw { message: errormsg, code: errorCode };
        // console.log(errormsg); // Unreachable code detected
    }
    function infinite() {
        while (true) {
            // ...
        }
    }
    //createerror('Internal server error', 500);     // Unreachable code detected
    console.log(greetUser1("Mark")); // Hello, Mark
    console.log(createerror("Page not found", 404)); // Uncaught: Object { message: "Page not found", code: 404 }
}

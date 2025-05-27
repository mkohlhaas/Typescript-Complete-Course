{
    // UNDERSTANDING DECORATORS

    // decorator factory
    function LoggerDecorator(logMsg: string) {
        function Logger(target: Function) { // User class is actually implemented as a Function
            console.log(logMsg);
            console.log(target);
        }
        return Logger;
    }

    // decorator factory
    function Greeting(template: string, elementId: string) {
        return (target: any) => {
            const user: User = new target();
            const container = document.getElementById(elementId)!;
            container.innerHTML = template;
            const h2 = container.querySelector('h2');
            if (h2) {
                h2.textContent = 'Hello Mr. ' + user.name;
            }
        }
    }

    // Not necessary to create an instance of the class to call the factory functions. They are always executed!
    // Factories are called top to bottom!
    // Class decorators themselves are called bottom to top!
    // All other kinds of decorators are called top to bottom!

    // activate "experimentalDecorators" in tsconfig.json
    @LoggerDecorator('This is a custom Logger...')
    @Greeting('<h2>Dynamic/Dummy Header (to be replaced by code)</h2>', 'container')
    class User {
        constructor(
            public name: string = 'John',
            public age: number = 28
        ) {
            console.log('User class constructor called...')
        }
    }

    const u = new User('Mary');
    console.log(u); // Object { name: "John", age: 28 }
}

{
    // Property Decorator
    function Capitalize(target: any, key: string): any {
        console.log(target); // Object { ... }
        console.log(key);    // name

        let currValue: string;

        // tsc knows currValue is used in getter and setter and fills it appropriately
        const getter = function () {
            return currValue.charAt(0).toUpperCase() + currValue.slice(1);
        }

        const setter = function (newValue: string) {
            currValue = newValue.toLowerCase()
        }

        return {
            get: getter,
            set: setter
        }
    }

    // Accessor Decorator
    function AccessLogger(_target: any, name: string, descriptor: PropertyDescriptor): PropertyDescriptor {
        console.log(descriptor); // Object { get: price(), set: price(value), enumerable: false, configurable: true }

        const oldGetter = descriptor.get;
        const oldSetter = descriptor.set;

        // forwarding to old getter
        descriptor.get = function () {
            console.log(`Getting value for property ${name}.`);
            if (oldGetter)
                return oldGetter.call(this);
            else
                return undefined;
        }

        // forwarding to old setter
        descriptor.set = function (value: number) {
            console.log(`Setting value for property ${name} to ${value}.`);
            if (oldSetter)
                oldSetter.call(this, value);
        }

        return descriptor;
    }

    class Product {
        @Capitalize
        name: string;

        private _price: number;

        @AccessLogger
        get price() {
            return this._price;
        }

        set price(value: number) {
            if (value > 0)
                this._price = value;
            else
                throw new Error("Price should be a value greater than zero");
        }

        constructor(name: string, price: number) {
            this.name = name;
            this._price = price;
        }
    }

    const p = new Product('apple', 2400);
    console.log(p.name);  // Apple
    console.log(p.price); // Getting value for property price. | 2400
    p.price = 2500;       // Setting value for property price to 2500.
}

{
    // Class Decorator
    function CLASS_DECORATOR(_target: any) {
        console.log('Class Decorator');
    }

    // Property Decorator
    function PROP_DECORATOR(_target: any, key: string): any {
        console.log('Property Decorator: ' + key);
    }

    // Property Decorator
    function ACC_DECORATOR(_target: any, name: string, _descriptor: PropertyDescriptor) {
        console.log('Accessor Decorator: ' + name);
    }

    // Parameter Decorator
    function PARAM_DECORATOR(_target: any, methodName: string, index: number) {
        console.log('Parameter Decorator: ' + methodName + ' ' + index);
    }

    // Method Decorator
    function METH_DECORATOR(_target: any, methodName: string, _descriptor: PropertyDescriptor) {
        console.log('Method Decorator: ' + methodName);
    }

    @CLASS_DECORATOR
    class Person {
        @PROP_DECORATOR
        name: string;

        constructor(name: string) {
            this.name = name;
        }

        @ACC_DECORATOR
        get greeting() {
            return 'Hello ' + this.name;
        }

        @METH_DECORATOR
        calculateAge(@PARAM_DECORATOR _dob: string) {
            //calculate date of birth ...
        }
    }

    const p = new Person('John');
    console.log(p);
}

{
    // RETURNING A CLASS FROM A DECORATOR

    // takes a class and returns a class
    function Logger(target: new (...args: any[]) => {}): any {
        class LoggingClass extends target {
            static company: string = 'Google';

            constructor(...args: any[]) {
                super(...args);
                console.log('Creating a new LoggingClass Instance...')
            }
        }
        return LoggingClass;
    }

    @Logger
    class Person {
        name: string;

        constructor(n: string) {
            this.name = n;
        }
    }

    const p = new Person('John'); // Creating a new LoggingClass Instance...
    console.log(p);               // Object { name: "John" }
}

{
    // CREATING A VALIDATION DECORATOR (WRONG IMPLEMENTATION!!!)

    // My own implementation needs cleaning up!!!

    type IValidator = {
        [prop: string]: {                 // e.g. User (prop) : username (propKey) = ['required', 'minlength']
            [propKey: string]: string[];
        }
    }

    // global object
    const validateObject: IValidator = {};

    // target.constructor.name == Class
    function required(target: any, propName: string) {
        console.log(target.constructor.name); // User
        console.log(propName);                // username
        if (validateObject[target.constructor.name]) {
            validateObject[target.constructor.name][propName] = [
                ...validateObject[target.constructor.name][propName], 'required'
            ]
        } else {
            validateObject[target.constructor.name] = {
                [propName]: ['required'],
            }
        }
    }

    // length doesn't show up in validateObject (not checkable!)
    function minlength(_length: number) {
        // return a function that adds minlength to validatorObject 
        return function (target: any, propName: string) {
            console.log('adding minlength to validatorObject');
            console.log(target.constructor.name); // User
            console.log(propName);                // username
            if (validateObject[target.constructor.name]) {
                validateObject[target.constructor.name][propName] = [
                    ...validateObject[target.constructor.name][propName], 'minlength'
                ]
            } else {
                validateObject[target.constructor.name] = {
                    [propName]: ['minlength'],
                }
            }
            console.log('Validator Object:');
            console.log(validateObject);
        }
    }

    function positiveNumber(target: any, propName: string) {
        console.log(target.constructor.name); // User
        console.log(propName);                // age
        if (validateObject[target.constructor.name]) {
            if (validateObject[target.constructor.name][propName]) {
                validateObject[target.constructor.name][propName] = [
                    ...validateObject[target.constructor.name][propName], 'positiveNumber'
                ]
            }
            else {
                validateObject[target.constructor.name][propName] =
                    ['positiveNumber']
            }
        } else {
            validateObject[target.constructor.name] = {
                [propName]: ['positiveNumber'],
            }
        }
    }

    function validate(obj: any): boolean {
        let isValid: boolean = true;

        const validateClass = validateObject[obj.constructor.name];

        if (validateClass)
            for (const propName in validateClass) {
                for (const propDecorator of validateClass[propName]) {
                    switch (propDecorator) {
                        case 'required':
                            console.log('checking required');
                            isValid &&= !!obj[propName];
                            break;
                        case 'minlength':
                            console.log('checking minlength');
                            isValid &&= obj[propName].length >= 3; // minlength hardcoded(!)
                            break;
                        case 'positiveNumber':
                            console.log('checking positiveNumber');
                            isValid &&= obj[propName] >= 0;
                            break;
                    }
                }
            }

        return isValid;
    }

    class User {
        @required
        @minlength(3)
        username: string;

        @positiveNumber
        age: number;

        constructor(uname: string, age: number) {
            this.username = uname;
            this.age = age;
        }
    }

    function validateUser(user: User) {
        if (validate(user))
            console.log('User created successfully!');
        else
            console.log("Created an invalid User!");
    }

    console.log('Validator Object:');
    console.log(validateObject); // Object { User: { username: [ "required" ], age: [ "positiveNumber" ] }

    const u1 = new User('John', 28);
    const u2 = new User('M', 30);

    validateUser(u1);
    validateUser(u2);
}

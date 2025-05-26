{
    // UNDERSTANDING DECORATORS

    function LoggerDecorator(_logMsg: string) {
        console.log('LOGGER DECORATOR FACTORY')
        function Logger(_target: Function) {
            console.log('LOGGER DECORATOR CALLED')
            //console.log(logMsg)
            //console.log(target);
        }
        return Logger;
    }

    function Template(template: string, elementId: string) {
        console.log('TEMPLATE DECORATOR FACTORY')
        return function (target: any) {
            console.log('TEMPLATE DECORATOR CALLED')
            const u = new target();
            const container = document.getElementById(elementId);
            if (container) {
                container.innerHTML = template;
                const h2 = container.querySelector('h2');
                if (h2) {
                    h2.textContent = 'Hello Mr. ' + u.name;
                }
            }
        }
    }

    @LoggerDecorator('This is custom Logger...')
    @Template('<h2>Dynamic Header</h2>', 'container')
    class User {
        name: string = 'John';
        age: number = 28;

        constructor() {
            console.log('User class constructor called...')
        }
    }

    const u = new User();
    console.log(u);
}

{
    // PROPERTY DECORATOR

    function Capitalize(_target: any, _propertyKey: string): any {
        let value: string;

        const getter = function () {
            return value.charAt(0).toUpperCase() + value.slice(1);
        }

        const setter = function (newValue: string) {
            value = newValue.toLowerCase()
        }

        return {
            get: getter,
            set: setter
        }
    }

    function AccessLogger(_target: any, name: string, descriptor: PropertyDescriptor) {
        const getter = descriptor.get;
        const setter = descriptor.set;

        descriptor.get = function () {
            console.log(`Accessing value for property ${name}...`);
            if (getter)
                return getter.call(this);
            else
                return undefined;
        }

        descriptor.set = function (value: number) {
            console.log(`Setting value for property ${name}...`);
            if (setter)
                setter.call(this, value);
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
    p.price = 3000;
    console.log(p.price);
}

{
    // WHEN A DECORATOR EXECUTES

    function CLS_DECORATOR(_target: any) {
        console.log('CLASS DECORATOR CALLED!');
    }

    function PROP_DECORATOR(_target: any, _propertyKey: string): any {
        console.log('PROPERTY DECORATOR CALLED!');
    }

    function ACC_DECORATOR(_target: any, _name: string, _descriptor: PropertyDescriptor) {
        console.log('ACCESSOR DECORATOR CALLED');
    }

    function PARAM_DECORATOR(_target: any, _paramName: string, _index: number) {
        console.log('PARAMETER DECORATOR CALLED');
    }

    function METH_DECORATOR(_target: any, _methodName: string, _descriptor: PropertyDescriptor) {
        console.log('METHOD DECORATOR CALLED!');
    }

    @CLS_DECORATOR
    class Person {
        @PROP_DECORATOR
        name: string;

        constructor(n: string) {
            this.name = n;
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

    const p = new Person('John');
    console.log(p);
}

{
    // CREATING A VALIDATION DECORATOR

    function required(target: any, propName: string) {
        validateObject[target.constructor.name] = {
            ...validateObject[target.constructor.name],
            [propName]: ['required']
        }
    }

    function minlength(_length: number) {
        return function (target: any, propName: string) {
            validateObject[target.constructor.name] = {
                ...validateObject[target.constructor.name],
                [propName]: ['minlength']
            }
        }
    }
    function positiveNumber(target: any, propName: string) {
        validateObject[target.constructor.name] = {
            ...validateObject[target.constructor.name],
            [propName]: ['positiveNumber']
        }
    }

    interface IValidator {
        [prop: string]: {
            [propKey: string]: string[]; // ['required', 'minlength']
        }
    }

    const validateObject: IValidator = {};

    function validate(obj: any): boolean {
        let isValid = true;

        const validateClass = validateObject[obj.constructor.name];
        if (!validateClass) {
            return true;
        }

        for (const prop in validateClass) {
            for (let validator of validateClass[prop]) {
                switch (validator) {
                    case 'required':
                        isValid = isValid && !!obj[prop];
                        break;
                    case 'minlength':
                        isValid = isValid && obj[prop].length < 3;
                        break;
                    case 'positiveNumber':
                        isValid = isValid && obj[prop].length < 0;
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
            alert("Invalid Input!");
    }

    const u1 = new User('John', 28);
    const u2 = new User('M', 30);

    validateUser(u1);
    validateUser(u2);
}

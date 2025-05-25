{
    // LECTURE 37: CREATING & USING CLASS (class)

    enum Gender {
        MALE = 'male',
        FEMALE = 'female'
    }

    class User {
        fstName: string;
        lstName: string;
        age: number;
        gender: Gender;

        constructor(fstName: string, lstName: string, age: number, gender: Gender) {
            this.fstName = fstName;
            this.lstName = lstName;
            this.age = age;
            this.gender = gender;
        }

        greetuser(salutation: string) {
            const msg = `Hello ${salutation}. ${this.fstName} ${this.lstName}!`;
            console.log(msg)
        }
    }

    const u1 = new User('John', 'Smith', 28, Gender.MALE);
    const u2 = new User('Merry', 'Jane', 32, Gender.FEMALE);
    const u3 = new User('Mark', 'Vought', 29, Gender.MALE);

    u1.greetuser('Mr');   // Hello Mr. John Smith!
    u2.greetuser('Mrs');  // Hello Mrs. Merry Jane!
    u3.greetuser('Mr');   // Hello Mr. Mark Vought!
}

{
    // LECTURE 39: ACCESS MODIFIERS (private, protected, public, readonly)

    class Employee {

        // Shorthand Property Initializer
        constructor(
            // public
            public empName: string,
            public baseLocation: string,
            public isEligible: boolean,
            // public read-only
            readonly id: number,
            // private 
            private salary: number,
            private hikePercent: number,
        ) {
        }

        // public (is default anyways)
        public getSalary() {
            if (this.isEligible) {
                return this.raiseSalary()
            }
            return this.salary;
        }

        private raiseSalary() {
            return this.salary + this.salary * this.hikePercent / 100;
        }
    }

    const e = new Employee('john smith', 'london', true, 101, 10000, 20);
    console.log(e.id);          // 101
    console.log(e.getSalary()); // 12000 

    // e.id = 200; // error: Cannot assign to 'empId' because it is a read-only property
}

{
    // LECTURE 32: INHERITANCE (extends, super)

    class Person {

        constructor(
            public name: string,
            protected dob: string,
            public gender: string) {
        }

        calculateAge(): number {
            console.log('calculateAge of Person called');
            return new Date().getFullYear() - new Date(this.dob).getFullYear();
        }
    }

    // Typescript allows only single inheritance
    class Employee extends Person {

        constructor(
            name: string,
            dob: string,
            gender: string,
            // new members
            public salary: number,
            public bonus: number
        ) {
            super(name, dob, gender);
        }

        getSalary() {
            return this.salary + this.bonus;
        }

        // overridden
        calculateAge(): number {
            console.log('calculateAge of Employee called');
            return super.calculateAge() + 11; // call method from super class
        }
    }

    const p = new Person('Mark', '01-01-1980', 'male');
    console.log(p.calculateAge()); // calculateAge of Person called | 45

    const e = new Employee('John', '08-30-1991', 'male', 10000, 2000);
    console.log(e);                // Object { name: "John", dob: "08-30-1991", gender: "male", salary: 10000, bonus: 2000 }
    console.log(e.calculateAge()); // calculateAge of Employee called | 45
    console.log(e.getSalary());    // 12000
}

{
    // LECTURE 44: GETTER & SETTER (set/get)

    {
        class Person {
            public name: string;
            private _age: number | null = null;

            constructor(name: string, age: number) {
                this.name = name;
                this._age = age;
            }

            // getter
            get age() {
                if (this._age != null)
                    return this._age;
                else
                    throw new Error('Age is not defined for person: ' + this.name + '!')
            }

            // setter
            set age(value: number) {
                if (value >= 0)
                    this._age = value;
                else
                    throw new Error('Age must be a positive value!')
            }
        }

        const p = new Person('John', 28);
        // p.age = -30;     // error: will throw an exception
        p.age -= 10;
        console.log(p.age); // 18
    }

    {
        // calculated properties

        class Circle {
            private _radius: number;

            constructor(radius: number) {
                this._radius = radius;
            }

            get radius() {
                return this._radius;
            }

            set radius(value: number) {
                this._radius = value;
            }

            // calculated property
            get diameter() {
                return this._radius * 2;
            }

            set diameter(value: number) {
                this._radius = value / 2;
            }
        }

        const c = new Circle(10);
        console.log(c.radius);   // 10
        console.log(c.diameter); // 20
    }
}

{
    // LECTURE 45: STATIC METHODS & PROPERTIES (static)

    class Employee {

        // Class Variable
        private static count: number = 0;

        constructor(
            public fstName: string,
            public lstName: string
        ) {
            Employee.count++;
        }

        get count() {
            return Employee.count;
        }

        // Class Method
        static sayHello() {
            return 'Hi There!';
        }
    }

    const e1 = new Employee('John', 'Smith');
    console.log(e1.count);            // 1

    const e2 = new Employee('John', 'Smith');
    console.log(e2.count);            // 2

    const e3 = new Employee('John', 'Smith');
    console.log(e3.count);            // 3

    console.log(Employee.sayHello()); // Hi There!
}

{
    // LECTURE 46: ABSTRACT CLASS (abstract)

    // abstract/virtual class
    abstract class Employee {

        constructor(
            public fstName: string,
            public lstName: string
        ) {
            this.fstName = fstName;
            this.lstName = lstName;
        }

        // abstract/virtual method
        abstract calcSalary(): number;
    }

    class PermanentEmployee extends Employee {

        constructor(
            fstName: string,
            lstName: string,
            public monthlySalary: number
        ) {
            super(fstName, lstName);
        }

        // overridden
        calcSalary(): number {
            return this.monthlySalary * 12;
        }
    }

    class ContractEmployee extends Employee {

        constructor(
            fstName: string,
            lstName: string,
            public hourlySalary: number
        ) {
            super(fstName, lstName);
        }

        // overridden
        calcSalary(): number {
            return this.hourlySalary * 9 * 365;
        }
    }

    // new Employee('John', 'Smith'); // error: Cannot create an instance of an abstract class.

    const e1 = new PermanentEmployee('John', 'Smith', 1000);
    console.log(e1.calcSalary());     // 12000 

    const e2 = new ContractEmployee('Mark', 'Vought', 10);
    console.log(e2.calcSalary());     // 32850
}

{
    // LECTURE 47: PRIVATE CONSTRUCTOR & SINGLETON PATTERN

    class Person {
        private static _instance?: Person; // `?` actually not necesssary (!?)

        private constructor() { }

        static getInstance() {
            if (Person._instance) {
                // person exists; return it
                return Person._instance;
            }
            else {
                // person doesn't exists; create and return it
                Person._instance = new Person();
                return Person._instance;
            }
        }
    }

    // new Person(); // error: Constructor of class 'Person' is private and only accessible within the class declaration.

    const person1 = Person.getInstance();
    const person2 = Person.getInstance();

    console.log(person1 === person2); // true
}

{
    // LECTURE 48: INTERFACE (interface, implements, extends)

    interface Roles {
        getRole(): string;
    }

    // could extend several interfaces (separated by comma)
    interface User extends Roles {
        fstName: string;
        lstName: string;
        readonly company: string; // read-only property
        location?: string;        // optional  property

        greetUser(): void;
        getFullName(): string;
    }

    // could implement several interfaces (separated by comma)
    class Admin implements User {
        age: number = 30;
        company: string = 'Google';

        constructor(
            public fstName: string,
            public lstName: string) {
        }

        greetUser() {
            console.log("Hello Admin: " + this.getFullName())
        }

        getFullName(): string {
            return this.fstName + ' ' + this.lstName;
        }

        getRole(): string {
            return 'admin';
        }
    }

    class Member implements User {
        company: string = 'Google';
        location?: string | undefined = 'London';

        constructor(
            public fstName: string,
            public lstName: string,
            location?: string
        ) {
            this.location = location;
        }

        greetUser() {
            console.log("Hello Member: " + this.getFullName())
        }

        getFullName(): string {
            return this.fstName + ' ' + this.lstName;
        }

        getRole(): string {
            return 'member';
        }
    }

    // can use interface as a type
    function displayGreetMessage(user: User) {
        user.greetUser();
    }

    let admin: User;
    admin = new Admin('John', 'Smith');
    console.log(admin.getRole());  // admin
    displayGreetMessage(admin);    // Hello Admin: John Smith

    const member = new Member('Merry', 'Jane');
    console.log(member.getRole()); // member
    displayGreetMessage(member);   // Hello Member: Merry Jane
}

{
    // LECTURE 51: INTERFACE AS FUNCTION TYPE

    {
        // type alias (preferred)

        type SumFn = (n1: number, n2: number) => number;

        let add: SumFn;

        add = (n1: number, n2: number) => {
            return n1 + n2;
        }
    }

    {
        // interface acts as a (function) type (interface abused)

        interface SumFn {
            (n1: number, n2: number): number
        }

        let add: SumFn;

        add = (n1: number, n2: number) => {
            return n1 + n2;
        }
    }
}

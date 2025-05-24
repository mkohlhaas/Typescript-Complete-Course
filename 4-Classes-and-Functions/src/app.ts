{
    // LECTURE 37: CREATING & USING CLASS (class)

    enum Gender {
        MALE = 'male',
        FEMALE = 'female'
    }

    class User {
        firstname: string;
        lastname: string;
        age: number;
        gender: Gender;

        constructor(fstName: string, lstName: string, age: number, gender: Gender) {
            this.firstname = fstName;
            this.lastname = lstName;
            this.age = age;
            this.gender = gender;
        }

        greetuser(salutation: string) {
            const msg = `Hello ${salutation}. ${this.firstname} ${this.lastname}!`;
            console.log(msg)
        }
    }

    const user1 = new User('John', 'Smith', 28, Gender.MALE);
    const user2 = new User('Merry', 'Jane', 32, Gender.FEMALE);
    const user3 = new User('Mark', 'Vought', 29, Gender.MALE);

    user1.greetuser('Mr');   // Hello Mr. John Smith!
    user2.greetuser('Mrs');  // Hello Mrs. Merry Jane!
    user3.greetuser('Mr');   // Hello Mr. Mark Vought!
}


{
    // LECTURE 39: ACCESS MODIFIERS (private, public, readonly)

    class Employee {
        constructor(public empName: string, //
            private salary: number,         //
            public baseLocation: string,    //
            public isEligible: boolean,     //
            private hikePercent: number,    //
            public readonly empId: number) {
        }

        public getSalary() {
            if (this.isEligible) {
                return this.getNewsalary()
            }
            return this.salary;
        }

        private getNewsalary() {
            return this.salary + this.salary * this.hikePercent / 100;
        }
    }

    const employee = new Employee('john smith', 10000, 'london', true, 20, 101);
    console.log(employee.getSalary()); // 12000 

    // employee.empId = 200; // error: Cannot assign to 'empId' because it is a read-only property
}

{
    // LECTURE 32: INHERITANCE (extends)

    class Person {
        name: string;
        protected dob: string;
        gender: string;

        constructor(name: string, dob: string, gender: string) {
            this.name = name;
            this.dob = dob;
            this.gender = gender;
        }

        calculateAge(): number {
            console.log('calculateAge of Person called');
            return new Date().getFullYear() - new Date(this.dob).getFullYear();
        }
    }

    class Employee extends Person {
        salary: number;
        bonus: number;

        constructor(name: string, dob: string, gen: string, salary: number, bonus: number) {
            super(name, dob, gen);
            this.salary = salary;
            this.bonus = bonus;
        }

        getSalary() {
            return this.salary + this.bonus;
        }

        calculateAge(): number {
            console.log('calculateAge of Employee called');
            return 2024 - new Date(this.dob).getFullYear();
        }
    }

    const p = new Person('Mark', '01-01-1980', 'male');
    console.log(p.calculateAge()); // calculateAge of Person called | 45

    const e = new Employee('john', '08-30-1991', 'male', 10000, 2000);
    console.log(e.calculateAge()); // Calculate Age of Employee called | 33
}


{
    // LECTURE 44: GETTER & SETTER (set/get)

    {
        class Person {
            public name: string;
            private _age: number | null = null;

            get age() {
                if (this._age != null) {
                    return this._age;
                }
                throw new Error('Age is not defined for person: ' + this.name + '!')
            }

            set age(value: number) {
                if (value >= 0)
                    this._age = value;
                else
                    throw new Error('Age must be a positive value!')
            }

            constructor(name: string, age: number) {
                this.name = name;
                this._age = age;
            }
        }

        const person = new Person('John', 28);
        // person.age = -10;     // error: will throw an exception
        console.log(person.age); // 28
    }

    {
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

            // derived property
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
    // LECTURE 45: STATIC METHODS & PROPERTIES

    class Employee {
        public firstname: string;
        public lastname: string;
        public static count: number = 0; // class variable

        constructor(firstname: string, lastname: string) {
            this.firstname = firstname;
            this.lastname = lastname;
            Employee.count++;
        }

        // class method
        static sayHello() {
            return 'Hi There!';
        }
    }

    new Employee('John', 'Smith');
    console.log(Employee.count);      // 1

    new Employee('John', 'Smith');
    console.log(Employee.count);      // 2

    new Employee('John', 'Smith');
    console.log(Employee.count);      // 3

    console.log(Employee.sayHello()); // Hi There!
}


{
    // LECTURE 45: ABSTRACT CLASS

    // abstract/virtual class
    abstract class Employee {
        public fstName: string;
        public lstName: string;

        // abstract/virtual method
        abstract getSalary(): number;

        constructor(fstName: string, lstName: string) {
            this.fstName = fstName;
            this.lstName = lstName;
        }
    }

    class PermanentEmployee extends Employee {
        monthlySalary: number;

        constructor(fstName: string, lstName: string, salary: number) {
            super(fstName, lstName);
            this.monthlySalary = salary;
        }

        // overridden
        getSalary(): number {
            return this.monthlySalary * 12;
        }
    }

    class ContractEmployee extends Employee {
        hourlySalary: number;

        constructor(fstName: string, lstName: string, salary: number) {
            super(fstName, lstName);
            this.hourlySalary = salary;
        }

        // overridden
        getSalary(): number {
            return this.hourlySalary * 9 * 365;
        }
    }

    const e1 = new PermanentEmployee('John', 'Smith', 1000);
    console.log(e1.getSalary()); // 12000 

    const e2 = new ContractEmployee('Mark', 'Vought', 10);
    console.log(e2.getSalary()); // 32850
}

{
    // LECTURE 46: PRIVATE CONSTRUCTOR & SINGLETON PATTERN

    class Person {
        private static _instance: Person;

        private constructor() {

        }

        static getInstance() {
            // person exists; return it
            if (Person._instance) {
                return Person._instance;
            }
            // person doesn't exists; create and return it
            else {
                Person._instance = new Person();
                return Person._instance;
            }
        }
    }

    // new Person(); // error: Constructor of class 'Person' is private and only accessible within the class declaration

    const person1 = Person.getInstance();
    const person2 = Person.getInstance();

    console.log(person1 === person2); // true
}

// LECTURE 48: INTERFACE
{
    interface Roles {
        getRole(): string;
    }

    interface User extends Roles {
        fstName: string;
        lstName: string;
        readonly company: string;
        location?: string;

        greetUser(): void;
        getFullName(): string;
    }

    class Admin implements User {
        age: number = 30;
        company: string = 'Google';

        constructor(public fstName: string, public lstName: string) {
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

        constructor(public fstName: string, public lstName: string, location?: string) {
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

    //type SumFn = (num1: number, num2: number) => number;

    interface SumFn {
        (num1: number, num2: number): number
    }

    let add: SumFn;

    add = (n1: number, n2: number) => {
        return n1 + n2;
    }
}

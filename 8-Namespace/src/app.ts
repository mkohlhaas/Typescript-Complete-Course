import * as actions from './userUtils/user-actions';
import User from './models/user';

const u1 = actions.createUser('John', 28, 'male');
const u2 = actions.createUser('Mery', 30, 'female');
const u3 = new User('Mike', 34, 'male');

console.log(u1, u2, u3);

console.log(actions.getUsers());

console.log("Application is running!");

// DOM Elements 

const expType = document.getElementById('expense-type')! as HTMLSelectElement;
const expDesc = document.getElementById('desc')! as HTMLInputElement;
const expAmt = document.getElementById('amount')! as HTMLInputElement;
const addExpBtn = document.querySelector('.add-expense-btn')! as HTMLButtonElement;
const debitDiv = document.querySelector('.expense-debit-item-container')! as HTMLDivElement;
const creditDiv = document.querySelector('.expense-credit-item-container')! as HTMLDivElement;
const totalAmtDiv = document.querySelector('.total-expense-amount')! as HTMLDivElement;

// Globals

let expenseItems: Expense[] = [];
let balance: number = 0;

// Enums

enum ExpenseType {
    CREDIT,
    DEBIT,
}

// Classes

class Expense {
    private static currentId: number = 0;
    readonly id: number = 0;

    constructor(
        public type: ExpenseType = ExpenseType.DEBIT,
        public description: string = '',
        public amount: number = 0
    ) {
        this.id = ++Expense.currentId;
    }
}

// Callbacks

addExpBtn.addEventListener('click', function (event) {
    event.preventDefault();

    let type = expType.value === 'credit' ? ExpenseType.CREDIT : ExpenseType.DEBIT;
    const exp = new Expense(type, expDesc.value, +expAmt.value);
    expenseItems.push(exp);

    displayExpenseItems()

    showBalance();
})

// Functions

function displayExpenseItems() {
    debitDiv.innerHTML = '';
    creditDiv.innerHTML = '';

    for (let i = 0; i < expenseItems.length; i++) {
        let expItem = expenseItems[i];
        let containerDiv = expItem.type === ExpenseType.CREDIT ? creditDiv : debitDiv;

        let cssClass = expItem.type === ExpenseType.CREDIT ? 'credit-item' : 'debit-item';
        let template = `
        <div class="${cssClass}">
            <div class="exp-desc">${expItem.description}</div>
            <div class="exp-amt">${expItem.amount}</div>
            <div class="exp-delete">
                <button class="delete-expense" onclick="deleteExpense(${expItem.id})">X</button>
            </div>
        </div>
        `;
        containerDiv?.insertAdjacentHTML('beforeend', template);
    }
}

function calcBalance() {
    return expenseItems.reduce((total, exp) => {
        let amount: number;
        if (exp.type === ExpenseType.CREDIT)
            amount = exp.amount;
        else
            amount = -exp.amount;

        return total + amount;
    }, 0)
}

function showTotal() {
    totalAmtDiv.textContent = 'Aval. Balance: ' + balance.toString();
}

function removeExpense(id: number) {
    // find expense
    const exp = expenseItems.find((el) => {
        return el.id === id;
    }) as Expense;
    // remove expense
    let index: number = expenseItems.indexOf(exp)
    expenseItems.splice(index, 1);
    // update balance
    updateBalance(exp);
}

function deleteExpense(id: number) {
    removeExpense(id);
    // update UI & balance
    displayExpenseItems();
}

function updateBalance(expense: Expense) {
    console.log(expense);
    showBalance();
}

function showBalance() {
    balance = calcBalance();
    showTotal();
}

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

    let expenseType = expType.value === 'credit' ? ExpenseType.CREDIT : ExpenseType.DEBIT;
    const exp = new Expense(expenseType, expDesc.value, +expAmt.value); // `+` -> converts to number
    expenseItems.push(exp);

    displayExpenseItems()
    updateBalance();
})

// Functions

//   expense

function deleteExpense(id: number) {
    removeExpense(id);
    // update UI 
    displayExpenseItems();
    updateBalance();
}

function removeExpense(id: number) {
    // find expense
    const exp = expenseItems.find((expItem) => {
        return expItem.id === id;
    }) as Expense;
    // remove expense
    let index = expenseItems.indexOf(exp)
    expenseItems.splice(index, 1);
}

function displayExpenseItems() {
    // clear UI
    debitDiv.innerHTML = '';
    creditDiv.innerHTML = '';

    // render expenses
    for (const expItem of expenseItems) {
        let containerDiv = expItem.type ? debitDiv : creditDiv;
        let cssClass = expItem.type ? 'debit-item' : 'credit-item';
        let expDiv = `
        <div class="${cssClass}">
            <div class="exp-desc">${expItem.description}</div>
            <div class="exp-amt">${expItem.amount}</div>
            <div class="exp-delete">
                <button class="delete-expense" onclick="deleteExpense(${expItem.id})">X</button>
            </div>
        </div>
        `;
        containerDiv?.insertAdjacentHTML('beforeend', expDiv);
    }
}

//   balance

function updateBalance() {
    calcBalance();
    showBalance();
}

function calcBalance() {
    balance = expenseItems.reduce((total, exp) => {
        if (exp.type === ExpenseType.CREDIT)
            return total + exp.amount;
        else
            return total - exp.amount;
    }, 0)
}

function showBalance() {
    totalAmtDiv.textContent = 'Balance: ' + balance.toString();
}

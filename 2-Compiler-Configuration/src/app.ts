const button = document.getElementById('btn')!; // note `!` (won't return null)

function clickHandler(message: string) {
    console.log(message);
}

button.addEventListener('click', clickHandler.bind(null, 'Button is clicked'))

const map = new Map(); // works because lib is set properly

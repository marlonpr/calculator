class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.currentOperand = '';
        this.equalsButton=0;        
    }

    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    delete() {
        if(this.equalsButton==1){
            this.equalsButton=0;
            this.currentOperand = this.currentOperand.toString();   
        }        
        this.currentOperand = this.currentOperand.slice(0,-1);
    }

    appendNumber(number) {
        if(number === '.' && this.currentOperand.includes('.')) return;
        if(this.equalsButton==1){
            this.equalsButton=0;
            this.currentOperand = '';   
        }
        this.currentOperand += number;
    }

    chooseOperation(operation) {
        if(this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = Math.round((prev + current)*10000000000)/10000000000;
                break;
            case '-':
                computation = Math.round((prev - current)*10000000000)/10000000000;
                break;
            case '*':
                computation = Math.round((prev * current)*10000000000)/10000000000;
                break;
            case '/':
                computation = Math.round((prev / current)*10000000000)/10000000000;
                break;
                default:
                    return;        
        }
        if(computation == Infinity) {
            alert("Can't divide by zero");
            computation = '';
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        }   else {
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        }   else {
            return integerDisplay
        }
        
    }

    updateDisplay() {
        this.currentOperandTextElement.textContent =
        this.getDisplayNumber(this.currentOperand);
        this.previousOperandTextElement.textContent = this.previousOperand;
        if(this.operation != undefined) {
            this.previousOperandTextElement.textContent = `${this.previousOperand} ${this.operation}`;
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.appendNumber(button.textContent);
        calculator.updateDisplay();
    })
});

addEventListener('keydown', e => {
    if(isNaN(e.key)) return;
    calculator.appendNumber(e.key);
    calculator.updateDisplay();
});

addEventListener('keydown', e => {
    if(e.key == '.'){
        calculator.appendNumber(e.key);
        calculator.updateDisplay();
    }

});

addEventListener('keydown', e => {
    if(e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/') {
        calculator.chooseOperation(e.key);
        calculator.updateDisplay();
    }
});

addEventListener('keydown', e => {
    if(e.key == 'Backspace') {
        calculator.delete();
        calculator.updateDisplay();
    }
});

addEventListener('keydown', e => {
    if(e.key == 'Enter') {
        calculator.compute();
        calculator.updateDisplay();
        calculator.equalsButton=1;
    }
});

addEventListener('keydown', e => {
    if(e.key == 'Space') {
        calculator.clear();
        calculator.updateDisplay();
    }
});


operationButtons.forEach(button => {
    button.addEventListener('click', ()=>{
        calculator.chooseOperation(button.textContent)
        calculator.updateDisplay()
    })
});

equalsButton.addEventListener('click', ()=>{
    calculator.compute();
    calculator.updateDisplay();
    calculator.equalsButton=1;
});

allClearButton.addEventListener('click', ()=>{
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', ()=>{
    calculator.delete();
    calculator.updateDisplay();
});





  
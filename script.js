class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  roll(number, sides) {
    number = parseInt(number)
    sides = parseInt(sides)
    let total = 0
    for (let i = 0; i < number; i++) {
      total += this.getRandomNumber(1, sides)
    }
    return total
  }

  getRandomNumber(x, y) {
    return Math.floor(Math.random() * (y - x + 1)) + x;
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return
    if (this.previousOperand !== '') {
      this.compute()
    }
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  compute() {
    let computation
    let prev;
    let current;
    current = parseFloat(this.currentOperand)
    prev = parseFloat(this.previousOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch (this.operation) {
      case '+':
        computation = prev + current
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      default:
        return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  getDisplayNumber(number) {
    console.log({number})
    if(number.toString().includes('d')){
      if(number.toString()[number.toString().length - 1] === 'd' && number.toString()[number.toString().length - 2] === 'd'){
        this.currentOperand = number.toString().substring(0, number.toString().length - 1)
        return this.currentOperand
      }
      if(number.toString()[number.toString().length - 1] === 'd'){
        return number
      }
      let diceString = this.currentOperand.split('d');
      this.currentOperand = this.roll(diceString[0], diceString[1])
      return this.currentOperand
    }else{
      return number
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

document.addEventListener('keydown', function(event) {
  // Check if the pressed key is a number
  if (event.key >= '0' && event.key <= '9') {
    calculator.appendNumber(event.key)
    calculator.updateDisplay()
  }
  if(event.key === 'Enter'){
    calculator.compute()
    calculator.updateDisplay()
  }
  if(event.key === 'Backspace'){
    calculator.delete()
    calculator.updateDisplay()
  }
  if(event.key === '+'){
    calculator.chooseOperation('+')
    calculator.updateDisplay()
  }
  if(event.key === '-'){
    calculator.chooseOperation('-')
    calculator.updateDisplay()
  }
  if(event.key === 'd' || event.key === '*' || event.key === 'D'){
    calculator.appendNumber('d')
    calculator.updateDisplay()
  }
});

numberButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})
class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") this.compute();
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "*":
        computation = prev * current;
        break;
      case "÷":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    /* this.currentOperand.style.color = "red"; */
    this.operation = undefined;
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];
    let numberDisplay;

    if (isNaN(integerDigits)) numberDisplay = "";
    else
      numberDisplay = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });

    if (decimalDigits != null && numberDisplay == "0")
      return `0.${decimalDigits}`;
    else if (decimalDigits != null) return `${numberDisplay}.${decimalDigits}`;
    else return numberDisplay;
  }

  updateDisplay() {
    if (this.currentOperand == "") this.currentOperandTextElement.innerText = 0;
    else
      this.currentOperandTextElement.innerText = this.getDisplayNumber(
        this.currentOperand,
      );

    if (this.operation != null)
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(
        this.previousOperand,
      )} ${this.operation}`;
    else this.previousOperandTextElement.innerText = "";
  }

  updateDisplayClear() {
    this.currentOperandTextElement.innerText = "0";
    this.previousOperandTextElement.innerText = "";
  }
}

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const previousOperandTextElement = document.querySelector(
  "[data-previous-operand]",
);
const currentOperandTextElement = document.querySelector(
  "[data-current-operand]",
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement,
);

calculator.updateDisplayClear();

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
    currentOperandTextElement.style.color = "#ffffff";
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
    currentOperandTextElement.style.color = "#ffffff";
  });
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplayClear();
  currentOperandTextElement.style.color = "#ffffff";
});

deleteButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
  currentOperandTextElement.style.color = "#ffffff";
});

equalsButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
  if (currentOperandTextElement.innerText != 0) {
    previousOperandTextElement.innerText = "=";
    currentOperandTextElement.style.color = "#ffd900";
  }
});

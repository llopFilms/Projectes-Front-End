
let equation = [];

const form = document.getElementById("calc-form");
form.addEventListener("submit", (element) => element.preventDefault());

const output = document.getElementById("output");
const operand_btns = document.querySelectorAll("[data-type=operand]");

let is_operator = false;
operand_btns.forEach((btn) => {
  btn.addEventListener("click", (element) => {
    if (output.value == "0") output.value = element.target.value;
    else if (output.value.includes(".")) output.value = `${output.value}${element.target.value.replace(".", "")}`;
    else if (is_operator) {
      output.value = element.target.value;
      is_operator = false;
    }
    else output.value = `${output.value}${element.target.value}`;
    console.log(output.value);
  });
});

const operator_btns = document.querySelectorAll("[data-type=operator]");
const remove_active = () => operator_btns.forEach((btn) => btn.classList.remove("active"));

operator_btns.forEach((btn) => {
  btn.addEventListener("click", (element) => {
    remove_active();
    element.currentTarget.classList.add("active");

    switch(element.target.value) {
      case "%":
        output.value = parseFloat(output.value) / 100;
        break;
      case "invert":
        output.value = parseFloat(output.value) * -1;
        break;
      case "=":
        equation.push(output.value);
        output.value = eval(equation.join(""));
        equation = [];
      default:
        let last_item = equation[equation.length - 1];
        const operators = ["/", "*", "+", "-"];
        if (operators.includes(last_item) && is_operator) {
          equation.pop();
          equation.push(element.target.value);
        } else {
          equation.push(output.value);
          equation.push(element.target.value);
        }
        is_operator = true;
        break;
    }
  });
});


let equation = [];

const form = document.getElementById("calc-form");
form.addEventListener("submit", (element) => element.preventDefault());
const output = document.getElementById("output");
output.value = 0;
const operand_btns = document.querySelectorAll("[data-type=operand]");

let is_operator = false;
operand_btns.forEach((btn) => {
  btn.addEventListener("click", (element) => {
    if (is_operator) {
      output.value = element.target.value;
      is_operator = false;
    } else if (output.value == "0" && element.target.value == ".")
      output.value = "0.";
    else if (output.value.includes("."))
      output.value = `${output.value}${element.target.value.replace(".", "")}`;
    else if (output.value == "0") output.value = element.target.value;
    else output.value = `${output.value}${element.target.value}`;
    c_btn();

    console.log(output.value);
    console.log (typeof output.value);
    console.log(equation);
    console.log(is_operator);
  });
});

const operator_btns = document.querySelectorAll("[data-type=operator]");
const remove_active = () =>
  operator_btns.forEach((btn) => btn.classList.remove("active"));

let is_equal = false;
operator_btns.forEach((btn) => {
  btn.addEventListener("click", (element) => {
    remove_active();
    element.currentTarget.classList.add("active");

    switch (element.target.value) {
      case "%":
        output.value = parseFloat(output.value) / 100;
        break;
      case "invert":
        output.value = parseFloat(output.value) * -1;
        break;
      case "=":
        equation.push(output.value);
        output.value = eval(equation.join(""));
        console.log(equation);
        equation = [];
        is_equal = true;
        break;
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
    c_btn();

    console.log(output.value);
    console.log(is_operator);
    console.log(is_equal);
    console.log(equation);
  });
});

const clear_btn = document.querySelector("[data-type=clear]");

const c_btn = () => {
  if (output.value == 0 || output.value == "-" || is_operator || is_equal)
    clear_btn.innerText = "AC";
  else clear_btn.innerText = "C";
};

clear_btn.addEventListener("click", () => {
  if (
    is_operator ||
    is_equal ||
    output.value == "" ||
    output.value.length == 1 ||
    (output.value.length == 2 && output.value.includes("-"))
  ) {
    output.value = 0;
    equation = [];
  } else output.value = output.value.substring(0, output.value.length - 1);
  c_btn();
  remove_active();
  is_equal = false;

  console.log(
    output.value.length,
    output.value,
    is_operator,
    is_equal,
    equation,
  );
});

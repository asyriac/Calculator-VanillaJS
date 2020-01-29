const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const allClear = document.querySelector("[data-all-clear]");
const del = document.querySelector("[data-delete]");
const previous = document.getElementById("previous");
const current = document.getElementById("current");

let operand1 = "";
let operator = "";
let operand2 = "";
let equalPressed = false;

function resetVal() {
  operand1 = "";
  operand2 = "";
  operator = "";
  current.innerText = operand1;
  previous.innerText = operand2;
}

function remove() {
  operand1 = operand1.slice(0, -1);
  current.innerText = operand1;
}

function append(index) {
  if (equalPressed == true) {
    resetVal();
    equalPressed = false;
  }
  if (numberButtons[index].innerText === "." && operand1.includes(".")) return;
  operand1 += numberButtons[index].innerText;
  current.innerText = operand1;
}

function ops(index) {
  equalPressed = false;
  if (operand2 != "") operand2 = eval().toString();
  else {
    operand2 = operand1;
  }
  operator = operationButtons[index].innerText;
  operand1 = "";
  previous.innerText = operand2 + " " + operator;
  current.innerText = "";
}

function eval() {
  if (operand2 === "") return;
  let res;
  if (operator === "+") res = parseFloat(operand2) + parseFloat(operand1);
  else if (operator === "-") res = parseFloat(operand2) - parseFloat(operand1);
  else if (operator === "*") res = parseFloat(operand2) * parseFloat(operand1);
  else if (operator === "/") res = parseFloat(operand2) / parseFloat(operand1);
  return res;
}

function equalsEval() {
  equalPressed = true;
  operand1 = eval().toString();
  operand2 = "";
  previous.innerText = operand2;
  current.innerText = operand1;
}

numberButtons.forEach(function(button, index) {
  button.addEventListener("click", function() {
    append(index);
  });
});

operationButtons.forEach(function(button, index) {
  button.addEventListener("click", function() {
    ops(index);
  });
});

equalsButton.addEventListener("click", equalsEval);
allClear.addEventListener("click", resetVal);
del.addEventListener("click", remove);

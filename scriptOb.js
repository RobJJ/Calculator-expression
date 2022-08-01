"use strict";
//
//
//////////////////////////////////////////////////////////////////////
/////////////////////////////   SELECTORS
//////////////////////////////////////////////////////////////////////
//
//
const numberButtons = document.querySelectorAll(".numbers"); // NodeList
const operations = document.querySelectorAll(".operations"); // NodeList
//
const equalsButton = document.getElementById("equals");
const output = document.getElementById("output");
const clearButton = document.getElementById("clear");
//
//
//////////////////////////////////////////////////////////////////////
/////////////////////////////   CALC FUNCTIONS
//////////////////////////////////////////////////////////////////////
//
//
const setUp = function (string) {
  //
  const numbers = [];
  const operators = [];
  //
  let numberCollector = "";
  //
  [...string].forEach((ele, idx, arr) => {
    if (Number(ele) || ele === "0" || ele === "." || idx === 0) {
      numberCollector += ele;
      if (idx === arr.length - 1) numbers.push(numberCollector); // If last element, push it
    } else {
      if (numberCollector.length === 0) return; //If there are no numbers to push, dont push
      operators.push(ele);
      numbers.push(numberCollector);
      numberCollector = "";
    }
  });
  return {
    numbers: numbers,
    operators: operators,
  };
};
// This function - sepUp - returns an object with the current numbers and operators as arrays
// We will pass this func to the Compute Function so it has access to current information
// Compute function should return a value. This value must be put up on display for user.
// When equals is clicked again, Compute will call setUp again, which will return the updated information
//
// An object that contains operator keys that return their associated functions for Math operations
//
const doMath = {
  "+": function (a, b) {
    return a + b;
  },
  "-": function (a, b) {
    return a - b;
  },
  x: function (a, b) {
    return a * b;
  },
  "%": function (a, b) {
    return a / b;
  },
};
//
// The compute function, takes setUp and current display text as inputs
// Recursively computes the information until only 1 number remains
// Returns this number
//
function compute(func, currentString) {
  const displayObj = func(currentString); // Gets setUp object with numbers and operators as keys and arrays as values
  let order = ["%", "x", "-", "+"];
  //
  function recursion() {
    if (displayObj.numbers.length === 1) return;
    //
    while (displayObj.operators.includes(order[0])) {
      let pos = displayObj.operators.indexOf(order[0]);
      //
      let first = displayObj.numbers[pos];
      let second = displayObj.numbers[pos + 1];
      let value = doMath[order[0]](Number(first), Number(second));
      //
      displayObj.numbers.splice(pos, 2, value);
      displayObj.operators.splice(pos, 1);
    }
    order.shift();
    recursion();
  }
  recursion();
  return displayObj.numbers[0];
}
//
// Updates display with returned value of compute.
//
const equalsFunc = function () {
  const currentString = output.textContent;
  output.textContent = compute(setUp, currentString);
};
//
//
//
//////////////////////////////////////////////////////////////////////
/////////////////////////////   BASIC BUTTONS
//////////////////////////////////////////////////////////////////////
//
//
const numberClicked = function (e) {
  output.textContent += e.target.textContent;
};
//
//
const clearClicked = function () {
  output.textContent = "";
};
//
//
const operatorClicked = function (e) {
  if (!output.textContent) return;
  const clickedValue = e.target.textContent;
  const lastIndex = output.textContent.length - 1; //Last idx of output.textContext
  const lastValue = output.textContent[lastIndex];
  const operators = ["%", "x", "-", "+"];
  if (operators.includes(lastValue)) {
    // The Last ele IS an operator
    output.textContent = output.textContent.slice(0, -1).concat(clickedValue);
  } else {
    // The Last ele IS NOT an operator
    output.textContent += clickedValue;
  }
};
//
//
//////////////////////////////////////////////////////////////////////
/////////////////////////////   EVENT LISTENERS
//////////////////////////////////////////////////////////////////////
//
equalsButton.addEventListener("click", equalsFunc);
//
numberButtons.forEach((ele) => ele.addEventListener("click", numberClicked));
//
operations.forEach((ele) => ele.addEventListener("click", operatorClicked));
//
clearButton.addEventListener("click", clearClicked);
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

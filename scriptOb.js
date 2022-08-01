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
const numberOne = document.getElementById("one");
const equalsButton = document.getElementById("equals");
const output = document.getElementById("output");
const clearButton = document.getElementById("clear");
//
//
//////////////////////////////////////////////////////////////////////
/////////////////////////////   CALC FUNC
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
// We should now use this object as a value to pass into the compute function
// Compute function should return a value. This value must be put up on display for user.
// When equals is clicked again, setUp will run from start and take the new string as input. Cycle
//
//
// A recursive function that makes its way through the operators available until numbers array is length 1. At that point, return that number
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

function compute(func, currentString) {
  const displayObj = func(currentString); // Gets setUp object with numbers and operators as keys and arrays as values
  console.log("DisplayObject", displayObj);
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

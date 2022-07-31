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
/////////////////////////////   CALC OBJECT
//////////////////////////////////////////////////////////////////////
//
//
// const importedString = "30-20%2+9+3x7"; //This is the only variable that connects 'backend' to 'frontend'
const importedString = "2+5x2-10%2";
//
const setUp = function (string) {
  //
  const numbers = [];
  const operators = [];
  //
  let numberCollector = "";
  //
  [...string].forEach((ele, idx, arr) => {
    if (Number(ele) || ele === "0" || ele === ".") {
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

function compute(func) {
  const displayObj = func(importedString); // Gets setUp object with numbers and operators as keys and arrays as values
  console.log("DisplayObject", displayObj);
  let order = ["%", "x", "-", "+"];
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
  function recursion() {
    if (displayObj.numbers.length === 1) return;
    //
    while (displayObj.operators.includes(order[0])) {
      console.log(`Order: ${order[0]} is being used`);
      let pos = displayObj.operators.indexOf(order[0]);
      //
      let first = displayObj.numbers[pos];
      let second = displayObj.numbers[pos + 1];
      let value = doMath[order[0]](Number(first), Number(second));
      console.log("Value: ", value);
      //
      displayObj.numbers.splice(pos, 2, value);
      displayObj.operators.splice(pos, 1);
    }
    order.shift();
    recursion();
  }
  recursion();
  return displayObj.numbers;
}
//
console.log(compute(setUp));
// const equalsFunc = function () {
//   console.log(compute(setUp));
// };
//
//
//
// var math_it_up = {
//   '+': function (x, y) { return x + y },
//   '-': function (x, y) { return x - y }
// }​​​​​​​;

// math_it_up['+'](1, 2) == 3;
//////////////////////////////////////////////////////////////////////
/////////////////////////////   EVENT LISTENERS
//////////////////////////////////////////////////////////////////////
//
// equalsButton.addEventListener("click", equalsFunc);
//
//
//
//////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

// var math_it_up = {
//     '+': function (x, y) { return x + y },
//     '-': function (x, y) { return x - y }
// }​​​​​​​;

// math_it_up['+'](1, 2) == 3;
//
// OR eval();

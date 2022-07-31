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
const importedString = "22+4-5x6+2"; //This is the only variable that connects 'backend' to 'frontend'
//
const setUp = function (string) {
  //
  const numbers = [];
  const operators = [];
  //
  let numberCollector = "";
  //
  [...string].forEach((ele, idx, arr) => {
    if (Number(ele)) {
      numberCollector += ele;
      if (idx === arr.length - 1) numbers.push(numberCollector); // If last element, push it
    } else {
      if (numberCollector.length === 0) return; //If there are no numbers to push, dont push
      numbers.push(numberCollector);
      operators.push(ele);
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
  let orderOfOps = ["%", "x", "-", "+"];
  function recursion() {
    if (displayObj.numbers.length === 1) return;
    //
    if (displayObj.operators.indexOf(orderOfOps[0]) > -1) {
      let idx = displayObj.operators.indexOf(orderOfOps[0]);
      console.log("Idx: ", idx);
      console.log(displayObj.numbers[idx]);
      console.log(displayObj.operators[idx]);
      console.log(displayObj.numbers[idx + 1]);
      // let string = `${displayObj.numbers[idx]}${displayObj.operators[idx]}${
      //   displayObj.numbers[idx + 1]
      // }`;
      // let value = eval(
      //   `${displayObj.numbers[idx]}${displayObj.operators[idx]}${
      //     displayObj.numbers[idx + 1]
      //   }`
      // );
      displayObj.numbers.splice(idx, 2);
      displayObj.operators.splice(idx, 1);
    } else {
      orderOfOps.shift();
    }
    recursion();
  }
  recursion();
  console.log(displayObj.numbers);
}
const equalsFunc = compute(setUp);
//
//
//////////////////////////////////////////////////////////////////////
/////////////////////////////   EVENT LISTENERS
//////////////////////////////////////////////////////////////////////
//
equalsButton.addEventListener("click", equalsFunc);
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

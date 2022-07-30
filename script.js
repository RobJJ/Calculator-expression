"use strict";
//
// Element Selection
const numberButtons = document.querySelectorAll(".numbers"); // NodeList
const operations = document.querySelectorAll(".operations"); // NodeList
//
const numberOne = document.getElementById("one");
const equalsButton = document.getElementById("equals");
const output = document.getElementById("output");
const clearButton = document.getElementById("clear");
//
//
//
//////////////////////////////////////////////////////////////////////
/////////////////////////////   STATE
//////////////////////////////////////////////////////////////////////
//
let numberArray = [];
let operationsArray = [];

//////////////////////////////////////////////////////////////////////
/////////////////////////////   FUNCTION TO SET STATES
//////////////////////////////////////////////////////////////////////
//
const setOutput = function (textContent) {
  output.textContent += textContent;
};
//
//
let cleared = false;
let clicked = false;
let value = ""; //3+3..(33)
let equaledValue = false;
//
//
//
const clearOutput = function () {
  value = "";
  numberArray = [];
  operationsArray = [];
  output.textContent = "";
  equaledValue = false;
  cleared = true;
  console.log("Cleared:", numberArray);
  console.log("Cleared:", operationsArray);
};
//
//
//
const operationClick = function (e) {
  if (clicked) {
    operationsArray.splice(0, 1);
    operationsArray.push(e.target.textContent);
    output.textContent = output.textContent.slice(0, -1);
    setOutput(e.target.textContent);
    return;
  }
  if (!equaledValue && !cleared) numberArray.push(value);
  setOutput(e.target.textContent);
  operationsArray.push(e.target.textContent);
  value = "";
  equaledValue = false;
  cleared = false;
  clicked = true;
  console.log("Operation Clicked", numberArray);
  console.log("Operation Clicked", operationsArray);
};
//
const numberClick = function (e) {
  if (equaledValue) return;
  setOutput(e.target.textContent);
  value += e.target.textContent;
  clicked = false;
  equaledValue = false;
  cleared = false;
  console.log("Number Clicked", numberArray);
  console.log("Number Clicked", operationsArray);
};
//
//////////////////////////////////////////////////////////////////////
/////////////////////////////   CALC FUNCTION
//////////////////////////////////////////////////////////////////////
//
//
//
//
const doMath = function () {
  const numArr = [].concat(numberArray);
  const opsArr = [].concat(operationsArray);
  const opsOrder = ["%", "x", "-", "+"];
  function reduceNumArr() {
    let idx = opsArr.findIndex((ele) => ele === opsOrder[0]);
    let value = 0;
    if (idx < 0) {
      console.log("OpsOrder Element not present, skip and move on!");
      opsOrder.shift();
      return;
    }
    switch (opsOrder[0]) {
      case "%":
        value = "" + Number(numArr[idx]) / Number(numArr[idx + 1]);
        numArr.splice(idx, 2, value); // Chops out two numbers and replacing it with the calc value;
        opsArr.splice(idx, 1); // Chops out the operation sign
        // value = 0;
        break;
      case "x":
        value = "" + Number(numArr[idx]) * Number(numArr[idx + 1]);
        numArr.splice(idx, 2, value); // Chops out two numbers and replacing it with the calc value;
        opsArr.splice(idx, 1); // Chops out the operation sign
        // value = 0;
        break;
      case "-":
        value = "" + Number(numArr[idx]) - Number(numArr[idx + 1]);
        numArr.splice(idx, 2, value); // Chops out two numbers and replacing it with the calc value;
        opsArr.splice(idx, 1); // Chops out the operation sign
        // value = 0;
        break;
      case "+":
        value = Number(numArr[idx]) + Number(numArr[idx + 1]);
        numArr.splice(idx, 2, value); // Chops out two numbers and replacing it with the calc value;
        opsArr.splice(idx, 1); // Chops out the operation sign
        // value = 0;
        break;

      default:
        break;
    }
  }
  function recursive() {
    // Could make IIFE
    if (numArr.length === 1) return;
    reduceNumArr();
    recursive();
  }
  recursive();

  output.textContent = numArr[0];
  value = numArr[0];
  numberArray = [];
  numberArray.push(Number(numArr[0]));
  operationsArray = [];
};
//
//
//
//
//
// //////////////////////////////////////////////////////////////////////
// /////////////////////////////   ADD EVENT LISTENERS
// //////////////////////////////////////////////////////////////////////
// //
numberButtons.forEach((node) => node.addEventListener("click", numberClick));
//
//
operations.forEach((node) => node.addEventListener("click", operationClick));
//
//
equalsButton.addEventListener("click", () => {
  if (clicked) return;
  equaledValue = true;
  numberArray.push(Number(value));
  console.log("Equal Clicked", numberArray, operationsArray);
  doMath();
});
//
//
clearButton.addEventListener("click", clearOutput);

// const calculator = {

// }
// def recurse(arr):
//    if numArr != 0:
//        doshit()
//        recurse(???)

// recurse(numArr)

//
//
//

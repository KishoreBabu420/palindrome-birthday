'use strict';
const birthDay = document.getElementById('birth-day');
const lucky = document.getElementById('lucky-number');
const btnCheck = document.getElementById('btn-check');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');

// Functions

const showErrorMessage = function (message) {
  errorMessage.style.display = 'block';
  errorMessage.textContent = message;
};

const showSuccess = function (message) {
  successMessage.style.display = 'block';
  successMessage.textContent = message;
};

const sumOfDigits = function (number) {
  let value = Number(number);
  let sum = 0;
  while (value) {
    sum += value % 10;
    value = Math.floor(value / 10);
  }
  return sum;
};

const convertDobToNumber = function (dob) {
  let dobNumber = dob.replaceAll('-', '');
  return sumOfDigits(dobNumber);
};

const isNumberLucky = function (dobNumber, luckyNumber) {
  if (dobNumber === luckyNumber) {
    return true;
  } else {
    return false;
  }
};

const showLuckMessage = function () {
  let dob = birthDay.value;
  let luckyNumber = +lucky.value;
  if (dob && luckyNumber >= 0) {
    if (isNumberLucky(convertDobToNumber(dob), luckyNumber)) {
      showSuccess(`${luckyNumber} is lucky for you`);
    } else {
      showErrorMessage(`${luckyNumber} is not lucky for you`);
    }
  } else {
    showErrorMessage('Enter Valid Details');
  }
};

// Event Listeners
btnCheck.addEventListener('click', showLuckMessage);

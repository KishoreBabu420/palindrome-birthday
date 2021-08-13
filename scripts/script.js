'use strict';
const birthDay = document.getElementById('birth-day');
const btnCheck = document.getElementById('btn-check');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');

// Functions

const dateToObjectConvertor = function () {
  let birthdayString = birthDay.value;

  if (birthdayString !== '') {
    let date = birthdayString.split('-');
    let yyyy = date[0];
    let mm = date[1];
    let dd = date[2];

    let dateObject = {
      day: Number(dd),
      month: Number(mm),
      year: Number(yyyy),
    };
    return dateObject;
  }
};

const showErrorMessage = function (message) {
  errorMessage.style.display = 'block';
  errorMessage.textContent = message;
};

const showSuccess = function (message) {
  successMessage.style.display = 'block';
  successMessage.textContent = message;
};

const reverseString = function (str) {
  let listOfChars = str.split('');
  let reversedListOfChar = listOfChars.reverse();
  let reversedString = reversedListOfChar.join('');
  return reversedString;
};

const isPalindrome = function (str) {
  let reversedString = reverseString(str);
  return str === reversedString;
};
//convert data entered to string in specified format
const dateFormatter = function (date) {
  let dateInStr = { day: '', month: '', year: '' };

  if (date.day < 10) {
    dateInStr.day = '0' + date.day;
  } else {
    dateInStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateInStr.month = '0' + date.month;
  } else {
    dateInStr.month = date.month.toString();
  }

  dateInStr.year = date.year.toString();
  return dateInStr;
};

// Event Listeners

btnCheck.addEventListener('click', () => {
  let dateObject = dateToObjectConvertor();
  let dateStr = dateFormatter(dateObject);
  console.log(dateStr);
});

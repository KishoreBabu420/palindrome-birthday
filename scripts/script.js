'use strict';
const birthDay = document.getElementById('birth-day');
const btnCheck = document.getElementById('btn-check');
const errorMessage = document.getElementById('error-message');
const successMessage = document.getElementById('success-message');

// Functions
const showErrorMessage = function (message) {
  errorMessage.style.display = 'block';
  errorMessage.textContent = message;
};
const showSuccessMessage = function (message) {
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

//convert input into object
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
  } else {
    showErrorMessage('Select your Birthday');
  }
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

//create all the possible date formats
const getAllDateFormats = function (date) {
  let ddmmyyyy = date.day + date.month + date.year;
  let mmddyyyy = date.month + date.day + date.year;
  let yyyymmdd = date.year + date.month + date.day;
  let ddmmyy = date.day + date.month + date.year.slice(-2);
  let mmddyy = date.month + date.day + date.year.slice(-2);
  let yyddmm = date.year.slice(-2) + date.day + date.month;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
};

//check palindrome for all the formats
const allFormatsPalindromeChecker = function (date) {
  let allDateFormats = getAllDateFormats(date);
  let palindromeResult = [];

  for (let i = 0; i < allDateFormats.length; i++) {
    let result = isPalindrome(allDateFormats[i]);
    palindromeResult.push(result);
  }
  return palindromeResult;
};

//check for Leap year
const isLeapYear = function (year) {
  if (year % 400 === 0) return true;

  if (year % 100 === 0) return false;

  if (year % 4 === 0) return true;

  return false;
};

//Calculate the nextDate

const getNextDate = function (date) {
  let day = Number(date.day) + 1;
  let month = Number(date.month);
  let year = Number(date.year);

  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
};

//Get the next PalindromeDate
const getNextPalindromeDate = function (date) {
  let nextDate = getNextDate(date);
  let ctr = 0;

  while (1) {
    ctr++;
    let dateString = dateFormatter(nextDate);
    let resultList = allFormatsPalindromeChecker(dateString);
    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [ctr, nextDate];
      }
    }
    nextDate = getNextDate(nextDate);
  }
};
//Calculate the previousDate

const getPreviousDate = function (date) {
  let day = Number(date.day) - 1;
  let month = Number(date.month);
  let year = Number(date.year);

  let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
    month--;

    if (month === 0) {
      month = 12;
      day = 31;
      year--;
    } else if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      } else {
        day = 28;
      }
    } else {
      day = daysInMonth[month - 1];
    }
  }

  return {
    day: day,
    month: month,
    year: year,
  };
};

//get the previousPalindromeDate
const getPreviousPalindromeDate = function (date) {
  let previousDate = getPreviousDate(date);
  let ctr = 0;

  while (1) {
    ctr++;
    let dateString = dateFormatter(previousDate);
    let resultList = allFormatsPalindromeChecker(dateString);
    for (let i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [ctr, previousDate];
      }
    }
    previousDate = getPreviousDate(previousDate);
  }
};

const populateUI = function () {
  let dateObject = dateToObjectConvertor();
  let dateStr = dateFormatter(dateObject);
  let resultList = allFormatsPalindromeChecker(dateStr);
  let palindrome = false;

  for (let i = 0; i < resultList.length; i++) {
    if (resultList[i]) {
      palindrome = true;
      break;
    }
  }

  if (palindrome) {
    showSuccessMessage('You birthday is Palindrome');
  } else {
    const [ctr1, nextDate] = getNextPalindromeDate(dateStr);
    const [ctr2, prevDate] = getPreviousPalindromeDate(dateStr);
    if (ctr1 === ctr2) {
      showSuccessMessage(
        `The next palindrome date is  
          ${nextDate.day}-${nextDate.month}-${nextDate.year},& your previous palindrome date is   ${prevDate.day}-${nextDate.month}-${nextDate.year}, you missed both by ${ctr2} days `
      );
    } else if (ctr1 < ctr2) {
      showSuccessMessage(
        `The nearest palindrome date is
          ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${ctr1} days`
      );
    } else if (ctr2 < ctr1) {
      showSuccessMessage(
        `The nearest palindrome date is  ${prevDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${ctr2} days`
      );
    }
  }
};

// Event Listeners

btnCheck.addEventListener('click', populateUI);

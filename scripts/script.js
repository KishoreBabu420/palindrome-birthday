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

const showSuccess = function (message) {
  successMessage.style.display = 'block';
  successMessage.textContent = message;
};

// Event Listeners
// btnCheck.addEventListener('click', showLuckMessage);

const upper = document.getElementById('upper');
const lower = document.getElementById('lower');
const numbers = document.querySelectorAll('[data-num]');

let lowerString = '';
let upperString = '';
// Clarifying which operation is being used at the moment.
let operation = '';
// Checks if you just answered to know if it can reset the old numbers when selecting a new number.
let justAnswered = false;

function renderCalc() {
  lower.innerText = lowerString;
  upper.innerText = upperString;
}

function appendNumber(num) {
  // Remove the 0 when a number is selected
  if (lowerString === '0') {
    lowerString = '';
  }
  if (justAnswered === true) {
    lowerString = '';
    upperString = '';
    justAnswered = false;
  }
  lowerString = lowerString + num;
  renderCalc();
}

// Pushes the currently typed numbers the the upper part of the calculater.
function lowerToUpper() {
  upperString = lowerString;
  lowerString = '';
  renderCalc();
}

// Listen for each number to be clicked, then append that number by its innerText
numbers.forEach((num) => {
  num.addEventListener('click', () => {
    appendNumber(num.innerText);
  });
});

// Clears all numbers of the calculator, showing a '0'.
const clearBtn = document.querySelector('.key-clear');
clearBtn.addEventListener('click', clearCalc);

function clearCalc() {
  lowerString = '0';
  upperString = '';
  renderCalc();
}

// Removes a number from the right side of the currently typing number.
const delBtn = document.querySelector('.key-del');
delBtn.addEventListener('click', deleteNum);

function deleteNum() {
  if (typeof lowerString === 'number') {
    return;
  } else {
    lowerString = lowerString.slice(0, -1);
    if (lowerString === '') {
      lowerString = '0';
    }
    renderCalc();
  }
}

// Listens for the click on the addition button.
const addBtn = document.querySelector('.key-plus');
addBtn.addEventListener('click', addOperation);

function addOperation() {
  if (upperString) {
    equal();
  }
  if (lowerString) {
    lowerString = lowerString + ' +';
    lowerToUpper();
    operation = 'plus';
    if (justAnswered === true) {
      justAnswered = false;
    }
  }
}

// Listens for the click on the subtraction button.
const subtractBtn = document.querySelector('.key-min');
subtractBtn.addEventListener('click', subtractOperation);

function subtractOperation() {
  if (upperString) {
    equal();
  }
  if (lowerString) {
    lowerString = lowerString + ' -';
    lowerToUpper();
    operation = 'subtract';
    if (justAnswered === true) {
      justAnswered = false;
    }
  }
}

// Listens for the click on the multiplication button.
const multiplyBtn = document.querySelector('.key-mul');
multiplyBtn.addEventListener('click', multiplyOperation);

function multiplyOperation() {
  if (upperString) {
    equal();
  }
  if (lowerString) {
    lowerString = lowerString + ' ×';
    lowerToUpper();
    operation = 'multiply';
    if (justAnswered === true) {
      justAnswered = false;
    }
  }
}

// Listens for the click on the multiplication button.
const divideBtn = document.querySelector('.key-div');
divideBtn.addEventListener('click', divisionOperation);

function divisionOperation() {
  if (upperString) {
    equal();
  }
  if (lowerString) {
    lowerString = lowerString + ' ÷';
    lowerToUpper();
    operation = 'divide';
    if (justAnswered === true) {
      justAnswered = false;
    }
  }
}

// Percent Function.
const percentBtn = document.querySelector('.key-percent');
percentBtn.addEventListener('click', percentFunction);

function percentFunction() {
  lowerString = JSON.stringify(parseFloat(lowerString) / 100);
  renderCalc();
}
// Period function
const periodBtn = document.querySelector('.key-period');
periodBtn.addEventListener('click', addPeriod);

function addPeriod() {
  if (lowerString.includes('.')) {
    return;
  }
  if (lowerString === '0' || lowerString === '') {
    appendNumber('0.');
  } else {
    appendNumber('.');
  }
}

// Equal function
const equalBtn = document.querySelector('.key-equal');
equalBtn.addEventListener('click', equal);

function equal() {
  let answer = '';
  if (justAnswered === true) {
    return;
  }
  if (upperString && lowerString) {
    upperString = upperString.slice(0, -2);

    // Checks to see which operation was used.

    if (operation === 'plus') {
      answer = parseFloat(upperString) + parseFloat(lowerString);
      upperString = `${upperString} + ${lowerString} =`;
      if (magic === true) {
        lowerString = magicNumber;
        justAnswered = true;
        magic = false;
        renderCalc();
        return;
      }
    }

    if (operation === 'subtract') {
      answer = parseFloat(upperString) - parseFloat(lowerString);
      upperString = `${upperString} - ${lowerString} =`;
      if (magic === true) {
        lowerString = magicNumber;
        justAnswered = true;
        magic = false;
        renderCalc();
        return;
      }
    }

    if (operation === 'multiply') {
      answer = parseFloat(upperString) * parseFloat(lowerString);
      upperString = `${upperString} × ${lowerString} =`;
      if (magic === true) {
        lowerString = magicNumber;
        justAnswered = true;
        magic = false;
        renderCalc();
        return;
      }
    }

    if (operation === 'divide') {
      answer = parseFloat(upperString) / parseFloat(lowerString);
      upperString = `${upperString} ÷ ${lowerString} =`;
      if (magic === true) {
        lowerString = magicNumber;
        justAnswered = true;
        magic = false;
        renderCalc();
        return;
      }
    }
    // Shows all the values on the calculator.
    lowerString = answer;
    justAnswered = true;
    renderCalc();
  }
}

// Press and hold function
const magicBtn = document.querySelector('.magic-btn-one');
magicBtn.addEventListener('click', setMagicNumber);

const secondMagicBtn = document.querySelector('.magic-btn-two');
secondMagicBtn.addEventListener('click', setMagic);

let magic = false;
let magicNumber = null;

function setMagicNumber() {
  magicNumber = +prompt('What will the number be?');
}

function setMagic() {
  if (magicNumber) {
    if (typeof (magicNumber === 'number')) {
      magic = true;
    }
  }
}

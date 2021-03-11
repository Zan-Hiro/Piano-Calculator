'use strict'

const keys = document.querySelectorAll('.key');
const numberKeys = document.querySelectorAll('.number');
const operatorKeys = document.querySelectorAll('.operator');
const mainDisplay = document.querySelector('.main-display');
const subDisplay = document.querySelector('.sub-display');
const resultDisplay = document.querySelector('.result');
const clearKey = document.querySelector('.clear');
const equalKey = document.querySelector('.equal');

let storingTemporaryVal = '';
let resultVal = '';
let secondInputVal = '';
let fomula = '';
let equalJudge = false;

const numberDisplay = (numberKey) => {
  const mainDisplayVal = mainDisplay.innerText;
  const number = numberKey.target.innerText;

  if(mainDisplayVal === '0' && number === '0') {
    return;
  }
  if(mainDisplayVal.includes('.') && number === '.') {
    return;
  }
  if(mainDisplayVal === '' && number === '.') {
    return;
  }
  if(mainDisplayVal === '0' && number === '.') {
    secondInputVal = mainDisplayVal;
  }

  if(equalJudge === true && number !== '.') {
    equalJudge = false;
    secondInputVal = '';
  } else if(equalJudge === true && number === '.'){
    equalJudge = false;
    secondInputVal = '0';
  }

  secondInputVal += number;
  mainDisplay.innerText = secondInputVal;

  if(mainDisplay.innerText.length > 12) {
  errorFunc();
  return;
  }
};

const calculate = operatorKey => {
  const operator = operatorKey.target.innerText;

  if(secondInputVal === '') {
    return;
  }

  if(mainDisplay.innerText.length > 12) {
    errorFunc();
    return;
  }

  if(secondInputVal && storingTemporaryVal && fomula) {
    operate();
  } else {
    resultVal = parseFloat(secondInputVal);
  }

  storingVal(operator);
  
  fomula = operator;
};

const storingVal = (operator = '') => {
  storingTemporaryVal += secondInputVal + ' ' + operator + ' ';
  subDisplay.innerText = storingTemporaryVal;
  mainDisplay.innerText = '0';
  secondInputVal = '';
  resultDisplay.innerText = resultVal;
};

const clearVal = () => {
  mainDisplay.innerText = '0';
  subDisplay.innerText = '';
  resultDisplay.innerText = '';
  storingTemporaryVal = '';
  resultVal = '';
  secondInputVal = '';
}

const equalFunc = () => {
  if(resultVal === '' || secondInputVal === '') return;

  if(mainDisplay.innerText.length > 12) {
    errorFunc();
    return;
  }

  operate();
  storingVal();

  mainDisplay.innerText = resultVal;
  subDisplay.innerText = '';
  resultDisplay.innerText = '';
  secondInputVal = resultVal;
  storingTemporaryVal = '';

  equalJudge = true;
};

const operate = () => {
  if(fomula === '+') {
    resultVal = add(resultVal, secondInputVal);
  } else if(fomula === 'x') {
    resultVal = multiply(resultVal, secondInputVal);
  } else if(fomula === '-') {
    resultVal = subtract(resultVal, secondInputVal);
  } else if(fomula === '/') {
    resultVal = divide(resultVal, secondInputVal);
  } else if(fomula === '%') {
    resultVal = remainder(resultVal, secondInputVal);
  }
};

const add = (resultVal, secondInputVal) => {
  return parseFloat(resultVal) + parseFloat(secondInputVal);
};

const multiply = (resultVal, secondInputVal) => {
  return parseFloat(resultVal) * parseFloat(secondInputVal);
};

const subtract = (resultVal, secondInputVal) => {
  return parseFloat(resultVal) - parseFloat(secondInputVal);
};

const divide = (resultVal, secondInputVal) => {
  return parseFloat(resultVal) / parseFloat(secondInputVal);
};

const remainder = (resultVal, secondInputVal) => {
  return parseFloat(resultVal) % parseFloat(secondInputVal);
};

const errorFunc = () => {
    mainDisplay.innerText = 'The Number is too high.Press C Button, please';
    subDisplay.innerText = '';
    resultDisplay.innerText = '';
};

numberKeys.forEach(numberKey => {
  numberKey.addEventListener('click', numberDisplay);
});

operatorKeys.forEach(operatorKey => {
  operatorKey.addEventListener('click', calculate);
});

equalKey.addEventListener('click', equalFunc);

clearKey.addEventListener('click', clearVal);


//---------- KeyBoard Action -------------//
const KeyBoardNumber = key => {
  numberKeys.forEach(button => {
    if(button.innerText === key) {
      button.click();
    }
  });
};

const KeyBoardOperation = key => {
  operatorKeys.forEach(button => {
    if(button.innerText === key) {
      button.click();
    }
  });
};

const keyBoardEqual = () => {
  equalKey.click();
};

const keyBoardClear = () => {
  clearKey.click();
};

const keyBoardDelete = () => {
  mainDisplay.innerText = 
    mainDisplay.innerText.toString().slice(0, -1);
    
    if(mainDisplay.innerText === ''){
      mainDisplay.innerText = '';
    }
  secondInputVal = mainDisplay.innerText;
};

window.addEventListener('keydown', e => {
  if(e.repeat) return;

  if(
    e.key === '0' ||
    e.key === '1' ||
    e.key === '2' ||
    e.key === '3' ||
    e.key === '4' ||
    e.key === '5' ||
    e.key === '6' ||
    e.key === '7' ||
    e.key === '8' ||
    e.key === '9' ||
    e.key === '.' 
  ) {
    KeyBoardNumber(e.key);
  } else if(
    e.key === '+' ||
    e.key === '-' ||
    e.key === '/' ||
    e.key === '%' 
  ) {
    KeyBoardOperation(e.key);
  } else if( e.key === '*' || e.key === 'x' || e.key === 'X') {
    KeyBoardOperation('x');
  } else if(e.key === 'Enter' || e.key === '=') {
    keyBoardEqual();
  } else if(e.key === 'Backspace') {
    keyBoardDelete();
  } else if(e.key === 'c' || e.key === 'C') {
    keyBoardClear();
  }
});
//---------- KeyBoard Action End-------------//


//---------- Piano Sound Effect -------------//
const playNote = (key) => {
  const noteAudio = document.getElementById(key.dataset.note);
  noteAudio.currentTime = 0;
  noteAudio.play();
  key.classList.add('active');
  noteAudio.addEventListener('ended', () => {
    key.classList.remove('active');
  });
};

keys.forEach(key => {
  key.addEventListener('click', () => playNote(key));
});

//--------- Piano Sound Effect End-----------//
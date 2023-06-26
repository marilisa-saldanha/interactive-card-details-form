const form = document.getElementById('form');
const thank = document.querySelector('.thankYou');
const btnConfirm = document.getElementById('btnConfirm');
const btnContinue = document.getElementById('btnContinue');
const fields = document.querySelectorAll('.required');
const infoError = document.querySelectorAll('.infoError');
const cardName = document.getElementById('cardName');
const cardNumber = document.getElementById('cardNumber');
const month = document.getElementById('mm');
const year = document.getElementById('yy');
const cvc = document.getElementById('cardCvc');
const nameRegex = /[a-z]+/gi;

const cardNameOut = document.getElementById('name');
const cardNumberOut = document.getElementById('number');
const monthOut = document.getElementById('month');
const yearOut = document.getElementById('year');
const cvcOut = document.getElementById('cvc');

function setCardName(name) {
  cardNameOut.innerText = name.target.value;
}

function setCardNumber(number) {
  cardNumberOut.innerText = format(number.target.value);
}

function setMonth(month) {
  monthOut.innerText = month.target.value;
}

function setYear(year) {
  yearOut.innerText = year.target.value;
}

function setCvc(cvc) {
  cvcOut.innerText = cvc.target.value;
}

function removeCardName() {
  cardNameOut.innerText = 'Jane Appleseed';
}

function removeCardNumber() {
  cardNumberOut.innerText = '0000 0000 0000 0000';
}

function removeMonth() {
  monthOut.innerText = '00';
}

function removeYear() {
  yearOut.innerText = '00';
}

function removeCvc() {
  cvcOut.innerText = '000';
}

btnConfirm.addEventListener('click', handleSubmit);
btnContinue.addEventListener('click', () => {
  backToForm();
  removeCardName();
  removeCardNumber();
  removeMonth();
  removeYear();
  removeCvc();
});

cardName.addEventListener('keyup', setCardName);
cardNumber.addEventListener('keyup', setCardNumber);
month.addEventListener('keyup', setMonth);
year.addEventListener('keyup', setYear);
cvc.addEventListener('keyup', setCvc);

function handleSubmit(ev) {
  ev.preventDefault();

  if (
    cardName.value &&
    cardNumber.value &&
    month.value &&
    year.value &&
    cvc.value &&
    cardNumber.value.length === 16 &&
    month.value <= 12 &&
    cvc.value.length === 3
  ) {
    thank.classList.remove('hidden');
    form.classList.add('hidden');
  } else {
    if(!cardName.value) {
      setError(0);
      infoError[0].textContent = "Can't be blank";
    } else if(!nameRegex.test(cardName.value)) {
      setError(0);
      infoError[0].textContent = 'Numbers are not allowed in the card name';
    } else {
      removeError(0);
    }
  
    if (!cardNumber.value) {
      setError(1);
      infoError[1].textContent = "Can't be blank";
    } else if(cardNumber.value.length < 16) {
      setError(1);
      infoError[1].textContent = 'Enter the 16 card numbers';
    } else {
      removeError(1);
    }
  
    if (!month.value) {
      setError(2);
      infoError[2].textContent = "Can't be blank";
    } else if(month.value > 12) {
      setError(2);
      infoError[2].textContent = 'Please enter a valid month';
    } else {
      removeError(2);
    }
  
    if (!year.value) {
      setError(3);
    } else {
      removeError(3);
    }
  
    if (!cvc.value) {
      infoError[3].textContent = "Can't be blank";
      setError(4);  
    } else if(cvc.value.length < 3) {
      infoError[3].textContent = 'Please enter a valid verification code';
      setError(4);
    } else {
      removeError(4);
    }
  }
}

function setError(index) {
  fields[index].style.border = '.063rem solid var(--red)';
  infoError[index].style.display = 'flex';
}

function removeError(index) {
  fields[index].style.border = '.063rem solid var(--light-violet';
  infoError[index].style.display = 'none';
  infoError[index].textContent = '';
}

function format(e) {
  return e.toString().replace(/\d{4}(?=.)/g, "$& ");
}

function backToForm() {
  thank.classList.add('hidden');
  form.classList.remove('hidden');
  cardName.value = '';
  cardNumber.value = '';
  month.value = '';
  year.value = '';
  cvc.value = '';
  fields[0].style.border = '';
  fields[1].style.border = '';
  fields[2].style.border = '';
  fields[3].style.border = '';
  fields[4].style.border = '';
  infoError[0].textContent = '';
  infoError[1].textContent = '';
  infoError[2].textContent = '';
  infoError[3].textContent = '';
}
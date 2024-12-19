//Simulating multiple API calls
//Static Method- Promise.all
//Will load ALL only if all succeed 
//Will only load the one that failed if a single one fails

import { rateOfSuccessCalculator } from "./middleware.js";

const c2 = document.querySelector('.js-container2');
const rate = 30
c2.innerHTML = 'Loading...'

const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    let rateOfSuccess = rateOfSuccessCalculator();
    if (rateOfSuccess >= rate) resolve('Data from API 1');
    else if (rateOfSuccess < rate) reject('Failed to load Data from API 1');
  }, 2000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    let rateOfSuccess = rateOfSuccessCalculator();
    if (rateOfSuccess >= rate) resolve('Data from API 2');
    else if (rateOfSuccess < rate) reject('Failed to load Data from API 2')
  }, 4000);
});

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    let rateOfSuccess = rateOfSuccessCalculator();
    if (rateOfSuccess >= rate) resolve('Data from API 3');
    else if (rateOfSuccess < rate) reject('Failed to load Data from API 3')
  }, 6000)
})

function allPromises() {
  Promise.all([p1, p2, p3])
    .then((messages) => {
      let displayMessages = '';
      messages.forEach(message => {
        displayMessages += `<li>${message}</li>`
      });
      c2.innerHTML = `<ul>${displayMessages}</ul>`
    })
    .catch((message) => {
      c2.innerHTML = message;
    })
}

allPromises();


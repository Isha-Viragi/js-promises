//Static Method- Promise.race()
//'Race the promises', returns the one that reaches the state of completion first, be it pass or fail
//Returns not an array but
//Just the FIRST promise that leaves the 'pending' state
//IE Fulfilled/Rejected does not matter
//If you want just the fulfilled one-
//Check practice5.js- Promise.any()

import { rateOfSuccessCalculator, randomMillisecGenerator } from './middleware.js';

const c3 = document.querySelector('.js-container3');
const rate = 30 //30% chance of promise being rejected
c3.innerHTML = 'Loading...' //Stand in for 'pending' state

function resolveMessage(apiID, millisecs) { //Displays the ID and how long it took to load
  return `API ${apiID} Success (200): Fastest Loading- ${millisecs} miliseconds`
}

function rejectMessage(apiID, millisecs) {
  return `API ${apiID} Fail (404): Fastest Loading- ${millisecs} miliseconds`
}

const p1 = new Promise((resolve, reject) => {
  const millisecs = randomMillisecGenerator();
  setTimeout(() => {
    let rateOfSuccess = rateOfSuccessCalculator();
    if (rateOfSuccess >= rate) resolve(resolveMessage('1', millisecs));
    else if (rateOfSuccess < rate) reject(rejectMessage('1', millisecs));
  }, millisecs);
});

const p2 = new Promise((resolve, reject) => {
  const milisecs = randomMillisecGenerator();
  setTimeout(() => {
    let rateOfSuccess = rateOfSuccessCalculator();
    if (rateOfSuccess >= rate) resolve(resolveMessage('2', milisecs));
    else if (rateOfSuccess < rate) reject('2', milisecs);
  }, milisecs);
});

const p3 = new Promise((resolve, reject) => {
  const milisecs = randomMillisecGenerator();
  setTimeout(() => {
    let rateOfSuccess = rateOfSuccessCalculator();
    if (rateOfSuccess >= rate) resolve(resolveMessage('3', milisecs));
    else if (rateOfSuccess < rate) reject(rejectMessage('3', milisecs));
  }, milisecs)
});

Promise.race([p1, p2, p3])
  .then(result => c3.innerHTML = result) //Result is not an array, only 1 value from the fastest promise
  .catch(message => c3.innerHTML = message);




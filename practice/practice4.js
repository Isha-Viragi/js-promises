//Static Method- Promise.allSettled()
//Similar to Promise.all but
//This one loads ALL even if pass/fail
//Returns an Array of OBJECTS
//Object specifies if specific promise passed/failed, and the message
//[ ---Array
//{status: 'rejected', reason: 'message'}, --- Of Objects
//{status: 'fulfilled', value: 'message'}
//]
//Different from Promise.all() since
//Only returns array of all if all pass, as soon as 1 fails, only shows that 1

import { rateOfSuccessCalculator, randomMillisecGenerator } from "./middleware.js";

const c4 = document.querySelector('.js-container4');
const rate = 30 //30% chance of promise being rejected
c4.innerHTML = 'Loading...' //Stand in for 'pending' state

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
    else if (rateOfSuccess < rate) reject(rejectMessage('2', milisecs));
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

Promise.allSettled([p1, p2, p3])
  .then(results => {
    console.log(results)
    let generatedHtml = '';     //dynamically generate and store html in this variable
    results.forEach(item => {
      if (item.status === 'fulfilled')
        generatedHtml += `<li>${item.value}</li>`
      else if (item.status === 'rejected')
        generatedHtml += `<li>${item.reason}</li>`
    });
    c4.innerHTML = `<ul>${generatedHtml}</ul>`    //use that variable to print
  })
  .catch(message => console.log(message))   //doesn't seem to do much, since reason for rejection is shwon in .then
//good for other types of errors, like syntax or exceptions 
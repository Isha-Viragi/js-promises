//Static method- Promise.any()
//Like .race(), it returns the first one to be fulfilled
//Unlike race, it only returns the one that gets fulfilled, ignores the one that rejects
//If all reject, throws an AggregateError (An array of error reasons is formed) 
//To access the errors, need to call the property '.errors' on the AggregateError
//Returns an Array of strings (reasons for rejection)

import { rateOfSuccessCalculator, randomMillisecGenerator } from "./middleware.js";

const rate = 70;
const c5 = document.querySelector('.js-container5');

c5.innerHTML = 'Loading...';

const p1 = new Promise((resolve, reject) => {
  const milisecs = randomMillisecGenerator();
  const rateOfSuccess = rateOfSuccessCalculator();
  setTimeout(() => {
    if (rateOfSuccess >= rate)
      resolve('Success p1');
    else if (rateOfSuccess < rate)
      reject('Failed p1');
  }, milisecs)
})

const p2 = new Promise((resolve, reject) => {
  const milisecs = randomMillisecGenerator();
  const rateOfSuccess = rateOfSuccessCalculator();
  setTimeout(() => {
    if (rateOfSuccess >= rate)
      resolve('Success at p2');
    else if (rateOfSuccess < rate)
      reject('Failed p2');
  }, milisecs)
})

const p3 = new Promise((resolve, reject) => {
  const milisecs = randomMillisecGenerator();
  const rateOfSuccess = rateOfSuccessCalculator();
  setTimeout(() => {
    if (rateOfSuccess >= rate)
      resolve('Success p3');
    else if (rateOfSuccess < rate)
      reject('Failed p3');
  }, milisecs);
})

Promise.any([p1, p2, p3])
  .then(result => c5.innerHTML = `<img src="images/cat.svg" style="height: 100px;"><div>${result}</div>`)
  .catch(result => {
    let generatedHtml = '';

    result.errors.forEach(error => {   //To get all the errors, need to access using ".errors" property
      generatedHtml += `<li>${error}</li>`;
    })

    c5.innerHTML = `<img src="images/no-image.svg" style="height: 100px;"><ul>${generatedHtml}</ul>`;
  })


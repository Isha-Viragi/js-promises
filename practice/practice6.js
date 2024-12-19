//Practice- Promise Chaining
//Realizations:
//resolve is what 'returns' to the next promise
//To chain, need to return a value from 1 promise
//          and accept it into the next

import { rateOfSuccessCalculator, randomMillisecGenerator } from "./middleware.js"

const c6 = document.querySelector('.js-container6');
c6.innerHTML = 'Loading...'

//Instagram-type Simulation
//First we need to fetch user

function fetchUser(userID) {

  return new Promise((resolve, reject) => {

    const noUserRate = 30;
    const rateOfSuccess = rateOfSuccessCalculator();
    const milisecs = randomMillisecGenerator();

    setTimeout(() => {
      if (rateOfSuccess > noUserRate) {
        c6.innerHTML = `<p>Found User with ID ${userID}</p>`;
        resolve(userID);
      }
      else if (rateOfSuccess <= noUserRate) reject(`No user with ID '${userID}' found`);
    }, milisecs);
  });
};

//If the user is found, we would chain
//And search in the 'posts' table by
//Utilizing 'normalization' and 
//Referencing the user ID (Foreign key) to get the posts we are looking for 
//(Given that we are using a Relational Database)

function fetchPost(userID) {

  return new Promise((resolve, reject) => {

    const noPostsRate = 30;
    const rateOfSuccess = rateOfSuccessCalculator();
    const milisecs = randomMillisecGenerator();

    setTimeout(() => {
      if (rateOfSuccess > noPostsRate) {
        c6.innerHTML += `<p>Found posts 1, 2, 3 for userID ${userID}</p>`
        resolve('Post1, Post 2, Post 3');
      }
      else reject('User has no posts');
    }, milisecs);
  });
};

function displayPost(posts) {
  c6.innerHTML += `<p>Now Displaying: ${posts}</p>`;
}

fetchUser(1)
  .then(result => fetchPost(result))
  .then(result => displayPost(result))
  .catch(error => {
    if (c6.innerHTML === 'Loading...')
      c6.innerHTML = `<p>Error: ${error}</p>`;
    else c6.innerHTML += `<p>Error: ${error}</p>`;
  })
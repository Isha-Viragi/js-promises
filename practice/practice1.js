//Simulated API call exercise
//Methods- Handlers

const c1 = document.querySelector('.js-container1');
c1.innerHTML = 'Loading...'

const p1 = new Promise((resolve, reject) => {
  let timeoutId;
  let rateOfSuccess;

  timeoutId && clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    c1.innerHTML = 'Get Request: '
    rateOfSuccess = Math.ceil(Math.random() * 100)
    console.log(rateOfSuccess)

    if (rateOfSuccess > 30)
      resolve('Successful');
    else if (rateOfSuccess < 30)
      reject('Fail');

  }, 4000);
})

p1.then((message) => {    //.then() handler
  c1.innerHTML += message
})
  .catch((message) => {   //.catch() handler
    c1.innerHTML += message
  })
  .finally(() => {
    c1.innerHTML += `<div>And Finally... We are done<div>`
  })


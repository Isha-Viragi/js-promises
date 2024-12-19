//Simulated API call exercise
//Methods- Handlers

const c1 = document.querySelector('.js-container1');

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

  }, 3000);
})

p1.then((message) => {
  c1.innerHTML += message
})
  .catch((message) => {
    c1.innerHTML += message
  })



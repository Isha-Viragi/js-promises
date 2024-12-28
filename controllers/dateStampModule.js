function calculateDateStamp() {
  const today = new Date;
  const uploadDate = new Date;

  const monthsArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  let pointer;
  let count = 0;

  // uploadDate.setMonth(11);

  // today.setFullYear(2024);
  // today.setMonth(11)
  uploadDate.setHours(uploadDate.getHours() + 5)
  today.setFullYear(2025);
  today.setMonth(0);
  today.setDate(2)
  console.log('today: ', today)
  console.log('uDate: ', uploadDate)

  let timePassed;

  //Minutes
  if (
    today.getFullYear() === uploadDate.getFullYear() &&
    today.getMonth() === uploadDate.getMonth() &&
    today.getDate() === uploadDate.getDate() &&
    today.getHours() - uploadDate.getHours() === 1 &&
    claculateMinutesPassed(uploadDate, today) < 60) {

    timePassed = claculateMinutesPassed(uploadDate, today);
    return renderTimePassed(timePassed, 'minute');
  }

  //If uploaded at 1.50
  //What happens at 2.10 => 20 mins
  else if (
    today.getFullYear() === uploadDate.getFullYear() &&
    today.getMonth() === uploadDate.getMonth() &&
    today.getDate() === uploadDate.getDate() &&
    today.getHours() === uploadDate.getHours() &&
    today.getMinutes() >= uploadDate.getMinutes()) {

    timePassed = today.getMinutes() - uploadDate.getMinutes();
    return renderTimePassed(timePassed, 'minute');
  }

  //Hours
  else if (
    today.getFullYear() === uploadDate.getFullYear() &&
    today.getMonth() === uploadDate.getMonth() &&
    today.getDate() === uploadDate.getDate() &&
    today.getHours() > uploadDate.getHours()) {

    timePassed = today.getHours() - uploadDate.getHours();
    return renderTimePassed(timePassed, 'hour');
  }

  //If uploaded => 11pm 
  //Today => 1am
  else if (
    today.getFullYear() === uploadDate.getFullYear() &&
    today.getMonth() === uploadDate.getMonth() &&
    today.getDate() - uploadDate.getDate() === 1 &&
    claculateHoursPassed(uploadDate, today) < 24) {

    timePassed = claculateHoursPassed(uploadDate, today);
    return renderTimePassed(timePassed, 'hour');
  }

  //Days
  else if (
    today.getFullYear() === uploadDate.getFullYear() &&
    today.getMonth() === uploadDate.getMonth() &&
    today.getDate() > uploadDate.getDate()) {

    timePassed = today.getDate() - uploadDate.getDate();
    return renderTimePassed(timePassed, 'day');
  }

  //If it hasn't fully been a year (12 months)
  else if
    (today.getFullYear() - uploadDate.getFullYear() === 1 &&
    today.getMonth() < uploadDate.getMonth()) {

    //Using DSA  
    pointer = monthsArray.findIndex(e => e === uploadDate.getMonth())
    while (monthsArray[pointer] !== today.getMonth()) {
      if (pointer === monthsArray.length - 1) {
        pointer = 0;
        count++;
      }
      else {
        count++;
        pointer++;
      }
    }
    return renderTimePassed(count, 'month');
  }

  //If it's in the same year
  else if (today.getFullYear() === uploadDate.getFullYear()) {
    if (today.getMonth() >= uploadDate.getMonth())
      timePassed = today.getMonth() - uploadDate.getMonth();
    return renderTimePassed(timePassed, 'month');
  }

  //If it's been over a year
  else if
    (today.getFullYear() > uploadDate.getFullYear()) {

    timePassed = today.getFullYear() - uploadDate.getFullYear();
    return renderTimePassed(timePassed, 'year');
  }

}


function renderTimePassed(timePassed, unitOfTime) {
  if (timePassed === 1) return `${timePassed} ${unitOfTime}`
  else return `${timePassed} ${unitOfTime}s`
}

function claculateMinutesPassed(uploadDate, today) {
  return (60 - uploadDate.getMinutes()) + today.getMinutes();
}

function claculateHoursPassed(uploadDate, today) {
  return (24 - uploadDate.getHours()) + today.getHours();
}

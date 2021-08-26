const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

//select three things:
//1)class"deadline"
//2)class h4 "giveaway"
//3)all h4s: days, hours, minutes, seconds

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');
//console.log(items); // returns: NodeList(4) [h4.days, h4.hours, h4.mins, h4.secs]

let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

//let futureDate = new Date(2021,11,31,5,00,00,00); //months are 0 index based, 0-24 hours, default PST
//console.log(futureDate); //Fri Dec 31 2021 05:00:00 GMT-0800 (Pacific Standard Time)

const futureDate = new Date(tempYear,tempMonth,tempDay + 10, 11, 30, 0);
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
// console.log(month); 11
//console.log(months[month]); // December
month = months[month];

const date = futureDate.getDate();

let weekday = futureDate.getDay();
weekday = weekdays[weekday];

giveaway.textContent= `giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}am.`;

// future time in ms:
const futureTime = futureDate.getTime();
//console.log(futureTime); //1640955600000

function getRemainingTime(){
  const current = new Date().getTime();
    //console.log(current); //1629950016186
  const t = futureTime - current;
  //console.log(t); //11005504862
  //remember to determine logic for remaining days, hours, mins, secs:
  // 1s = 1000ms
  // 1m = 60s
  // 1hr = 60min
  // 1d = 24hr

  // values in ms:
  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;
  // calculate all values:
  let days = Math.floor((t/oneDay));
  let hours = Math.floor((t % oneDay /oneHour));
  let mins = Math.floor((t % oneHour/oneMinute));
  let secs = Math.floor((t % oneMinute/1000));
  
  //console.log(days, hours, mins, secs);

  // set values array;

  const values = [days,hours,mins,secs];

  function format(item){
    if(item < 10) {
      return item = `0${item}`
    }
    return item
  }

  items.forEach(function(item,index){
    item.innerHTML = format(values[index]);
  });

  if(t<0){
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">Sorry, this giveaway has expired.</h4>`;
  }
}

// countdown
let countdown = setInterval(getRemainingTime,1000);



getRemainingTime();
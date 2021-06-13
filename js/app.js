'use strict';

let opHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
let minimumGivinCustomerAvrg = [23,3,11,20,2];
let maximumGivinCustomerAvrg = [65,24,38,38,16];
let cookiesSalesGivinAvrg = [6.3,1.2,3.7,2.3,4.6];
let Sales = document.getElementById('SalesDiv');
let locationsarray = [
  {
    location : 'Seattle',
    minCust : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
    maxCust : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
    cookiesSalesPerHour : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
    TotalSalesPerDay : 0
  },{
    location : 'Tokyo',
    minCust : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
    maxCust : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
    cookiesSalesPerHour : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
    TotalSalesPerDay : 0
  },{
    location : 'Dubai',
    minCust : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
    maxCust : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
    cookiesSalesPerHour : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
    TotalSalesPerDay : 0,
  },{
    location : 'Paris',
    minCust : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
    maxCust : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
    cookiesSalesPerHour : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
    TotalSalesPerDay : 0,

  },{
    location : 'Lima',
    minCust : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
    maxCust : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
    cookiesSalesPerHour : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
    TotalSalesPerDay : 0
  }];
function randomNumberGenerator(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function minCustomers (min, max ,location){
  for (let i = 0; i < location.minCust.length ; i++ ){
    location.minCust[i] = randomNumberGenerator(min, max);
  }}
function maxCustomers (min, max,location){
  for (let i = 0; i < location.maxCust.length ; i++ ){
    location.maxCust[i] = randomNumberGenerator(min, max);
  }}
function cookiesSales(location,CookiesSaleAvarage) {
  for (let i = 0; i < location.cookiesSalesPerHour.length ; i++ ){
    let avg = Math.ceil(Math.round((location.maxCust[i] / location.minCust[i] ) * CookiesSaleAvarage * 10) / 10);
    location.cookiesSalesPerHour[i] = avg;
    location.TotalSalesPerDay += avg;
  }}
function render(objectName){
  let articleElement = document.createElement('article');
  Sales.appendChild(articleElement);
  let location = document.createElement('h2');
  articleElement.appendChild(location);
  location.textContent = objectName.location;
  let SalesList = document.createElement('ul');
  articleElement.appendChild(SalesList);
  for(let i = 0; i < objectName.cookiesSalesPerHour.length; i++) {
    let listItem = document.createElement('li');
    SalesList.appendChild(listItem);
    listItem.textContent = opHours[i] +': ' + objectName.cookiesSalesPerHour[i] + ' cookies';
  }
  let listItem = document.createElement('li');
  SalesList.appendChild(listItem);
  listItem.textContent = ' Total: ' + objectName.TotalSalesPerDay ;
  listItem.setAttribute('class','TotalsClass');
  let horizantalLine = document.createElement('hr');
  horizantalLine.setAttribute('width','700');
  Sales.appendChild(horizantalLine);
}

function initializeRandomNumbers(){
  for (let i = 0 ; i < locationsarray.length ; i++) {
    minCustomers(1,minimumGivinCustomerAvrg[i],locationsarray[i]);
    maxCustomers(minimumGivinCustomerAvrg[i],maximumGivinCustomerAvrg[i],locationsarray[i]);
    cookiesSales(locationsarray[i],cookiesSalesGivinAvrg[i]);
    render(locationsarray[i]);
  }
}
initializeRandomNumbers();

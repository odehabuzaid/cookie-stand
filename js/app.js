'use strict';

let opHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
let minimumGivinCustomerAvrg = [23,3,11,20,2];
let maximumGivinCustomerAvrg = [65,24,38,38,16];
let cookiesSalesGivinAvrg = [6.3,1.2,3.7,2.3,4.6];

let locationsarray = [
  {
    location : 'Seattle',
    minCust : [],
    maxCust : [],
    cookiesSalesPerHour : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
    TotalSalesPerDay : 0
  },{
    location : 'Tokyo',
    minCust : [],
    maxCust : [],
    cookiesSalesPerHour : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
    TotalSalesPerDay : 0
  },{
    location : 'Dubai',
    minCust : [],
    maxCust : [],
    cookiesSalesPerHour : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
    TotalSalesPerDay : 0,
  },{
    location : 'Paris',
    minCust : [],
    maxCust : [],
    cookiesSalesPerHour : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
    TotalSalesPerDay : 0,

  },{
    location : 'Lima',
    minCust : [],
    maxCust : [],
    cookiesSalesPerHour : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
    TotalSalesPerDay : 0
  }];

function randomNumberGenerator(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function minCustomers (min, max ,location){
  for (let i = 0; i < opHours.length ; i++ ){
    location.minCust.push(randomNumberGenerator(min, max));
  }}

function maxCustomers (min, max,location){
  for (let i = 0; i < opHours.length ; i++ ){
    location.maxCust.push(randomNumberGenerator(min, max));
  }}

function cookiesSales(location,CookiesSaleAvarage) {
  for (let i = 0; i < location.cookiesSalesPerHour.length ; i++ ){
    let avg = Math.ceil((location.maxCust[i] / location.minCust[i] ) * CookiesSaleAvarage );
    location.cookiesSalesPerHour[i] = avg;
    location.TotalSalesPerDay += avg;
  }}

let Sales = document.getElementById('SalesDiv');
function render(objectIndex){
  let articleElement = document.createElement('article');
  Sales.appendChild(articleElement);
  let location = document.createElement('h2');
  articleElement.appendChild(location);
  location.textContent = objectIndex.location;
  let SalesList = document.createElement('ul');
  articleElement.appendChild(SalesList);
  for(let i = 0; i < objectIndex.cookiesSalesPerHour.length; i++) {
    let listItem = document.createElement('li');
    SalesList.appendChild(listItem);
    listItem.textContent = opHours[i] +': ' + objectIndex.cookiesSalesPerHour[i] + ' cookies';
  }
  let listItem = document.createElement('li');
  SalesList.appendChild(listItem);
  listItem.textContent = ' Total: ' + objectIndex.TotalSalesPerDay ;
  listItem.setAttribute('class','TotalsClass');
  let horizantalLine = document.createElement('hr');
  horizantalLine.setAttribute('width','700');
  Sales.appendChild(horizantalLine);
}

function calculateAndRenderSalesData(){
  for (let i = 0 ; i < locationsarray.length ; i++) {
    minCustomers(1,minimumGivinCustomerAvrg[i],locationsarray[i]);
    maxCustomers(minimumGivinCustomerAvrg[i],maximumGivinCustomerAvrg[i],locationsarray[i]);
    cookiesSales(locationsarray[i],cookiesSalesGivinAvrg[i]);
    render(locationsarray[i]);
  }
}


calculateAndRenderSalesData();

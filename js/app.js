'use strict';

let opHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
let Sales = document.getElementById('SalesDiv');
function randomNumberGenerator(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let Seattle = {
  location : 'Seattle',
  minCust : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
  maxCust : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
  cookiesSalesPerHour : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
  TotalSalesPerDay : 0,
  minCustomers: function(min, max){
    for (let i = 0; i < this.minCust.length ; i++ ){
      this.minCust[i] = randomNumberGenerator(min, max);
    }},
  maxCustomers: function(min, max){
    for (let i = 0; i < this.maxCust.length ; i++ ){
      this.maxCust[i] = randomNumberGenerator(min, max);
    }},
  cookiesSales : function(){
    for (let i = 0; i < this.cookiesSalesPerHour.length ; i++ ){
      let avg = Math.ceil(Math.round((this.maxCust[i] / this.minCust[i] ) * 6.3 * 10) / 10);
      this.cookiesSalesPerHour[i] = avg;
      this.TotalSalesPerDay += avg;
    }},
  render: function(){

    let articleElement = document.createElement('article');
    Sales.appendChild(articleElement);

    let location = document.createElement('h2');
    articleElement.appendChild(location);
    location.textContent = this.location;

    let SalesList = document.createElement('ul');
    articleElement.appendChild(SalesList);

    for(let i = 0; i < this.cookiesSalesPerHour.length; i++) {
      let listItem = document.createElement('li');
      SalesList.appendChild(listItem);
      listItem.textContent = opHours[i] +': ' + this.cookiesSalesPerHour[i] + ' cookies';
    }
    let listItem = document.createElement('li');
    SalesList.appendChild(listItem);
    listItem.textContent = ' Total: ' + this.TotalSalesPerDay ;
    listItem.setAttribute('class','TotalsClass');
    let horizantalLine = document.createElement('hr');
    horizantalLine.setAttribute('width','700');
    Sales.appendChild(horizantalLine);
  }

};

Seattle.minCustomers(1,23);
Seattle.maxCustomers(23,65);
Seattle.cookiesSales();
Seattle.render();

let Tokyo = {
  location : 'Tokyo',
  minCust : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
  maxCust : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
  cookiesSalesPerHour : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
  TotalSalesPerDay : 0,
  minCustomers: function(min, max){
    for (let i = 0; i < this.minCust.length ; i++ ){
      this.minCust[i] = randomNumberGenerator(min, max);
    }},
  maxCustomers: function(min, max){
    for (let i = 0; i < this.maxCust.length ; i++ ){
      this.maxCust[i] = randomNumberGenerator(min, max);
    }},
  cookiesSales : function(){
    for (let i = 0; i < this.cookiesSalesPerHour.length ; i++ ){
      let avg = Math.ceil(Math.round((this.maxCust[i] / this.minCust[i] ) * 1.2 * 10) / 10);
      this.cookiesSalesPerHour[i] = avg;
      this.TotalSalesPerDay += avg;
    }},
  render: function(){

    let articleElement = document.createElement('article');
    Sales.appendChild(articleElement);

    let location = document.createElement('h2');
    articleElement.appendChild(location);
    location.textContent = this.location;

    let SalesList = document.createElement('ul');
    articleElement.appendChild(SalesList);

    for(let i = 0; i < this.cookiesSalesPerHour.length; i++) {
      let listItem = document.createElement('li');
      SalesList.appendChild(listItem);
      listItem.textContent = opHours[i] +': ' + this.cookiesSalesPerHour[i] + ' cookies';
    }
    let listItem = document.createElement('li');
    SalesList.appendChild(listItem);
    listItem.textContent = ' Total: ' + this.TotalSalesPerDay ;
    listItem.setAttribute('class','TotalsClass');
    let horizantalLine = document.createElement('hr');
    horizantalLine.setAttribute('width','700');
    Sales.appendChild(horizantalLine);
  }

};

Tokyo.minCustomers(1,3);
Tokyo.maxCustomers(3,24);
Tokyo.cookiesSales();
Tokyo.render();


let Dubai = {
  location : 'Dubai',
  minCust : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
  maxCust : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
  cookiesSalesPerHour : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
  TotalSalesPerDay : 0,
  minCustomers: function(min, max){
    for (let i = 0; i < this.minCust.length ; i++ ){
      this.minCust[i] = randomNumberGenerator(min, max);
    }},
  maxCustomers: function(min, max){
    for (let i = 0; i < this.maxCust.length ; i++ ){
      this.maxCust[i] = randomNumberGenerator(min, max);
    }},
  cookiesSales : function(){
    for (let i = 0; i < this.cookiesSalesPerHour.length ; i++ ){
      let avg = Math.ceil(Math.round((this.maxCust[i] / this.minCust[i] ) * 3.7 * 10) / 10);
      this.cookiesSalesPerHour[i] = avg;
      this.TotalSalesPerDay += avg;
    }},
  render: function(){

    let articleElement = document.createElement('article');
    Sales.appendChild(articleElement);

    let location = document.createElement('h2');
    articleElement.appendChild(location);
    location.textContent = this.location;

    let SalesList = document.createElement('ul');
    articleElement.appendChild(SalesList);

    for(let i = 0; i < this.cookiesSalesPerHour.length; i++) {
      let listItem = document.createElement('li');
      SalesList.appendChild(listItem);
      listItem.textContent = opHours[i] +': ' + this.cookiesSalesPerHour[i] + ' cookies';
    }
    let listItem = document.createElement('li');
    SalesList.appendChild(listItem);
    listItem.textContent = ' Total: ' + this.TotalSalesPerDay ;
    listItem.setAttribute('class','TotalsClass');
    let horizantalLine = document.createElement('hr');
    horizantalLine.setAttribute('width','700');
    Sales.appendChild(horizantalLine);
  }

};

Dubai.minCustomers(1,11);
Dubai.maxCustomers(11,38);
Dubai.cookiesSales();
Dubai.render();

let Paris = {
  location : 'Paris',
  minCust : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
  maxCust : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
  cookiesSalesPerHour : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
  TotalSalesPerDay : 0,
  minCustomers: function(min, max){
    for (let i = 0; i < this.minCust.length ; i++ ){
      this.minCust[i] = randomNumberGenerator(min, max);
    }},
  maxCustomers: function(min, max){
    for (let i = 0; i < this.maxCust.length ; i++ ){
      this.maxCust[i] = randomNumberGenerator(min, max);
    }},
  cookiesSales : function(){
    for (let i = 0; i < this.cookiesSalesPerHour.length ; i++ ){
      let avg = Math.ceil(Math.round((this.maxCust[i] / this.minCust[i] ) * 2.3 * 10) / 10);
      this.cookiesSalesPerHour[i] = avg;
      this.TotalSalesPerDay += avg;
    }},
  render: function(){

    let articleElement = document.createElement('article');
    Sales.appendChild(articleElement);

    let location = document.createElement('h2');
    articleElement.appendChild(location);
    location.textContent = this.location;

    let SalesList = document.createElement('ul');
    articleElement.appendChild(SalesList);

    for(let i = 0; i < this.cookiesSalesPerHour.length; i++) {
      let listItem = document.createElement('li');
      SalesList.appendChild(listItem);
      listItem.textContent = opHours[i] +': ' + this.cookiesSalesPerHour[i] + ' cookies';
    }
    let listItem = document.createElement('li');
    SalesList.appendChild(listItem);
    listItem.textContent = ' Total: ' + this.TotalSalesPerDay ;
    listItem.setAttribute('class','TotalsClass');
    let horizantalLine = document.createElement('hr');
    horizantalLine.setAttribute('width','700');
    Sales.appendChild(horizantalLine);
  }

};

Paris.minCustomers(1,20);
Paris.maxCustomers(20,38);
Paris.cookiesSales();
Paris.render();


let Lima = {
  location : 'Lima',
  minCust : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
  maxCust : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
  cookiesSalesPerHour : [0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0,0,0],
  TotalSalesPerDay : 0,
  minCustomers: function(min, max){
    for (let i = 0; i < this.minCust.length ; i++ ){
      this.minCust[i] = randomNumberGenerator(min, max);
    }},
  maxCustomers: function(min, max){
    for (let i = 0; i < this.maxCust.length ; i++ ){
      this.maxCust[i] = randomNumberGenerator(min, max);
    }},
  cookiesSales : function(){
    for (let i = 0; i < this.cookiesSalesPerHour.length ; i++ ){
      let avg = Math.ceil(Math.round((this.maxCust[i] / this.minCust[i] ) * 4.6 * 10) / 10);
      this.cookiesSalesPerHour[i] = avg;
      this.TotalSalesPerDay += avg;
    }},
  render: function(){

    let articleElement = document.createElement('article');
    Sales.appendChild(articleElement);

    let location = document.createElement('h2');
    articleElement.appendChild(location);
    location.textContent = this.location;

    let SalesList = document.createElement('ul');
    articleElement.appendChild(SalesList);

    for(let i = 0; i < this.cookiesSalesPerHour.length; i++) {
      let listItem = document.createElement('li');
      SalesList.appendChild(listItem);
      listItem.textContent = opHours[i] +': ' + this.cookiesSalesPerHour[i] + ' cookies';
    }
    let listItem = document.createElement('li');
    SalesList.appendChild(listItem);
    listItem.textContent = ' Total: ' + this.TotalSalesPerDay ;
    listItem.setAttribute('class','TotalsClass');
    let horizantalLine = document.createElement('hr');
    Sales.appendChild(horizantalLine);
  }

};

Lima.minCustomers(1,2);
Lima.maxCustomers(2,16);
Lima.cookiesSales();
Lima.render();


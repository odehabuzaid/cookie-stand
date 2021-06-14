'use strict';
let openingHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
let locationsarray = [];
let locationsSalesTable = document.getElementById('locationsSalesTable');
let grandTotals = [];

function CookiesShop(location, minCust, maxCust, CookiesSales,TotalSalesPerDay) {
  this.location = location;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.cookiesSales = CookiesSales;
  this.cookiesSalesPerHour = [];
  this.TotalSalesPerDay = TotalSalesPerDay;
  locationsarray.push(this);
}
CookiesShop.prototype.randomNumberGenerator = function(){
  return Math.ceil(Math.random() * ((this.maxCust) - (this.minCust)) + this.minCust);
};
CookiesShop.prototype.cookiesSalesgenerator = function(){

  for (let i = 0; i < openingHours.length ; i++ ){
    // alert(this.randomNumberGenerator())
    let avg = Math.ceil((this.cookiesSales * this.randomNumberGenerator()) /14) ;
    // alert(avg)
    this.cookiesSalesPerHour.push(avg);
    this.TotalSalesPerDay += avg;

  }
};
CookiesShop.prototype.render = function() {
  let trElement = document.createElement('tr');
  let thElement = document.createElement('th');
  thElement.textContent = this.location;
  trElement.appendChild(thElement);
  for (let i = 0; i < openingHours.length; i++) {
    let tdElement = document.createElement('td');
    tdElement.textContent = this.cookiesSalesPerHour[i];
    trElement.appendChild(tdElement);
  }
  let tdElement = document.createElement('td');
  tdElement.textContent = this.TotalSalesPerDay;
  trElement.appendChild(tdElement);
  locationsSalesTable.appendChild(trElement);
};
new CookiesShop('Seattle',23,65,6.3,0);
new CookiesShop('Tokyo',3,24,1.2,0);
new CookiesShop('Dubai',11,38,3.7,0);
new CookiesShop('Paris',20,38,2.3,0);
new CookiesShop('Lima',20,38,2.3,0);


function renderHeaderRow() {
  let tableHeadingsElement = document.createElement('thead');
  let tableRowElement = document.createElement('tr');
  let tableHeadElement = document.createElement('th');
  tableHeadElement.textContent = '';
  tableRowElement.appendChild(tableHeadElement);
  for (let i = 0; i < openingHours.length; i++) {
    tableHeadElement = document.createElement('th');
    tableHeadElement.textContent = openingHours[i];
    tableRowElement.appendChild(tableHeadElement);
  }
  tableHeadElement = document.createElement('th');
  tableHeadElement.textContent = 'Daily Totals';
  tableRowElement.appendChild(tableHeadElement);
  tableHeadingsElement.appendChild(tableRowElement);
  locationsSalesTable.appendChild(tableHeadingsElement);
}
function renderFooterRow() {
  let tableFooterElement = document.createElement('tfoot');
  let tableRowElement = document.createElement('tr');
  let tableHeadElement = document.createElement('th');
  tableHeadElement.textContent = 'Hourly Totals';
  tableRowElement.appendChild(tableHeadElement);
  for (let i = 0; i < openingHours.length; i++) {
    tableHeadElement = document.createElement('th');
    tableHeadElement.textContent = getGrandTotalsForEachHour(i);
    tableRowElement.appendChild(tableHeadElement);
  }
  tableHeadElement = document.createElement('th');
  // tableHeadElement.textContent = grandTotalsSummation();
  tableHeadElement.textContent = '';
  tableRowElement.appendChild(tableHeadElement);
  tableFooterElement.appendChild(tableRowElement);
  locationsSalesTable.appendChild(tableFooterElement);
}
function getGrandTotalsForEachHour(index){
  let gT = 0;
  for (let j = 0 ; j < locationsarray.length ; j++){
    gT += locationsarray[j].cookiesSalesPerHour[index] ;
  }
  grandTotals.push(gT);
  return gT;
}
function grandTotalsSummation(){
  let sum = 0;
  // alert(grandTotals);
  for (let i =0; i < grandTotals.length ; i++) {
    sum += grandTotals[i];
  }
  return sum;
}

function calculateAndRenderSalesData(){
  for(let i in locationsarray) {
    locationsarray[i].cookiesSalesgenerator();
    locationsarray[i].render();

  }
}
renderHeaderRow();
calculateAndRenderSalesData();
renderFooterRow();

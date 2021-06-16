'use strict';
let openingHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
let locationsarray = [];
let grandTotals = [];
let TossersGT = [];
let locationsSalesTable = document.getElementById('locationsSalesTable');
let requiredTossersTable = document.getElementById('tossersRequired');
let locationsAdresslist = document.getElementById('LocationsList');
let flag = false;
let inputstribg ;

function CookiesShop(location, minCust, maxCust, CookiesSales) {
  this.location = location;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.cookiesSales = CookiesSales;
  this.cookiesSalesPerHour = [];
  this.totalSalesPerDay = 0;
  this.tossers = [];
  this.totaltossersperday = 0;
  locationsarray.push(this);
}

CookiesShop.prototype.randomNumberGenerator = function(){
  return Math.ceil(Math.random() * ((this.maxCust) - (this.minCust + 1 )) + this.minCust);
};
CookiesShop.prototype.cookiesSalesgenerator = function(){

  for (let i = 0; i < openingHours.length ; i++ ){
    let avg = Math.ceil(( this.randomNumberGenerator() * this.cookiesSales) ) ;
    this.cookiesSalesPerHour.push(avg);
    this.tossers.push(tossersClaculator(avg));
    this.totaltossersperday += tossersClaculator(avg);
    this.totalSalesPerDay += avg;
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
  tdElement.textContent = this.totalSalesPerDay;
  trElement.appendChild(tdElement);
  locationsSalesTable.appendChild(trElement);


  let addressListItems = document.createElement('li');

  addressListItems.innerHTML = `<a href="#"> ${this.location} </a>`;
  locationsAdresslist.appendChild(addressListItems);


};
CookiesShop.prototype.rendertossersTable = function() {
  let trElement = document.createElement('tr');
  let thElement = document.createElement('th');
  thElement.textContent = this.location;
  trElement.appendChild(thElement);

  for (let i = 0; i < openingHours.length; i++) {
    let tdElement = document.createElement('td');
    tdElement.textContent = this.tossers[i];
    trElement.appendChild(tdElement);
  }

  let tdElement = document.createElement('td');
  tdElement.textContent = this.totaltossersperday;
  trElement.appendChild(tdElement);
  requiredTossersTable.appendChild(trElement);
};
new CookiesShop('Seattle',23,65,6.3);
new CookiesShop('Tokyo',3,24,1.2);
new CookiesShop('Dubai',11,38,3.7);
new CookiesShop('Paris',20,38,2.3);
new CookiesShop('Lima',20,38,2.3);
//#region  HtmlElemens
let selectDropDownList = document.getElementById('currentLocations');
let selectold =  selectDropDownList.selectedIndex;
//#endregion
//#region EventsListeners
document.getElementById('location_name').style.display = 'none';
document.getElementById('addNewForm').addEventListener('submit',addNewLocation);
document.getElementById('closeFormbtn').addEventListener('click',closeForm);
document.getElementById('openNewFormbtn').addEventListener('click',openForm);
document.getElementById('newLocation').addEventListener('click', toggleChangeAddbtn);
selectDropDownList.addEventListener('onchange',selectDDLselectionChanged);

//#endregion
//#region  Functions
function renderHeaderRow(tableName) {
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
  if (tableName === locationsSalesTable ) {
    tableHeadElement.textContent = 'Daily Totals';
    tableRowElement.appendChild(tableHeadElement);
    tableHeadingsElement.appendChild(tableRowElement);
    tableName.appendChild(tableHeadingsElement);
  }else{
    tableHeadElement.textContent = 'Daily Totals';
    tableRowElement.appendChild(tableHeadElement);
    tableHeadingsElement.appendChild(tableRowElement);
    tableName.appendChild(tableHeadingsElement);
  }
}
function renderFooterRow(tableName) {
  let tableFooterElement = document.createElement('tfoot');
  let tableRowElement = document.createElement('tr');
  let tableHeadElement = document.createElement('th');
  tableHeadElement.textContent = 'Hourly Totals';
  tableRowElement.appendChild(tableHeadElement);
  if (tableName === locationsSalesTable){
    for (let i = 0; i < openingHours.length; i++) {
      tableHeadElement = document.createElement('th');
      tableHeadElement.textContent = getGrandTotalsForEachHour(i,tableName);
      tableRowElement.appendChild(tableHeadElement);}
    tableHeadElement = document.createElement('th');
    tableHeadElement.textContent = grandTotalsSummation(tableName);
  }else if (tableName === requiredTossersTable){
    for (let i = 0; i < openingHours.length; i++) {
      tableHeadElement = document.createElement('th');
      tableHeadElement.textContent = getGrandTotalsForEachHour(i,tableName);
      tableRowElement.appendChild(tableHeadElement);}
    tableHeadElement = document.createElement('th');
    tableHeadElement.textContent = grandTotalsSummation(tableName);
  }
  tableRowElement.appendChild(tableHeadElement);
  tableFooterElement.appendChild(tableRowElement);
  tableName.appendChild(tableFooterElement);
}
function getGrandTotalsForEachHour(index,tablename){
  let gT = 0;
  if (tablename === locationsSalesTable){
    for (let j = 0 ; j < locationsarray.length ; j++){
      gT += locationsarray[j].cookiesSalesPerHour[index] ;
    }
    grandTotals.push(gT);
  }else if (tablename === requiredTossersTable){
    for (let j = 0 ; j < locationsarray.length ; j++){
      gT += locationsarray[j].tossers[index] ;
    }
    TossersGT.push(gT);
  }
  return gT;
}
function grandTotalsSummation(tablename){
  let sum = 0;
  if (tablename === locationsSalesTable){
    for (let i =0; i < grandTotals.length ; i++) {
      sum += grandTotals[i];}
    return sum; }
  else if (tablename === requiredTossersTable){
    for (let i =0; i < TossersGT.length ; i++) {
      sum += TossersGT[i];
    }
    return sum; }
}
function tossersClaculator(custumerPerHour){
  let tossers = 0;
  if ((custumerPerHour % 1) === 0) {
    tossers = ( custumerPerHour / 20 ) + 1 ;
  }else {tossers = ( custumerPerHour / 2 );}
  return Math.ceil(tossers);
}
function toggleChangeAddbtn(event){
  event.preventDefault();
  if ( document.getElementById('location_name').style.display === 'none' ){
    document.getElementById('currentLocations').style.display = 'none';
    document.getElementById('location_name').style.display = 'inline';
  }else {
    document.getElementById('currentLocations').style.display = 'inline';
    document.getElementById('location_name').style.display = 'none';
  }}
fillDropDownListObjects(selectDropDownList);
setInterval(function(){
  if(selectold !== selectDropDownList.selectedIndex)
  {
    selectold = selectDropDownList.selectedIndex;
    console.log(selectDropDownList.selectedIndex);
    document.getElementById('min_cust_avrg').value = locationsarray[selectold].minCust;
    document.getElementById('max_cust_avrg').value = locationsarray[selectold].maxCust;
    document.getElementById( 'cookies_avrg').value = locationsarray[selectold].cookiesSales;
  }
},500);

function selectDDLselectionChanged(event){
  event.preventDefault();
  console.log(event.target.option.value);
}
function fillDropDownListObjects(dropDownListId){

  for (let i = dropDownListId.length - 1; i >= 0; i--) {
    dropDownListId.remove(i);
  }

  for (let i of locationsarray){
    let option = document.createElement('option');
    option.value = i.location;
    option.textContent = i.location;
    dropDownListId.appendChild(option);
    dropDownListId.append;
  }

}

function addNewLocation(event){
  event.preventDefault();

  let locationName ;
  let minCust = event.target.min_cust_avrg.value;
  let maxCust = event.target.max_cust_avrg.value;
  let salesavrg = event.target.cookies_avrg.value;

  if( document.getElementById('location_name').style.display === 'none' ) {
    locationName = locationsarray[selectDropDownList.selectedIndex].location;
    inputstribg = locationsarray[selectDropDownList.selectedIndex].location.toLowerCase().trim();
  }else {
    locationName = event.target.location_name.value;
    inputstribg = locationName.toLowerCase().trim(); }
  for (let i = 0; i < locationsarray.length; i++){
    if ((locationsarray[i].location).toLowerCase().trim() === inputstribg ){
      locationsarray[selectDropDownList.selectedIndex].cookiesSalesPerHour = [];
      locationsarray[selectDropDownList.selectedIndex].tossers = [];
      grandTotals = [];
      TossersGT = [];
      locationsarray[selectDropDownList.selectedIndex].minCust = parseInt(document.getElementById('min_cust_avrg').value);
      locationsarray[selectDropDownList.selectedIndex].maxCust = parseInt(document.getElementById('max_cust_avrg').value);
      locationsarray[selectDropDownList.selectedIndex].cookiesSales = parseFloat(document.getElementById( 'cookies_avrg').value);
      resetData(event);

      flag= false;
      break;
    }else {flag= true;}
  }

  if (flag ){
    new CookiesShop(locationName,parseInt(minCust, 10),parseInt(maxCust, 10),parseFloat(salesavrg));
    resetData(event);
    fillDropDownListObjects(selectDropDownList);
  }
}
function resetData(event){
  locationsSalesTable.innerHTML = '';
  requiredTossersTable.innerHTML = '';
  event.target.min_cust_avrg.value = '';
  event.target.max_cust_avrg.value = '';
  event.target.cookies_avrg.value = '';
  locationsAdresslist.innerHTML = '';
  closeForm();
  calculateAndRenderSalesData();
}
function closeForm() {document.getElementById('newLocationForm').style.display = 'none';}
function openForm() {document.getElementById('newLocationForm').style.display = 'block';}
function calculateAndRenderSalesData(){
  for(let i in locationsarray) {

    locationsarray[i].cookiesSalesgenerator();
    locationsarray[i].render();
    locationsarray[i].rendertossersTable();
  }
  renderHeaderRow(locationsSalesTable);

  renderHeaderRow(requiredTossersTable);
  renderFooterRow(requiredTossersTable);
  renderFooterRow(locationsSalesTable);
}
//#endregion

calculateAndRenderSalesData();

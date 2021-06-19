'use strict';
let openingHours = ['6am', '7am', '8am', '9am', '10am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm'];
let locationsarray = [];
let grandTotals = [];
let TossersGT = [];
let flag = false;
let inputstribg;
//#region  HtmlElemens
let locationsSalesTable = document.getElementById('locationsSalesTable');
let requiredTossersTable = document.getElementById('tossersRequired');
let locationsAdresslist = document.getElementById('LocationsList');
let locationNameinput = document.getElementById('location_name');
let selectDropDownList = document.getElementById('currentLocations');
let editShopsForm = document.getElementById('newLocationForm');
let minimumCusttxt = document.getElementById('min_cust_avrg');
let maximumCusttxt = document.getElementById('max_cust_avrg');
let cookieSalesavrg = document.getElementById('cookies_avrg');
let selectold = selectDropDownList.selectedIndex;
let form = document.getElementById('addNewForm');
editShopsForm.style.display = 'none';
locationNameinput.style.display = 'none';
//#endregion
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
CookiesShop.prototype.randomNumberGenerator = function () {
  return Math.ceil(Math.random() * (this.maxCust - (this.minCust + 1)) + this.minCust);
};
CookiesShop.prototype.cookiesSalesgenerator = function () {
  for (let i = 0; i < openingHours.length; i++) {
    let avg = Math.ceil(this.randomNumberGenerator() * this.cookiesSales);
    this.cookiesSalesPerHour.push(avg);
    this.tossers.push(tossersClaculator(avg));
    this.totaltossersperday += tossersClaculator(avg);
    this.totalSalesPerDay += avg;
  }
};
CookiesShop.prototype.render = function () {
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
CookiesShop.prototype.rendertossersTable = function () {
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
new CookiesShop('Seattle', 23, 65, 6.3);
new CookiesShop('Tokyo', 3, 24, 1.2);
new CookiesShop('Dubai', 11, 38, 3.7);
new CookiesShop('Paris', 20, 38, 2.3);
new CookiesShop('Lima', 20, 38, 2.3);
//#region EventsListeners
document.getElementById('closeFormbtn').addEventListener('click', toggleForm);
document.getElementById('openNewFormbtn').addEventListener('click', toggleForm);
document.getElementById('newLocation').addEventListener('click', toggleChangeAddbtn);
form.addEventListener('submit', editLocations);
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
  if (tableName === locationsSalesTable) {
    tableHeadElement.textContent = 'Daily Totals';
    tableRowElement.appendChild(tableHeadElement);
    tableHeadingsElement.appendChild(tableRowElement);
    tableName.appendChild(tableHeadingsElement);
  } else {
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
  if (tableName === locationsSalesTable) {
    for (let i = 0; i < openingHours.length; i++) {
      tableHeadElement = document.createElement('th');
      tableHeadElement.textContent = getGrandTotalsForEachHour(i, tableName);
      tableRowElement.appendChild(tableHeadElement);
    }
    tableHeadElement = document.createElement('th');
    tableHeadElement.textContent = grandTotalsSummation(tableName);
  } else if (tableName === requiredTossersTable) {
    for (let i = 0; i < openingHours.length; i++) {
      tableHeadElement = document.createElement('th');
      tableHeadElement.textContent = getGrandTotalsForEachHour(i, tableName);
      tableRowElement.appendChild(tableHeadElement);
    }
    tableHeadElement = document.createElement('th');
    tableHeadElement.textContent = grandTotalsSummation(tableName);
  }
  tableRowElement.appendChild(tableHeadElement);
  tableFooterElement.appendChild(tableRowElement);
  tableName.appendChild(tableFooterElement);
}

function getGrandTotalsForEachHour(index, tablename) {
  let gT = 0;
  if (tablename === locationsSalesTable) {
    for (let j = 0; j < locationsarray.length; j++) {
      gT += locationsarray[j].cookiesSalesPerHour[index];
    }
    grandTotals.push(gT);
  } else if (tablename === requiredTossersTable) {
    for (let j = 0; j < locationsarray.length; j++) {
      gT += locationsarray[j].tossers[index];
    }
    TossersGT.push(gT);
  }
  return gT;
}

function grandTotalsSummation(tablename) {
  let sum = 0;
  if (tablename === locationsSalesTable) {
    for (let i = 0; i < grandTotals.length; i++) {
      sum += grandTotals[i];
    }
    return sum;
  } else if (tablename === requiredTossersTable) {
    for (let i = 0; i < TossersGT.length; i++) {
      sum += TossersGT[i];
    }
    return sum;
  }
}

function tossersClaculator(custumerPerHour) {
  let tossers = 0;
  if (custumerPerHour % 1 === 0) {
    tossers = custumerPerHour / 20 + 1;
  } else {
    tossers = custumerPerHour / 2;
  }
  return Math.ceil(tossers);
}

function toggleChangeAddbtn(event) {
  event.preventDefault();
  if (locationNameinput.style.display === 'none') {
    form.reset();
    clearInterval(checkSelectOptionChange);
    selectDropDownList.style.display = 'none';
    locationNameinput.style.display = 'inline';
    document.getElementById('newLocation').innerHTML = '-';
  } else {
    form.reset();
    setInterval(check, 500);
    selectDropDownList.style.display = 'inline';
    locationNameinput.style.display = 'none';
    document.getElementById('newLocation').innerHTML = '+';
  }
}
let checkSelectOptionChange = setInterval(check, 500);

function check() {
  if (selectold !== selectDropDownList.selectedIndex) {
    selectold = selectDropDownList.selectedIndex;
    document.getElementById('min_cust_avrg').value = locationsarray[selectold].minCust;
    document.getElementById('max_cust_avrg').value = locationsarray[selectold].maxCust;
    document.getElementById('cookies_avrg').value = locationsarray[selectold].cookiesSales;
  }
}

function fillSelectOptions(dropDownListId) {
  for (let i = dropDownListId.length - 1; i >= 0; i--) {
    dropDownListId.remove(i);
  }
  for (let i of locationsarray) {
    let option = document.createElement('option');
    option.value = i.location;
    option.textContent = i.location;
    dropDownListId.appendChild(option);
    dropDownListId.append;
  }
}

function editLocations(event) {
  event.preventDefault();
  let minCust = event.target.min_cust_avrg.value;
  let maxCust = event.target.max_cust_avrg.value;
  let salesavrg = event.target.cookies_avrg.value;
  let locationName;
  if (selectDropDownList.style.display === 'inline') {
    locationName = locationsarray[selectDropDownList.selectedIndex].location;
    inputstribg = locationName.toLowerCase().trim();
  } else {
    locationName = event.target.location_name.value;
    inputstribg = locationName.toLowerCase().trim();
  }
  for (let i = 0; i < locationsarray.length; i++) {
    if (locationsarray[i].location.toLowerCase().trim() === inputstribg) {
      locationsarray[selectDropDownList.selectedIndex].minCust = parseInt(minimumCusttxt.value);
      locationsarray[selectDropDownList.selectedIndex].maxCust = parseInt(maximumCusttxt.value);
      locationsarray[selectDropDownList.selectedIndex].cookiesSales = parseFloat(cookieSalesavrg.value);
      resetData();
      flag = false;
      break;
    } else {
      flag = true;
    }
  }
  if (flag) {
    new CookiesShop(locationName, parseInt(minCust, 10), parseInt(maxCust, 10), parseFloat(salesavrg));
    resetData();
  }
}

function resetData() {
  locationsAdresslist.innerHTML = '';
  requiredTossersTable.innerHTML = '';
  locationsSalesTable.innerHTML = '';
  form.reset();
  toggleForm(editShopsForm, 'close');
  calculateAndRenderData();
}

function calculateAndRenderData() {
  grandTotals.length = 0;
  TossersGT.length = 0;
  for (let i in locationsarray) {
    locationsarray[i].cookiesSalesPerHour.length = 0;
    locationsarray[i].tossers.length = 0;
    locationsarray[i].cookiesSalesgenerator();
    locationsarray[i].render();
    locationsarray[i].rendertossersTable();
  }
  renderHeaderRow(locationsSalesTable);
  renderHeaderRow(requiredTossersTable);
  renderFooterRow(locationsSalesTable);
  renderFooterRow(requiredTossersTable);
  fillSelectOptions(selectDropDownList);
  createPieChart();
}

function toggleForm() {
  if (editShopsForm.style.display === 'block') {
    editShopsForm.style.display = 'none';
    form.reset();
    clearInterval(checkSelectOptionChange);
  } else {
    editShopsForm.style.display = 'block';
    form.reset();
    setInterval(check, 500);
  }
}
//#endregion
calculateAndRenderData();

function createPieChart() {
  let table = document.getElementById('locationsSalesTable');
  let tableLen = table.rows.length;
  let data = {
    labels: [],
    population: [],
    area: []
  };
  for (let i = 1; i < tableLen - 1; i++) {
    data.labels.push(table.rows[i].cells[0].innerText);
    data.population.push(table.rows[i].cells[1].innerText.replace(',', ''));
    data.area.push(table.rows[i].cells[2].innerText);
  }
  let canvasP = document.getElementById('pieChart');
  let ctxP = canvasP.getContext('2d');
  let myPieChart = new Chart(ctxP, {
    type: 'pie',
    data: {
      labels: data.labels,
      datasets: [{
        data: data.population,
        backgroundColor: ['#363636', '#99D8D0 ', '#B7EFCD', '#FFBCBC', '#3A6351', '#A0937D', '#E7D4B5', '#E3CDC1', '#5E454B', '#D8B384'],
        hoverBackgroundColor: ['#363636', '#99D8D0 ', '#B7EFCD', '#FFBCBC', '#3A6351', '#A0937D', '#E7D4B5', '#E3CDC1', '#5E454B', '#D8B384']
      }]
    },
    options: {
      legend: {
        display: true,
        position: 'right'
      }
    }
  });
}

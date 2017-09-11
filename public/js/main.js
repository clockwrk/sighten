document.addEventListener("DOMContentLoaded", function(event) {

  var resultsTable = document.getElementById('result-table'),
      customersTable = document.getElementById('customer-table'),
      systemsTable = document.getElementById('system-table'),
      results, customers, systems;


  function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
               data = JSON.parse(xmlhttp.responseText);
               results = data.results;
               customers = data.customers;
               systems = data.systems;
               console.log('Results ', data);
               populateTables();
           }
           else if (xmlhttp.status == 400) {
              alert('There was an error 400');
           }
           else {
               alert('something else other than 200 was returned');
           }
        }
    };

    xmlhttp.open("GET", "/api/data", true);
    xmlhttp.send();

}


function populateTables() {
  console.log('results', results);

results.forEach(function(rowData){
    var newRow = resultsTable.rows[0].cloneNode(true);
    newRow.cells[0].innerHTML = rowData.customer_id;
    newRow.cells[1].innerHTML = rowData.system_id;
    newRow.cells[2].innerHTML = rowData.payback_months;
    resultsTable.appendChild( newRow )
  })


customers.forEach(function(rowData){
    var newRow = customersTable.rows[0].cloneNode(true);
    newRow.cells[0].innerHTML = rowData.customer_id;
    newRow.cells[1].innerHTML = rowData.energy_usage_kwh;
    newRow.cells[2].innerHTML = rowData.utility_bill_usd;
    customersTable.appendChild( newRow )
  })

systems.forEach(function(rowData){
    var newRow = systemsTable.rows[0].cloneNode(true);
    newRow.cells[0].innerHTML = rowData.system_id;
    newRow.cells[1].innerHTML = rowData.system_cost_usd;
    newRow.cells[2].innerHTML = rowData.production_kwh;
    systemsTable.appendChild( newRow )
  })
}


loadXMLDoc();











  console.log('Page Loaded')

  //do work
});

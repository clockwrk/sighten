document.addEventListener("DOMContentLoaded", function(event) {

  var resultsTable = document.getElementById('result-table'),
      customerTable = document.getElementById('customer-table'),
      resultTable = document.getElementById('system-table'),
      results, customers, systems;


  function loadXMLDoc() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == XMLHttpRequest.DONE ) {
           if (xmlhttp.status == 200) {
               data = xmlhttp.responseText;
               results = data.results;
               customers = data.customers;
               systems = data.customers;
               console.log('Results ', data);
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


loadXMLDoc();




  console.log('Page Loaded')

  //do work
});

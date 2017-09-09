//Require in npm modules to parse, and write csv files
var babyParse = require('babyparse'),
  csv = require('ya-csv'),
  fs = require('fs'),
  path = require('path'),
  writer = csv.createCsvStreamWriter(fs.createWriteStream('results.csv'), {'quote':''}),
  customersFilePath = 'data/customers.csv',
  systemsFilePath = 'data/systems.csv',
  customersRawData = fs.readFileSync(customersFilePath, {
    encoding: 'binary'
  }),
  systemsRawData = fs.readFileSync(systemsFilePath, {
    encoding: 'binary'
  }),
  customersArray = [],
  systemsArray = [],
  resultsArray = [];

babyParse.parse(customersRawData, {
  header: true,
  step: function(row) {
    let record = row.data.pop();

    for (var prop in record) {
      if (record.hasOwnProperty(prop)) {
        record[prop] = parseInt(record[prop])
      }
    }

    if (!row.errors.length && record !== undefined) customersArray.push(record);
  }
});

babyParse.parse(systemsRawData, {
  header: true,
  step: function(row) {
    let record = row.data.pop();

    for (var prop in record) {
      if (record.hasOwnProperty(prop)) {
        record[prop] = parseInt(record[prop])
      }
    }

    if (!row.errors.length && record !== undefined) systemsArray.push(record);
  }
});

customersArray.forEach(function(customer) {
  let customerCostOfPower = customer.utility_bill_usd.toFixed(2) / customer.energy_usage_kwh

  systemsArray.forEach(function(system) {
    let savingsPerMonth = (system.production_kwh * customerCostOfPower),
      payback_months = system.system_cost_usd / savingsPerMonth,
      result = {};

    result.customer_id = customer.customer_id;
    result.system_id = system.system_id;
    result.payback_months = Math.floor(payback_months);
    resultsArray.push(result);
  });
});

writer.writeRecord(['customer_id', 'system_id', 'payback_months']);
writer = csv.createCsvStreamWriter(fs.createWriteStream('results.csv', {'flags': 'a'}), {'quote':''});

resultsArray.forEach(function(result) {
  writer.writeRecord([result.customer_id, result.system_id, result.payback_months])
})



//created a small server to serve the results.csv from heroku deployment
var express = require('express'),
    app = express();

app.use('/', function(req, res) {
  var csv = __dirname+'/results.csv';

  res.setHeader('Content-disposition', 'attachment; filename=results.csv');
  res.set('Content-Type', 'text/csv');
  res.status(200).sendFile(csv);
});

app.listen(process.env.PORT || 5000, function() {
  console.log('Listening on port 3000!')
});

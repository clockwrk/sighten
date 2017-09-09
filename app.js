var babyParse = require('babyparse'),
    fs = require('fs'),
    customersFilePath = 'data/customers.csv',
    systemsFilePath = 'data/systems.csv',
    customersRawData = fs.readFileSync(customersFilePath, {encoding: 'binary'}),
    systemsRawData = fs.readFileSync(systemsFilePath, {encoding: 'binary'}),
    customersArray = [],
    systemsArray = [],
    resultsArray = [];

    babyParse.parse(customersRawData, {
      header: true,
      step: function(row) {
        console.log('customer row', row);
        customersArray.push(row.data.pop());
      }
    });

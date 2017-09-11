// //Require in npm modules to parse, and write csv files
// var babyParse = require('babyparse'),
//   csv = require('ya-csv'),
//   fs = require('fs'),
//   path = require('path'),
//   writer = csv.createCsvStreamWriter(fs.createWriteStream('server/data/results.csv'), {
//     'quote': ''
//   }),
//   customersFilePath = 'server/data/customers.csv',
//   systemsFilePath = 'server/data/systems.csv',
//   customersRawData = fs.readFileSync(customersFilePath, {
//     encoding: 'binary'
//   }),
//   systemsRawData = fs.readFileSync(systemsFilePath, {
//     encoding: 'binary'
//   }),
//   customersArray = [],
//   systemsArray = [],
//   resultsArray = [];
//
//
//
// babyParse.parse(customersRawData, {
//   header: true,
//   step: function(row) {
//     let record = row.data.pop();
//
//     for (var prop in record) {
//       if (record.hasOwnProperty(prop)) {
//         record[prop] = parseInt(record[prop])
//       }
//     }
//
//     if (!row.errors.length && record !== undefined) customersArray.push(record);
//   }
// });
//
// babyParse.parse(systemsRawData, {
//   header: true,
//   step: function(row) {
//     let record = row.data.pop();
//
//     for (var prop in record) {
//       if (record.hasOwnProperty(prop)) {
//         record[prop] = parseInt(record[prop])
//       }
//     }
//
//     if (!row.errors.length && record !== undefined) systemsArray.push(record);
//   }
// });
//
// customersArray.forEach(function(customer) {
//   let customerCostOfPower = customer.utility_bill_usd.toFixed(2) / customer.energy_usage_kwh
//
//   systemsArray.forEach(function(system) {
//     let savingsPerMonth = (system.production_kwh * customerCostOfPower),
//       payback_months = system.system_cost_usd / savingsPerMonth,
//       result = {};
//
//     result.customer_id = customer.customer_id;
//     result.system_id = system.system_id;
//     result.payback_months = Math.floor(payback_months);
//     resultsArray.push(result);
//   });
// });
//
// writer.writeRecord(['customer_id', 'system_id', 'payback_months']);
// writer = csv.createCsvStreamWriter(fs.createWriteStream('server/data/results.csv', {
//   'flags': 'a'
// }), {
//   'quote': ''
// });
//
// resultsArray.forEach(function(result) {
//   writer.writeRecord([result.customer_id, result.system_id, result.payback_months])
// })

//created a small server to handle file upload and download
var express = require('express'),
  app = express(),
  router = express.Router(),
  fileUpload = require('express-fileupload'),
  resultsGenerator = require('./server/js/resultsGenerator.js'),
  path = require('path');

app.use('/api', require('./server/routes/index.js'));

// router.post('/upload/customers', function(req, res) {
//   console.log('hit uploads route')
//
//   if (!req.files)
//     return res.status(400).send('No files were uploaded.');
//
//   let customerFile = req.files.sampleFile;
//
//   customerFile.mv('/server/data/customers.csv', function(err) {
//     if (err)
//       return res.status(500).send(err);
//
//     res.send('File uploaded!')
//   });
// });
//
// router.post('/upload/systems', function(req, res) {
//
//   console.log(req.files);
//
//   if (!req.files)
//     return res.status(400).send('No files were uploaded.');
//
//   let customerFile = req.files.sampleFile;
//
//   customerFile.mv('/server/data/customers.csv', function(err) {
//     if (err)
//       return res.status(500).send(err);
//
//     res.send('File uploaded!')
//   });
// });

// app.use('/api', require('./server/routes/index.js'));

router.use(function(req, res, next) {
  console.log('/' + req.method);
  next();
})

router.use('/', function(req, res) {

  res.sendFile(__dirname + '/index.html');
})

app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, '/node_modules')));
//
// app.use('/result', function(req, res) {
//   var csv = __dirname+'/results.csv';
//
//   res.setHeader('Content-disposition', 'attachment; filename=results.csv');
//   res.set('Content-Type', 'text/csv');
//   res.status(200).sendFile(csv);
// });

app.listen(process.env.PORT || 3000, function() {

  console.log('systems Array',resultsGenerator.systems);
  console.log('customers Array',resultsGenerator.customers);
  console.log('systems Array',resultsGenerator.results);
  console.log('Listening on port 3000!')
});

'use strict';

var router = require('express').Router();
var path = require('path'),
  mime = require('mime'),
  fs = require('fs'),
  resultsGenerator = require('../js/resultsGenerator.js');


router.use('/download', router.get('/', function(req, res) {

  var file = path.join(__dirname, '../data/results.csv');
  console.log('The resume route', file)
  res.download(file);
}));

// router.get('/customers', function(req, res) {
//   var customersArray = resultsGenerator.customers;
//   res.send(customersArray);
// });
//
//
// router.get('/systems', function(req, res) {
// 	var systemsArray = resultsGenerator.systems;
// 	res.send(systemsArray);
// });

router.get('/data', function(req, res) {
	var data = {};
			data.results = resultsGenerator.results;
			data.customers = resultsGenerator.customers;
			data.systems = resultsGenerator.systems;
  res.send(data);
});

module.exports = router;

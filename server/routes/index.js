'use strict';

var router = require('express').Router();
var path = require('path'),
  mime = require('mime'),
  fs = require('fs'),
  resultsGenerator = require('../js/resultsGenerator.js');


router.use('/download', router.get('/', function(req, res) {
  var file = path.join(__dirname, '../data/results.csv');
  res.download(file);
}));

router.get('/data', function(req, res) {
  var data = {};
  data.results = resultsGenerator.results;
  data.customers = resultsGenerator.customers;
  data.systems = resultsGenerator.systems;
  res.send(data);
});

module.exports = router;

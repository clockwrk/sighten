//created a small server to handle file upload
var express = require('express'),
  app = express(),
  router = express.Router(),
  fileUpload = require('express-fileupload'),
  resultsGenerator = require('./server/js/resultsGenerator.js'),
  path = require('path');

app.use('/api', require('./server/routes/index.js'));

router.use(function(req, res, next) {
  console.log('/' + req.method);
  next();
})

router.use('/', function(req, res) {

  res.sendFile(__dirname + '/index.html');
})

app.use(express.static(path.join(__dirname, 'public')));

app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port 3000!')
});

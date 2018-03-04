var express = require('express');
var path = require('path');
var logger = require('morgan');
var server;
var app = express();
var destinationsApi;

// express middlewares
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, '/public')));

destinationsApi = require('./routes/destinations-api');

// return index file
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.use('/api', destinationsApi);

// development error handler
app.use(function(err, req, res, next) {
  console.log('Unexpected error: ' + JSON.stringify(err));
});

app.set('port', process.env.PORT || 3000);

server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;

var app = require('./server-config.js');
var database = require('./db/index.js');
var express = require('express');

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + './../client/www'));
require('./config/middleware.js')(app, express);
app.listen(app.get('port'));

console.log('Server listening on port ', app.get('port'));



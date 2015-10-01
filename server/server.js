var app = require('./server-config.js');
var database = require('./db/index.js');

app.set('port', process.env.PORT || 3000);
app.listen(app.get('port'));

console.log('Server listening on port ', app.get('port'))

// var express = require('express'),
//      models = require('./server/models'),
//      db = require('./server/db'),
//      pg = require('pg');
// // get dependencies
// var app = require("expre ss")();
 
// // handle request and response
// // app.get("/", function(req, res) {
// //     res.send();
// // });
// // var user = db.User.create({firstName: 'macaulay culkin'});
// // user.save().catch(function(error) {
// //   console.log('failed to save user');
// // });

// app.set('port',process.env.PORT||3000);

// // if ('development' === app.get('env')) {
// //   app.use(express.errorHandler());
// // }

// var connectionString = "postgres://vbanomqzrljvvv:Gs8_u4RIDhHNTmhk4zOBdsNrAc@ec2-54-227-254-13.compute-1.amazonaws.com:5432/d480hpcc0j9jp0";

// pg.connect(connectionString, function(err, client) {
//   if (err) throw err;
//   console.log('Connected to postgres! Getting schemas...');

//   client
//     .query('SELECT table_schema,table_name FROM information_schema.tables;')
//     .on('row', function(row) {
//       console.log(JSON.stringify(row));
//     };);
// });

// db.sequelize.sync().then(function() {
//   http.createServer(app).listen(app.get('port'), function(){
//     console.log('Express server listening on port ' + app.get('port'));
//   };);
// });

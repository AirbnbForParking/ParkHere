var Sequelize = require('sequelize');
//console.log('\n\n\n' + new Sequelize(process.env.DATABASE_URL) + '\n\n\n\n');
var sequelize = new Sequelize(process.env.DATABASE_URL);
var pg = require('pg');
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/airbnbparking';

var client = new pg.Client(connectionString);
client.connect();
//var query = client.query('CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
//query.on('end', function() { client.end();



//



module.exports = sequel


;




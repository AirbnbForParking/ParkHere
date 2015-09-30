var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var db        = {};
var sequelize;

if (process.env.NODE_ENV === 'development') {
  /* Fill out 'db_name', 'db_user', 'db_password' with your own */
  sequelize = new Sequelize('db_name', 'db_user', 'db_password', {
    dialect: 'postgres',
    port: '5432',
    host: 'localhost'
  });
}

/* read all files in directory that are not this file */

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  /* set as Sequelize models and add to db object */
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  /* create relationships between models, if any */
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize   = sequelize;
db.Sequelize   = Sequelize;
module.exports = db;

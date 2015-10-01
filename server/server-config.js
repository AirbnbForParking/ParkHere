var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var serverUtils = require('./serverUtils.js');
var path = require('path');
var models = require('./db/index.js');
var models = models();
var ServiceProvider = models.ServiceProvider;
var Client = models.Client;
var Project = models.Project;
var sequelize = require('./db/database.js');

var http = require('http');

// app.use('/', express.static("./client"));
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

module.exports = app;
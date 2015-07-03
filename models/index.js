'use strict'

var fs        = require('fs');
var path      = require('path');
var basename  = path.basename(module.filename);
var env       = process.env.NODE_ENV || 'development';
var config    = require(__dirname + '/../config/database.json')[env];

var Sequelize = require('sequelize');
var sequelize = new Sequelize(config.database, config.username, config.password, config);

// Loop through all files in /models and Sequelize import them
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize["import"](path.join(__dirname, file));
    module.exports[model.name] = model;
  });

module.exports.sequelize = sequelize;


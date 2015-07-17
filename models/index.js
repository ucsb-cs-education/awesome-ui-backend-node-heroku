'use strict'

var fs        = require('fs');
var path      = require('path');

var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.DATABASE_URL, { });

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


'use strict'

var fs        = require('fs');
var path      = require('path');

var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.DATABASE_URL, { });

var doNotSequelizeThese = ["index.js","QuizDescriptor.js"];

// Loop through all files in /models and Sequelize import them
fs
  .readdirSync(__dirname)
  .filter(function(file) {
	  return (file.indexOf(".") !== 0) && (doNotSequelizeThese.indexOf(file)==-1)
  })
  .forEach(function(file) {
    console.log("file=" + file);
    var model = sequelize["import"](path.join(__dirname, file));
    module.exports[model.name] = model;
  });

module.exports.sequelize = sequelize;


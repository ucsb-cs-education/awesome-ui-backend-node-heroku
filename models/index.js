var Sequelize = require('sequelize');
var sequelize = new Sequelize(process.env.DATABASE_URL);

// For now the only table we have is User
var models = [
  'User'
];

models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

module.exports.sequelize = sequelize;


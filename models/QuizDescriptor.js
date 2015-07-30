module.exports = function(sequelize, DataTypes) {
	var QuizDescriptor =  sequelize.define('QuizDescriptor', {
		id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
		descriptor: {
		  type: DataTypes.STRING,
		  get: function () { 
		    return JSON.parse(this.getDataValue('descriptor'));
		  },
		  set: function (value) {
		    return this.setDataValue('descriptor', JSON.stringify(value));
		  }
		}
	}, {
		classMethods: {
			associate: function(models) {
				QuizDescriptor.belongsTo(models.User);
			}
		}
	});

	return QuizDescriptor;
};
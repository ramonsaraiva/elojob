/*
 * user.js
 * user model
 */

module.exports = function(sequelize, DataTypes) {
	var user = sequelize.define('user', {
		id:
		{
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		email:
		{
			type: DataTypes.STRING(254),
			allowNull: false,
			unique: true
		},
		password:
		{
			type: DataTypes.STRING(16),
			allowNull: false
		}
	});

	return user;
}

/*
 * sync.js
 *
 */

var models = require('../models');

models.sequelize.sync({force: true})
.on('success', function() {
	console.log('Success.');
	models.user.create({ email: 'admin@admin.com', password: 'admin'}).then(function(user) {
		console.log('User ' + user.nome + ' created.');
	});
})
.on('failure', function(e) {
	console.log(e);
});

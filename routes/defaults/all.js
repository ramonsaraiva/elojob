/*
 * all.js
 * arquivo que contem todas as views (is that rite?)
 */

module.exports = function(app, models) {

	app.get('/encomenda/', function(req, res) {
		var record = {nome: 'Ramon'};
		res.json(record);
	});
}

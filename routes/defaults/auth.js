/*
 * auth.s
 * arquivo que vai lidar com as routes de authenticacao
 */

module.exports = function(app, models) {

	app.post('/auth/', function(req, res) {
		models.user.find({
			where: { email: req.body.email,
					 password: req.body.password }
		})
		.on('success', function(record) {
			if (!record)
			{
				res.sendStatus(404);
			}
			else
			{
				res.json(record);
			}
		})
		.on('failure', function(e) {
			res.status(401).send(e);
		})
		.on('error', function(e) {
			res.status(401).send(e);
		});
	});

	app.use(function(req, res, next) {
		var auth;

		if (req.headers.authorization)
			auth = req.headers.authorization.substring(6).split(':');

		if (!auth)
		{
			res.sendStatus(401);
			return;
		}

		models.user.find({
			where: { email: auth[0] }
		})
		.on('success', function(user) {
			if (!user)
			{
				res.sendStatus(401);
			}
			else if (user.password !== auth[1])
			{
				res.sendStatus(401);
			}
			else
			{
				next();
			}
		})
		.on('failure', function(e) {
			res.sendStatus(500);
		})
		.on('error', function(e) {
			res.sendStatus(500);
		});
	});

}

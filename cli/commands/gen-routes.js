const Ensurers = require('../ensurers');

module.exports = {
	bind: ( program ) => {
		
		return program
			.command('gen routes', 'Generate a basic route file')
			.action(function(args, options, logger) {
				Ensurers.app.ensure().then(() => {
					require('../generators/routes/file').generate(`generated/routes.js`, null);
				});
			});
	}
}
module.exports = {
	bind: ( program ) => {
		return program
			.command('gen routes', 'Generate a basic route file')
			.action(function(args, options, logger) {
				require('../generators/routes/file').generate(`generated/routes.js`, null);
			});
	}
}
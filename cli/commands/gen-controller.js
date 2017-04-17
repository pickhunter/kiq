const Ensurers = require('../ensurers');

module.exports = {
	bind: (program) => {
		return program
			.command('gen controller', 'Generate a controller')
			.argument('<controllerName>', 'Controller Name')
			.argument('[actionNames...]', 'Actions')
			.option('-r, --restify', 'Generate a standard RESTful controller')
			.action(function(args, options, logger) {

				Ensurers.app.ensure().then(() => {
					var actions = args.actionNames;

					if(options.restify) {
						actions = _.union(actions, ['index', 'show', 'create', 'update', 'destroy']);
					}

					require('../generators/controller').generate(`generated/controllers/${args.controllerName}.js`, {
						controller: {
							name: args.controllerName
						},
						actions: actions
					});
				});
			});
	}
}
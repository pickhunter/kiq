const Pipo = require('pipo');
const _ = require('lodash');
module.exports = {
	bind: ( program ) => {
		var pipo = new Pipo();
		
		pipo.addFilter(require('../helpers/filters/ensure-in-app-dir'));

		var commandAction = function( stop, args, options, logger ) {
			require('../../updaters/routes').update(`generated/routes.js`, args);
		};

		pipo.addFilter(commandAction);
		
		return program
			.command('add route', 'Add a route')
			.argument('<method>', 'Method Name')
			.argument('<path>', 'Path')
			.argument('<controller>', 'Controller Name')
			.argument('<action>', 'Action Name')
			.action(function() {
				pipo.start.apply(pipo, _.concat([pipo.halt], arguments));
			});
	}
};
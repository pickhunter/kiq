const _ = require('lodash');
const Updaters = require('../updaters');
const Ensurers = require('../ensurers');
const paths = require('../../helpers/paths');

module.exports = {
	bind: ( program ) => {
		
		return program
			.command('add route', 'Add a route')
			.argument('<method>', 'Method Name')
			.argument('<path>', 'Path')
			.argument('<controller>', 'Controller Name')
			.argument('<action>', 'Action Name')
			.action(function( args, options, logger ) {
				Ensurers.app.ensure().then(() => Updaters.routes.update(`./config/routes.js`, args));
			});
	}
};
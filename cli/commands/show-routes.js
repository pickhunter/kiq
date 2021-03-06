const package = require('../../package');
const paths = require('../../helpers/paths');
const _ = require('lodash');
const shell = require('shelljs');
const Ensurers = require('../ensurers');
const Router = require('../../routing/router');

module.exports = {
	bind: (program) => {
		return program
			.command('routes', `Show existing routes for this application`)
			.action(function( args, options, logger ) {
				Ensurers.app.ensure().then(() => {
					var router = new Router();
					var currentFolderPath = paths.getCurrentWorkingDirectory();
					
					router.configureWith(require(`${currentFolderPath}/config/routes`));

					_.map(router.config, 'routes')
						.forEach(routeGroup => {
							routeGroup.forEach(r => console.info(r.toString()));
							// console.log('\n');
						});
				});
				
			});
	}
};
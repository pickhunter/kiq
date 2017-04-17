const package = require('../../package');
const paths = require('../../helpers/paths');
const _ = require('lodash');
const shell = require('shelljs');

module.exports = {
	bind: (program) => {
		return program
			.command('routes', `Show existing routes for this application`)
			.action(function( args, options, logger ) {
				var router = require('../../routing/router');
				var currentFolderPath = paths.getCurrentWorkingDirectory();
				
				router.configureWith(require(`${currentFolderPath}/config/routes`));

				_.map(router.config, 'routes')
					.forEach(routeGroup => {
						routeGroup.forEach(r => console.info(r.toString()));
						// console.log('\n');
					});
				
			});
	}
}
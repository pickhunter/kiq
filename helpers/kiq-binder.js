const Router = require('../routing/router');
const powerdBy = require('../middlewares/powered-by');
const _ = require('lodash');
const Kiq = require('../index');
debugger

module.exports = ( expressApp, routes, kiqApp ) => {
	expressApp.use(powerdBy);

	if( !expressApp ) {
		throw new Error('Express app missing');
	}

	Router.configureWith(routes);

	_.flatten(_.map(Router.config, 'routes')).forEach(route => {
		expressApp[route.method](`${route.path}(.:format)?`, ( req, res, next ) => {
			try{
				route.controller
					.getActionPipeline(route, kiqApp)
					.start(req, res, next);
			}

			catch(e) {
				console.error(e);
				throw(e);
			}
			
		});
	});

};
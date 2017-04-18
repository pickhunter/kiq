const dirToModuleConverter = require('./helpers/folder-to-module');
const server = require('./server');

var expressApp = require('./app');

var Router = require('./routing/router');
var powerdBy = require('./middlewares/powered-by');
var lodash = require('lodash');

var binder = ( expressApp, routes ) => {
	expressApp.use(powerdBy);

	if( !expressApp ) {
		throw new Error('Express app missing');
	}

	Router.configureWith(routes);

	lodash.flatten(lodash.map(Router.config, 'routes')).forEach(route => {
		expressApp[route.method](`${route.path}(.:format)?`, ( req, res, next ) => {
			try{
				route.controller
					.getActionPipeline(route)
					.start(req, res, next);
			}

			catch(e) {
				console.error(e);
				throw(e);
			}
			
		});
	});

};

class App {
	constructor( config ) {
		Object.assign(this, config);

		this.expressApp = expressApp.bind(config.routes, binder);
	}
}

module.exports = {
	controllers: dirToModuleConverter.toModule(`${__dirname}/controllers`),
	start: ( kiqApp, port ) => {
		this.app = kiqApp;
		return server.start(kiqApp, port);
	},
	
	App: App,

	configure: ( configureFn ) => {
		return configureFn({});
	}
};
var Resource = require('./resource');
var Route = require('./route');
var lodash = require('lodash');

class Router {

	constructor() {
		['get', 'put', 'post', 'delete', 'patch', 'options', 'head'].forEach(( method ) => {
			this[method] = ( path ) => {
				return this.route(method, path);
			};
		});

		this._config = [];
	}

	clear() {
		this._config = [];
	}

	configureWith( configureFn ) {

		this.clear();

		configureFn(this);
	}

	get config() {
		return this._config;
	}

	get routes() {
		return lodash.flatten(lodash.map(this._config, 'routes'));
	}

	resource( name, options ) {
		var resource = new Resource(name, options);
		this._config.push(resource);

		return resource;
	}

	route( method, path ) {
		var route = new Route(method, path);
		this._config.push(route);

		return route;
	}
}

module.exports = Router;
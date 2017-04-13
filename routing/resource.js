var lodash = require('lodash');
var Route = require('./route');

class Resource {
	constructor( name, options ) {
		this._routes = [];
		options = this._normalizeResourceOptions(name, options);

		Object.assign(this, options);

		this.name = name;

		var exposedActions = this._filteredActionList({
			allowed: options.allow,
			blocked: options.block
		});

		this._populateRoutes(exposedActions);

	}

	_populateRoutes( exposedActions ) {
		this._routes.push.apply(this._routes, exposedActions.map(( action ) => {
			var routeConfig = this._translateActionToRouteConfig({
				action: action,
				resourceName: this.name,
				path: this.path
			});

			return new Route(routeConfig.method, routeConfig.path).to(`${this.controller}->${action}`);
		}));

		return this._routes;
	}

	_filteredActionList(options) {
		var allowed = options.allowed || ['index', 'show', 'create', 'update', 'destroy'];
		if( options.blocked && options.blocked.length ) {
			allowed = lodash.without(allowed, options.blocked);
		}

		return allowed;
	}

	_normalizeResourceOptions( resourceName, options ) {
		return Object.assign({}, {
			controller: resourceName,
			path: this._makePluralName(resourceName)
		}, options);
	}

	_makePluralName(name) {
		if(/[s]$/.test(name)) {
			return `${name}es`;
		}

		return `${name}s`;
	}

	get routes() {
		return this._routes;
	}

	onSingle() {

	}

	onCollection() {

	}

	_translateActionToRouteConfig( args ) {
		return lodash.clone({
			index: {
				method: 'get',
				path: `/${args.path}/`
			},

			show:  {
				method: 'get',
				path: `/${args.path}/:${args.resourceName}Id`
			},

			create: {
				method: 'post',
				path: `/${args.path}/`
			},

			update: {
				method: 'put',
				path: `/${args.path}/:${args.resourceName}Id`
			},

			destroy: {
				method: 'delete',
				path: `/${args.path}/:${args.resourceName}Id`
			}
		}[args.action]);
	}
}

module.exports = Resource;
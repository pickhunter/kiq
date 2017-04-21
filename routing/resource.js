var _ = require('lodash');
var Route = require('./route');

class Resource {
	constructor( name, options ) {
		this._resourceActions = ['index', 'show', 'create', 'update', 'destroy'];
		this._routes = [];
		options = this._normalizeResourceOptions(name, options);

		Object.assign(this, options);

		this.name = name;

		this.allow(options.allow);
		this.block(options.block);

	}

	_findRoute( action ) {
		var routeBlueprint = this._translateActionToRouteConfig({ action });
		return _.find(this._routes, routeBlueprint);
	}

	allow(allowed) {
		if( allowed && allowed.length ) {
			this.clear();

			this._addRoutes(_.flatten([allowed]));
		}
		return this;
	}

	block(blocked) {
		var blocked = _.flatten([blocked]);
		var allowed = _.without(this._resourceActions, ...blocked);

		return this.allow(allowed);
	}

	_addRoutes( exposedActions ) {
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
		var allowed = options.allowed || this._resourceActions;
		if( options.blocked && options.blocked.length ) {
			allowed = _.without(allowed, options.blocked);
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

	clear() {
		this._routes = [];
	}

	_translateActionToRouteConfig( args ) {
		args = Object.assign({
			path: this.path,
			resourceName: this.name
		}, args)
		return _.clone({
			index: {
				method: 'get',
				path: `/${args.path}`
			},

			show:  {
				method: 'get',
				path: `/${args.path}/:${args.resourceName}Id`
			},

			create: {
				method: 'post',
				path: `/${args.path}`
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
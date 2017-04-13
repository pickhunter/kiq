var lodash = require('lodash');

var Route = require('./route');

var expressRouter = require('express').router;

class Router {

	constructor( options ) {
		if( options.parent ) {
			this.parent = options.parent;
		}
	}

	// Specify the express app for which
	// the routes are being defined
	forApp( appInstace ) {
		if( !appInstace ) {
			throw(new Error('Express App is undefined'));
		}

		this.app = appInstace;

		return this;
	}

	// Commit the routes
	// Then only they get added to the app
	commit() {

	}

	getFilteredResourceActionList(options) {
		var allowed = options.allowed || ['index', 'show', 'create', 'update', 'destroy'];
		if( options.blocked && options.blocked.length ) {
			allowed = lodash.without(allowed, options.blocked);
		}

		return allowed;
	}

	translateActionToRouteConfig( args ) {
		return lodash.clone({
			index: {
				method: 'get',
				path: '/'
			},

			show:  {
				method: 'get',
				path: `/:${args.resourceName}Id`
			},

			create: {
				method: 'post',
				path: '/'
			},

			update: {
				method: 'put',
				path: `/:${args.resourceName}Id`
			},

			destroy: {
				method: 'delete',
				path: `/:${args.resourceName}Id`
			}
		}[args.action]);
	}

	normalizeResourceOptions(resourceName, options) {
		return Object.assign({}, {
			controller: resourceName
		}, options);
	}

	// Define a RESTful resource
	resource(name, options) {

		var self = this;

		options = this.normalizeResourceOptions(name, options);
		
		var exposedActions = this.getFilteredResourceActionList({
			allowed: options.allow,
			blocked: options.block
		});

		var routes = exposedActions.map(( action ) => {
			var routeConfig = this.translateActionToRouteConfig({action: action, resourceName: name});

			routeConfig.controller = options.controller;
			routeConfig.action = action;

			return new Route(routeConfig);
		});

		return new Router({ parent: this });
	}

	get app() {
		var parent = this;
		while(parent.app == null && parent != null) {
			parent = parent.parent;
		}

		return parent.app;
	}


	// Highly Generic
	route( path, options ) {
		
	}

	// BARE ROUTES AND METHODS

	// GET
	get( path, options ) {

	}

	// POST
	post( path, options ) {

	}

	// PUT
	put( path, options) {

	}

	// DELETE
	delete( path, options ) {

	}

	// PATCH
	patch( path, options ) {

	}

	// OPTIONS
	options( path, options ) {

	}


	// HEAD
	head( path, options ) {

	}


	generateRouter(options) {

	}
};

module.exports = new Router();
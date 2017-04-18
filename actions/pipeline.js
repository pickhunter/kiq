var Pipo = require('pipo');
var Pug = require('pug');

class ActionPipeline extends Pipo {

	constructor( route ) {
		super();
		this._postActionPipeline = new Pipo();
		this.route = route;
	}

	addPostFilter( filter ) {
		this._postActionPipeline.addFilter(filter);
	}

	reply( data ) {

		var controllerName = this.route.controllerName;
		var actionName = this.route.actionName;

		this.halt();

		var json = false;
		var html = false;

		if( this.req.params.format == 'json' || this.req.xhr && this.this.req.accepts('json') ) {
			this.res.json(data);
		} else {
			this.res.send(Pug.renderFile(`views/${controllerName}/${actionName}.pug`, data));
		}

		this._postActionPipeline.start();
	}

	error( payload ) {
		this.halt();
		this.res.code(500).error(payload);
	}

	start( req, res, next ) {
		Object.assign(this, { req, res, next });


		super.start(this._getExternallyCallableFn('reply'), this._getExternallyCallableFn('error'), req, res);
	}

	_getExternallyCallableFn( fnName ) {
		var self = this;
		return function(){
			self[fnName].apply(self, arguments);
		}
	}
}

module.exports = ActionPipeline;
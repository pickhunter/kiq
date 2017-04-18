const Pipo = require('pipo');
const Pug = require('pug');
const Request = require('../helpers/request');
const Response = require('../helpers/response');


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

		var format = this.request.format;

		if( format == 'json' ) {
			this.response.json(data);
		} else {
			this.response.send(Pug.renderFile(`views/${controllerName}/${actionName}.pug`, data));
		}

		this._postActionPipeline.start();
	}

	error( payload ) {
		this.halt();
		this.response.status(500);
		this.response.send(payload);
	}

	start( req, res, next ) {
		this.request = new Request(req);
		this.response = new Response(res);
		this.next = next;

		super.start(this._getExternallyCallableFn('reply'),
			this._getExternallyCallableFn('error'),
			this.request,
			this.response
		);
	}

	_getExternallyCallableFn( fnName ) {
		var self = this;
		return function(){
			self[fnName].apply(self, arguments);
		}
	}
}

module.exports = ActionPipeline;
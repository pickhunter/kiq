const Pipo = require('pipo');
const Pug = require('pug');
const Request = require('../helpers/request');
const Response = require('../helpers/response');
const Renderers = require('../helpers/renderers');


class ActionPipeline extends Pipo {

	constructor( route, app ) {
		super();
		this._postActionPipeline = new Pipo();
		this.route = route;
		this.app = app;
		this.renderers = Renderers.getFor(app);
	}

	addPostFilter( filter ) {
		this._postActionPipeline.addFilter(filter);
	}

	send( data ) {

		this.halt();

		var format = this.request.format;

		this.renderers[format].render(this.response, data, this.route, this.request);
		
	}

	reply( data ) {

		this.send(data);

		this._postActionPipeline.start();
	}

	error( data ) {
		var statusCode = /^5[0-9][0-9]/.test(this.response.statusCode) ? this.response.statusCode : 500;
		this.response.status(statusCode);

		this.send(data);
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
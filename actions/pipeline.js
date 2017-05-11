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

	set context( context ) {
		super.context = context;
		this._postActionPipeline.context = context;
	}

	addPostFilter( filter ) {
		this._postActionPipeline.addFilter(filter);
	}

	render( data, options ) {

		options = Object.assign({}, options);

		this.halt();

		this.response.code = options.status || this.response.code;

		var format = this.request.format;
		this.renderers[format].render(data, {
			response: this.response,
			route: this.route,
			request: this.request,
			template: options.template
		});

		this._postActionPipeline.start();
		
	}

	reply( data ) {
		this.render(data);
	}

	error( data ) {
		var statusCode = /^5[0-9][0-9]/.test(this.response.statusCode) ? this.response.statusCode : 500;
		this.render(data, { status: statusCode });
	}

	start( req, res, next ) {
		this.request = new Request(req);
		this.response = new Response(res);
		this.response.code = this.route.expectedCode;
		this.next = next;

		super.start(this.reply.bind(this),
			this.error.bind(this),
			this.request,
			this.response,
			this.render.bind(this)
		);
	}
}

module.exports = ActionPipeline;
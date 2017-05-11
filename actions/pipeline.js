const Pipo = require('pipo');
const Pug = require('pug');
const Renderers = require('../helpers/renderers');


class ActionPipeline extends Pipo {

	constructor( route, app ) {
		super();
		this._postActionPipeline = new Pipo();
		this.route = route;
		this.app = app;
		this.renderers = Renderers.getFor(app);

		this.reply = this.render;
	}

	set context( context ) {
		context.reply = this.reply.bind(this);
		context.render = this.render.bind(this);
		context.error = this.error.bind(this);
		super.context = context;
		this._postActionPipeline.context = context;
	}

	addPostFilter( filter ) {
		this._postActionPipeline.addFilter(filter);
	}

	render( data, options ) {

		options = Object.assign({}, options);

		this.halt();

		this._context.response.code = options.status || this._context.response.code;

		var format = this._context.request.format;
		this.renderers[format].render(data, {
			response: this._context.response,
			route: this.route,
			request: this._context.request,
			template: options.template
		});

		this._postActionPipeline.start();
		
	}

	error( data ) {
		var statusCode = /^5[0-9][0-9]/.test(this._context.response.statusCode) ? this._context.response.statusCode : 500;
		this.render(data, { status: statusCode });
	}

	start() {
		super.start(this.reply.bind(this), this.error.bind(this));
	}

}

module.exports = ActionPipeline;
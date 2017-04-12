var Pipo = require('pipo');

class ActionPipeline extends Pipo {

	constructor() {
		super();
		this._postActionPipeline = new Pipo();
	}

	addPostFilter( filter ) {
		this._postActionPipeline.addFilter(filter);
	}

	reply( response ) {
		this.halt();
		this.res.send(response);
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
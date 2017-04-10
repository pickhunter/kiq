var Pipeline = require('pipo');

class ActionPipeline extends Pipeline {

	reply( response ) {
		this.halt();
		this.res.send(response);
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
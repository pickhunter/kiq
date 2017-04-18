const Reflection = require('./reflection');

class Request {
	constructor( req ) {
		this._req = req;
	}

	get json() {
		return this._req.accepts('json');
	}

	get html() {
		return this._req.accepts('html');
	}

	get format() {
		if( this._req.params.format == 'json' || this._req.xhr && this.json ) {
			return 'json';
		} else if( this.html ) {
			return 'html';
		}
	}
}

var pRequest = Reflection.proxy(Request, {
	private: ['_req'],
	delegate: {
		methods: ['xhr', 'method', 'params', 'query', 'path'],
		to: '_req'
	}
});

module.exports = pRequest;
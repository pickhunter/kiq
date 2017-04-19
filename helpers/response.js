const Reflection = require('./reflection');

class Response {
	constructor( res ) {
		this._res = res;
	}

	get code() {
		return this._res.statusCode;
	}

	set code(val) {
		return this._res.status(val);
	}
}

var pResponse = Reflection.proxy(Response, {
	private: ['_res'],
	delegate: {
		methods: ['cookie', 'clearCookie', 'status', 'send', 'json', 'error', 'statusCode'],
		to: '_res'
	}
});

module.exports = pResponse;

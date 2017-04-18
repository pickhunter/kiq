const Reflection = require('./reflection');

class Response {
	constructor( res ) {
		this._res = res;
	}

	get code() {
		return this._res.code();
	}

	set code(val) {
		return this._res.code(val);
	}
}

var pResponse = Reflection.proxy(Response, {
	private: ['_res'],
	delegate: {
		methods: ['cookie', 'clearCookie', 'status', 'send', 'json', 'error'],
		to: '_res'
	}
});

module.exports = pResponse;

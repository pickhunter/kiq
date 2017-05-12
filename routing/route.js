var Bluebird = require('bluebird');
var fs = require('fs');
var lodash = require('lodash');
var To = require('./to');

var Reflection = require('../helpers/reflection');

class Route {
	constructor( method, path ) {
		this.path = path || '/';
		this.method = method || 'get';
		this.path = this._normalizePath(this.path);
		this.expectCode(200);
	}

	_normalizePath( path ) {
		if(/^\//.test(path)) {
			return path;
		}

		return `/${path}`;
	}

	makeController() {
		return this._to._loadController(this._to.controllerName);
	}

	to(config) {
		this._to = new To(config);
		return this;
	}

	get action() {
		return this._to.action;
	}

	get actionName() {
		return this._to.actionName;
	}

	get controller() {
		return this._to.controller;
	}

	get controllerName() {
		return this._to.controllerName;
	}

	get routes() {
		return [this];
	}

	get expectedCode() {
		return this._expectedCode;
	}

	expectCode(code) {
		this._expectedCode = code;
		return this;
	}

	inspect() {
		return this.toString();
	}

	toString() {
		return `${this.method.toUpperCase()}\t\t${this.path}(.:format)\t\t${this._to.toString()}`;
	}
}

module.exports = Route;
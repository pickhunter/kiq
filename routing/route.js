var Bluebird = require('bluebird');
var fs = require('fs');
var lodash = require('lodash');
var To = require('./to');

var Reflection = require('../helpers/reflection');

class Route {
	constructor( method, path ) {
		path = this._normalizePath(path);
		Object.assign(this, {
			method: 'get',
			path: '/'
		}, { method, path });
	}

	_normalizePath( path ) {
		if(/^\//.test(path)) {
			return path;
		}

		return `/${path}`;
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

	inspect() {
		return this.toString();
	}

	toString() {
		return `${this.method.toUpperCase()}\t\t${this.path}(.:format)\t\t${this._to.toString()}`;
	}
}

module.exports = Route;
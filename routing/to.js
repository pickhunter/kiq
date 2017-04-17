var chalk = require('chalk');
var Reflection = require('../helpers/reflection');
var paths = require('../helpers/paths');

class To {
	constructor(config) {
		var parsedConfig = config.split('->');
		this._assignController(parsedConfig[0]);
		this._assignAction(parsedConfig[1]);
	}

	get action() {
		return this._action;
	}

	get controller() {
		return this._controller;
	}

	_assignAction( actionName ) {
		this.actionName = actionName;
		this._action = this._loadAction(actionName);
	}

	_loadAction( actionName ) {
		return this.controller[actionName];
	}

	_assignController( controllerName ) {
		this.controllerName = controllerName;
		this._controller = this._loadController(controllerName);
	}

	_loadController( controllerName ) {
		var cwd = paths.getCurrentWorkingDirectory();
		var ctrlDef = require(`${cwd}/controllers/${controllerName}`);
		if( Reflection.isClassDefinition(ctrlDef) ) {
			return new ctrlDef;
		}

		return ctrlDef;
	}

	_getControllerInfo() {
		var info = chalk.bold.green('Acquired');

		if(!this.controller) {
			info = chalk.bold.red('Not Defined');
		}

		return info;
	}

	_getActionInfo() {
		var info = chalk.bold.green('Acquired');

		if(!this.action) {
			info = chalk.bold.red('Not Defined');
		}

		return info;
	}

	toString() {
		return `${this.controllerName}->${this.actionName}\t\tcontroller: ${this._getControllerInfo()}\t\taction: ${this._getActionInfo()}`;
	}


}

module.exports = To;
const binder = require('./kiq-binder');
const expressApp = require('../app');
const Renderers = require('./renderers');
const Paths = require('./paths');
const DirToModule = require('./folder-to-module');
const _ = require('lodash');

class App {
	constructor( config ) {
		Object.assign(this, config);

		this.viewEngines = {};

		this.expressApp = expressApp.bind(config.routes, binder, this);
	}

	registerViewEngine( engine, name ) {
		this.viewEngines[name] = engine;
	}

	runInitializers() {
		var env = process.env.NODE_ENV || 'development';
		
		var global = DirToModule.toModule(`${Paths.getCurrentWorkingDirectory()}/init/global`);
		var envSpecific = DirToModule.toModule(`${Paths.getCurrentWorkingDirectory()}/init/${env}`);

		_.forEach(global, initializer => initializer(this));

		_.forEach(envSpecific, initializer => initializer(this));
	}

	get renderers() {
		return Renderers.getFor(this);
	}
}

module.exports = App;
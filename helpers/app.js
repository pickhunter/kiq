const binder = require('./kiq-binder');
const expressApp = require('../app');
const Renderers = require('./renderers');

class App {
	constructor( config ) {
		Object.assign(this, config);

		this.viewEngines = {};

		this.expressApp = expressApp.bind(config.routes, binder, this);
	}

	registerViewEngine( name, engine ) {
		this.viewEngines[name] = engine;
	}

	get renderers() {
		return Renderers.getFor(this);
	}
}

module.exports = App;
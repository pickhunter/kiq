const dirToModuleConverter = require('./helpers/folder-to-module');
const server = require('./server');

const _ = require('lodash');

const App = require('./helpers/app');

const ViewEngines = require('./view-engines');

class Kiq {
	constructor() {

		this.controllers = dirToModuleConverter.toModule(`${__dirname}/controllers`);
		this.App = App;
	}

	start( kiqApp, port ) {

		this.app = kiqApp;

		_.forEach(ViewEngines, ( engine, name ) => {
			kiqApp.registerViewEngine(name, engine);
		});

		return server.start(kiqApp, port);
	}

	configure( configureFn ) {
		return configureFn({});
	}

}

module.exports = new Kiq();
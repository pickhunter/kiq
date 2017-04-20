const dirToModuleConverter = require('./helpers/folder-to-module');
const server = require('./helpers/server');

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

		_.forEach(ViewEngines, kiqApp.registerViewEngine.bind(kiqApp));

		kiqApp.runInitializers();

		return server.start(kiqApp, port);
	}

	configure( configureFn ) {
		return configureFn({});
	}

}

global.Kiq = new Kiq();

module.exports = global.Kiq;
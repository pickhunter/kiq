const dirToModuleConverter = require('./helpers/folder-to-module');
const server = require('./server');

module.exports = {
	controllers: dirToModuleConverter.toModule(`${__dirname}/controllers`)
	start: ( config ) => {
		return server.start(config);
	},
	App: function( config ) {
		this.config = config;
	}
};
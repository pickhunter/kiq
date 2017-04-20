const package = require('../../package');
const _ = require('lodash');
const shell = require('shelljs');
const Ensurers = require('../ensurers');

module.exports = {
	bind: (program) => {
		return program
			.command('start', `Start the ${_.capitalize(package.name)} server`)
			.option('-p <port>, --port <port>', 'Port Number', program.INT)
			.action(function( args, options, logger ) {
				Ensurers.app.ensure().then(() => {
					shell.exec(`FORCE_COLOR=1 node server ${options.port || 5000}`);
				});
			});
	}
};
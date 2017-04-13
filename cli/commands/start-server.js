const package = require('../../package');
const _ = require('lodash');
const shell = require('shelljs');
module.exports = {
	bind: (program) => {
		return program
			.command('start', `Start the ${_.capitalize(package.name)} server`)
			.option('-p <port>, --port <port>', 'Port Number', program.INT)
			.action(function( args, options, logger ) {
				shell.exec(`node server ${options.port || 5000}`);
			});
	}
}
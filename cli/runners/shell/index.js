const shell = require('shelljs');
const Bluebird = require('bluebird');
const chalk = require('chalk');

module.exports = {
	run: Bluebird.method(( command, options ) => {
			shell.exec(command);
	})
};
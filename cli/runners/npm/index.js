const shell = require('../shell');
const chalk = require('chalk');

var run = ( command, options ) => {
	return shell.run(`npm ${command}`);
};

module.exports = {
	run: run,

	install: () => {
		var format = chalk.bold.blue;
		process.stdout.write(format('Installing required packages...'));

		return run('install')
			.then(() => {
				console.log(format('Done!'));
			}, (error) => {
				console.error(chalk.red(error));
			}).finally(() => {
				
			});
	}
};
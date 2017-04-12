const Bluebird = require('bluebird');
const fse = Bluebird.promisifyAll(require('fs-extra'));
const chalk = require('chalk');

module.exports = {
	ensure: ( dirPath ) => {
		return fse.ensureDirAsync(dirPath)
			.then(() => {
				console.log(chalk.blue('Ensuring Directory'), `\t ${dirPath}`);
			}, (e) => {
				console.log(chalk.red(e));
			});
	}
};
const Bluebird = require('bluebird');
const fse = Bluebird.promisifyAll(require('fs-extra'));
const chalk = require('chalk');

module.exports = {
	ensure: ( filePath ) => {
		return fse.ensureFileAsync(filePath)
			.then(() => {
				console.log(chalk.bold.green('Ensuring File'), `\t ${filePath}`);
			}, (e) => {
				console.log(chalk.red(e));
			});
	}
};
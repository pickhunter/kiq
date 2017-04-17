const bluebird = require('bluebird');
const fse = require('fs-extra');
const chalk = require('chalk');
const package = require('../../package');

module.exports = {
	ensure: () => {
		return bluebird.promisify(fse.exists)(`./${package.name}`)
			.then(null, () => {
				console.log(chalk.red('You are not inside a vector app directory.'));
			});	
	}
}
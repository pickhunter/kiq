const fse = require('fs-extra');
const chalk = require('chalk');
const package = require('../../../package');

module.exports = ( halt ) => {
	if(!fse.existsSync(`./${package.name}`)) {
		console.log(chalk.red('You are not inside a vector app directory.'));
		halt && halt();	
	}
}
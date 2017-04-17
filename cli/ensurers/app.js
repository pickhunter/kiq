const Bluebird = require('bluebird');
const fse = require('fs-extra');
const paths = require('../../helpers/paths');
const chalk = require('chalk');
const package = require('../../package');

module.exports = {
	ensure: () => {
		var pr =  new Bluebird(( resolve, reject ) => {
			var appPackage = require(`${paths.getCurrentWorkingDirectory()}/package`);

			if(appPackage[package.name]) {
				resolve();
			} else {
				reject(new Error(`You are not inside a ${package.name} app directory.`));
			}
		});

		var error = (e) => {
			console.log(chalk.red(`You are not inside a ${package.name} app directory.`));
		};

		pr.then(null, error)

		return pr;
		
	}
};
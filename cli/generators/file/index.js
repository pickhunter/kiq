const chalk = require('chalk');
const Bluebird = require('bluebird');
const _ = require('lodash');
const package = require('../../../package');
const fse = Bluebird.promisifyAll(require('fs-extra'));
const pug = require('pug');
const moment = require('moment');

module.exports = {
	generate: ( writePath, options ) => {
		var normalizedOptions = Object.assign({
			creationMessage: 'Created File'
		}, options);

		return Bluebird.promisify(fse.writeFileAsync)(writePath, pug.compileFile(normalizedOptions.template.path)
		(Object.assign({
			package: package,
			_:_,
			moment: moment,
			packageName: _.capitalize(package.name)
		}, normalizedOptions.template.scope)), 'utf-8')
		.then(() => {
			console.info(chalk.green(normalizedOptions.creationMessage), ` \t ${writePath}`);
		}, console.error.bind(console));
	}
}
const chalk = require('chalk');
const createFile = chalk.green;
const Bluebird = require('bluebird');
var _ = require('lodash');
var package = require('../../../package');
var fs = require('fs');
var pug = require('pug');
var moment = require('moment');

module.exports = {
	generate: ( writePath, scopeVars ) => {
		return Bluebird.promisify(fs.writeFile)
			(writePath, pug.compileFile('cli/generators/routes/template.pug')(Object.assign({
				package: package,
				_:_,
				moment: moment
			}, scopeVars)), 'utf-8').then(() => {
				console.info(createFile('Created Routes Config'), ` \t ${writePath}`);
			}, console.error.bind(console));
	}
}
const chalk = require('chalk');
const createFile = chalk.green;

var _ = require('lodash');
var package = require('../../../package');
var fs = require('fs');
var pug = require('pug');
var moment = require('moment');

module.exports = {
	generate: ( writePath, scopeVars ) => {
		debugger
		fs.writeFile(writePath, pug.compileFile('cli/generators/controller/template.pug')(Object.assign({
			package: package,
			_:_,
			moment: moment
		}, scopeVars)), 'utf-8', (error, success) => {
			if(error) {
				console.error(error);
			} else {
				console.info(createFile('Created Controller'), ` \t ${writePath}`);	
			}
		});
	}
}
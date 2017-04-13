const Bluebird = require('bluebird');
const fse = Bluebird.promisifyAll(require('fs'));
const _ = require('lodash');
const chalk = require('chalk');
const routesFilePath = '../../generated/routes.js';


var makeRouteConfigStatement = ( config ) => {
	if( !config || !( config.path && config.controller && config.action && config.method )) {
		var error = 'Invalid Options. Cant create route';
		console.log(chalk.red(error, 'with'), config);
		throw error;
	}

	return `\n  router.${config.method.toLowerCase()}('${config.path}').to('${config.controller.toLowerCase()}->${config.action}');`;
};

module.exports = {
	update: ( filePath, routeConfigs ) => {
		return fse.readFileAsync(filePath)
			.call('toString')
			.then(content => content.split('\n'))
			.then((lines) => {
				var lineNumber = _.findIndex(lines, line => /\(router\) => {$/.test(line));
				var routingStatements = _.flatten([routeConfigs]).map(makeRouteConfigStatement);

				routingStatements.forEach(statement => {
					lines.splice(lineNumber + 1, 0, statement);
				});

				var text = lines.join("\n");

				return fse.writeFileAsync(filePath, text)
					.then(() => console.log(chalk.green('Updated Routes'), `\t${filePath}`),
						() => console.log(chalk.bold.red(err)));

			});


		// var lines = .toString().split("\n");
		// var lineNumber = _.findIndex(lines, line => /\(router\) => {$/.test(line));
		// var routingStatements = _.flatten([routeConfigs]).map(makeRouteConfigStatement);

		// routingStatements.forEach(statement => {
		// 	lines.splice(lineNumber + 1, 0, statement);
		// });

		// var text = lines.join("\n");

		// fs.writeFile(filePath, text, function (err) {
		//   if (err) return console.log(chalk.bold.red(err));
		//   return console.log(chalk.green('Updated Routes'), `\t${filePath}`);
		// });		
		
	}
};





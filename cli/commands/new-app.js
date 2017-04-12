const Bluebird = require('bluebird');
const fse = Bluebird.promisifyAll(require('fs-extra'));
const chalk = require('chalk');
const Pipo = require('pipo');
const _ = require('lodash');

const Generators = require('../generators');
const Updaters = require('../updaters');
const Ensurers = require('../ensurers');


module.exports = {
	bind: ( program, vars ) => {

		return program
			.command('new', `Generate a new #{vars.package.name} app`)
			.argument('<name>', 'Application Name')

			.action(function(args, options, logger) {
				var appRootDir = `./${args.name}`;

				var dirs = {
					app: appRootDir,
					controllers: `${appRootDir}/controllers`,
					config: `${appRootDir}/config`,
					middlewares: `${appRootDir}/middlewares`,
				};

				Ensurers.directory.ensure(dirs.app)
					.then(() => {
						return Bluebird.all([
							Ensurers.directory.ensure(dirs.controllers),
							Ensurers.directory.ensure(dirs.middlewares),
							Ensurers.directory.ensure(dirs.config)
						]);
				}).then(() => {
					var controllerName = _.capitalize(vars.package.name);
					Generators.controller.generate(`${dirs.controllers}/${vars.package.name}.js`, {
						controller: {
							name: `${controllerName}App`,
						},
						actions: ['index']
					});

					Generators.routes
						.generate(`${dirs.config}/routes.js`, null)
						.then(function() {
							Updaters.routes.update(`${dirs.config}/routes.js`, {
								method: 'get',
								path: `/${vars.package.name}`,
								controller: vars.package.name,
								action: 'index'
							});
						});
				});

				// require('../generators/controller').generate(`generated/controllers/${args.controllerName}.js`, {
				// 	controller: {
				// 		name: args.controllerName
				// 	},
				// 	actions: actions
				// });
			});
	}
}
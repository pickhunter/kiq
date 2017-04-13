const Bluebird = require('bluebird');
const fse = Bluebird.promisifyAll(require('fs-extra'));
const chalk = require('chalk');
const Pipo = require('pipo');
const _ = require('lodash');

const Generators = require('../generators');
const Updaters = require('../updaters');
const Ensurers = require('../ensurers');
const Runners = require('../runners');


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
					public: `${appRootDir}/public`,
					javascripts: `${appRootDir}/public/javascripts`,
					stylesheets: `${appRootDir}/public/stylesheets`,
					images: `${appRootDir}/public/images`
				};

				Bluebird.all(_.map(dirs, dir => Ensurers.directory.ensure(dir)))
					.then(() => {
						var controllerName = _.capitalize(vars.package.name);

						Bluebird.all([
							Generators.packageJson.generate(`${dirs.app}/package.json`, {
								app: {
									name: args.name
								}
							}),

							Generators.server.generate(`${dirs.app}/server.js`, {
								app: {
									name: args.name
								}
							}),

							Generators.controller.generate(`${dirs.controllers}/${vars.package.name}.js`, {
								controller: {
									name: `${controllerName}App`,
								},
								actions: ['index']
							}),

							Generators.routes
								.generate(`${dirs.config}/routes.js`, null)
								.then(function() {
									return Updaters.routes.update(`${dirs.config}/routes.js`, {
										method: 'get',
										path: `/${vars.package.name}`,
										controller: vars.package.name,
										action: 'index'
									});
								})
							,
							
							Generators.app.generate(`${dirs.app}/app.js`)
								
						]).then(() => {
							require('shelljs').cd(appRootDir);
							Runners.npm.install();
						}).then(() => {

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
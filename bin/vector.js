#!/usr/bin/env node
var package = require('../package');
var _ = require('lodash');


const prog = require('caporal');

prog
	.version(package.version)
	.description(package.description);
prog
	.command('gen controller', 'Generate a controller')
	.argument('<controllerName>', 'Controller Name')
	.argument('[actionNames...]', 'Actions')
	.option('-r, --restify', 'Generate a standard RESTful controller')
	.action(function(args, options, logger) {

		var actions = args.actionNames;

		if(options.restify) {
			actions = _.union(actions, ['index', 'show', 'create', 'update', 'destroy']);
		}

		require('../generators/controller').generate(`generated/controllers/${args.controllerName}.js`, {
			controller: {
				name: args.controllerName
			},
			actions: actions
		});
	});

	prog
		.command('gen routes', 'Generate a basic route file')
		.action(function(args, options, logger) {
			require('../generators/routes/file').generate(`generated/routes.js`, null);
		});

prog.parse(process.argv);
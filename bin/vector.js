#!/usr/bin/env node
const package = require('../package');
const _ = require('lodash');

const commandBinder = require('../cli/commands');

const prog = require('caporal');

prog
	.version(package.version)
	.description(package.description);

commandBinder.bind(prog, {
	package: package
});

prog.parse(process.argv);
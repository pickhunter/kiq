const fs = require('fs');
const _ = require('lodash');

module.exports = {
	bind: ( program, vars ) => {
		var files = _.without(fs.readdirSync('./cli/commands'), 'index.js');

		files.forEach(file => require(`./${file}`).bind(program, vars));
	}
}
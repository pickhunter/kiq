const fs = require('fs');
const path = require('fs');
const _ = require('lodash');

module.exports = {
	bind: ( program, vars ) => {
		var files = _.without(fs.readdirSync(__dirname), 'index.js');
		files.forEach(file => require(`./${file}`).bind(program, vars));
	}
}
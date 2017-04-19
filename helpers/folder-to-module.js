const _ = require('lodash');
const fse = require('fs-extra');
const path = require('path');

module.exports = {
	toModule: ( srcpath ) => {
		var module = {};
		
		fse.readdirSync(srcpath)
			.filter(name => !_.startsWith(name, '.') && name !== 'index.js')
			.forEach((dir) => {
				var name = _.endsWith(dir, '.js') ? dir.split('.js')[0] : dir;
				module[_.camelCase(name)] = require(`${srcpath}/${dir}`)
			});

		return module;
	}
};
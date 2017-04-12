const _ = require('lodash');
const fse = require('fs-extra');

module.exports = {
	toModule: ( path ) => {
		var module = {};

		_.reject(fse.readdirSync(path), name => _.startsWith(name, '.') || name == 'index.js')
			.forEach((dir) => {
				module[_.camelCase(dir)] = require(`${path}/${dir}`)
			});

		return module;
	}
};
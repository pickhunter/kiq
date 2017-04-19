const fse = require('fs-extra');
const Bluebird = require('bluebird');
const paths = require('./paths');

module.exports = {
	find: ( fileName, possibleFolder ) => {
		var filePath = `${paths.getCurrentWorkingDirectory()}/views/${possibleFolder}/${fileName}`;

		if( fse.existsSync(filePath) ) {
			return filePath;
		} else {
			filePath = `${paths.getCurrentWorkingDirectory()}/views/${fileName}`
			if(fse.existsSync(filePath)) {
				return filePath
			}
		}
	}
}
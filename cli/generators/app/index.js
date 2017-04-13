const FileGenerator = require('../file');

module.exports = {
	generate: ( writePath, scopeVars ) => {
		return FileGenerator.generate(writePath, {
			creationMessage: 'Created App',
			template: {
				path: `${__dirname}/template.pug`,
				scope: scopeVars
			}
		});
	}
};
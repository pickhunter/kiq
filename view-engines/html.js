const Pug =  require('pug');

module.exports = {
	render: ( viewPath, scope ) => {
		return Pug.renderFile(viewPath, scope);
	},

	extension: 'pug'
}
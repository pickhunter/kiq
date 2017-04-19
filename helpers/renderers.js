const _ = require('lodash');
const TemplateFinder = require('./template-finder');

var renderers = null;

const formatToMethodMap = {
	json: 'json',
	html: 'send'
};

module.exports = {
	getFor: ( kiqApp ) => {
		if(!renderers) {
			renderers = {};
			_.forEach(kiqApp.viewEngines, ( engine, name ) => {
				renderers[name] = {
					render : ( data, args ) => {
						var controllerName = args.route.controllerName;
					  var actionName = args.route.actionName;

					  var scope = Object.assign({
					  	actionName,
					  	controllerName,
					  	data
					  }, {
					  	request: args.request,
					  	response: args.response
					  });

					  var templatePath = `views/${controllerName}/${actionName}.${engine.extension}`;

					  if( args.response.code == 404 ) {
					  	templatePath = `views/404.${engine.extension}`;
					  }
					  // else if ( args.response.code == 500 ) {
					  // 	templatePath = `views/500.${engine.extension}`;
					  // }

					  else if(/[4,5][0-9][0-9]/.test(args.response.code)) {
					  	templatePath = `views/error.${engine.extension}`;
					  }

					  if( args.template ) {
					  	templatePath = TemplateFinder.find(`${args.template}.${engine.extension}`, controllerName);
					  }

						return args.response[formatToMethodMap[name]](engine.render(templatePath, scope));
					}
				}
			});
		}

		return renderers;
	}
};
const _ = require('lodash');

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
					render : ( responseHelper, data, route, requestHelper ) => {
						var controllerName = route.controllerName;
					  var actionName = route.actionName;

					  var scope = Object.assign({
					  	actionName,
					  	controllerName
					  }, {
					  	request: requestHelper,
					  	response: responseHelper,
					  }, data);

					  var templatePath = `views/${controllerName}/${actionName}.${engine.extension}`;

					  if( responseHelper.code == 404 ) {
					  	templatePath = `views/404.${engine.extension}`;
					  } else if ( responseHelper.code == 500 ) {
					  	templatePath = `views/500.${engine.extension}`;
					  } else if(/[4,5][0-9][0-9]/.test(responseHelper.code)) {
					  	templatePath = `views/error.${engine.extension}`;
					  }

						return responseHelper[formatToMethodMap[name]](engine.render(templatePath, scope));
					}
				}
			});
		}

		return renderers;
	}
};
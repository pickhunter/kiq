var lodash = require('lodash');

var Logger = require('../helpers/logger').get('Routes');

module.exports = (router) => {
	router.get('/rohit').to('package->index');
	router.get('/radhika').to('package->show');

	router.resource('tiwari', { controller: 'jatin' });

	router.resource('package');//.onSingle((onASingleResource) => {
		// onASingleResource.get('/rohit').to('package->index')
	// }).onCollection((onCollection) => {
		// onCollection.get('/my').to('package->index')
	// });

	lodash.map(router.config, 'routes')
		.forEach(routeGroup => {
			routeGroup.forEach(r => Logger.info(r.toString()));
			console.log('\n');
		});
};
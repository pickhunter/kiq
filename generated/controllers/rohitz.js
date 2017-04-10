var VectorBase = require('../controllers/base');

class RohitzController extends VectorBase {

	index( reply, error, req, res ) {
		reply({controller: 'rohitz', action: 'index'});
	}

	show( reply, error, req, res ) {
		reply({controller: 'rohitz', action: 'show'});
	}

	reggae( reply, error, req, res ) {
		reply({controller: 'rohitz', action: 'reggae'});
	}

	create( reply, error, req, res ) {
		reply({controller: 'rohitz', action: 'create'});
	}

	update( reply, error, req, res ) {
		reply({controller: 'rohitz', action: 'update'});
	}

	destroy( reply, error, req, res ) {
		reply({controller: 'rohitz', action: 'destroy'});
	}

}

module.exports = RohitzController;
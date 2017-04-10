var VectorBase = require('../controllers/base');

class RohitController extends VectorBase {

	index( reply, error, req, res ) {
		reply({controller: 'rohit', action: 'index'});
	}

	show( reply, error, req, res ) {
		reply({controller: 'rohit', action: 'show'});
	}

	reggae( reply, error, req, res ) {
		reply({controller: 'rohit', action: 'reggae'});
	}

	create( reply, error, req, res ) {
		reply({controller: 'rohit', action: 'create'});
	}

	update( reply, error, req, res ) {
		reply({controller: 'rohit', action: 'update'});
	}

	destroy( reply, error, req, res ) {
		reply({controller: 'rohit', action: 'destroy'});
	}

}

module.exports = RohitController;
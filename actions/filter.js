var lodash = require('lodash');

class ActionFilter {
	constructor( fn, options ) {
		if( typeof fn !== 'function' ) {
			throw new Error('Action filter should receive a function block.');
		}
		
		this.fn = fn;

		Object.assign(this, options);
	}

	shouldRun( actionName ) {
		var bShouldExecute = true;
		if( this.for && this.for.length ) {
			bShouldExecute = !!this.for.find(actionName);
		} else if( this.notFor && this.notFor.length ) {
			bShouldExecute = !this.notFor.find(actionName);
		}

		if( bShouldExecute && this.if ) {
			return this.if;
		}

		return bShouldExecute;
	}

}

module.exports = ActionFilter;
var ActionPipeline = require('../actions/pipeline');
var Filter = require('../actions/filter');

class BaseController {

	constructor() {
		this._beforeActions = [];
		this._afterActions = [];
		this.initialize();
	}

	initialize() {

	}

	beforeAction( fn, options ) {
		this._beforeActions.push(new Filter(fn, options));
	}

	afterAction( fn, options ) {
		this._afterActions.push(new Filter(fn, options));
	}

	get preFilters() {
		return this._beforeActions;
	}

	get postFilters() {
		return this._afterActions;
	}

	getActionPipeline( actionName ) {

		var actionFn = this[actionName];

		if( typeof actionFn != 'function' ) {
			throw new Error(`Could not locate action by name '${actionName}'`);
		}

		var pipeline = new ActionPipeline();

		this.preFilters
			.filter(filter => filter.shouldRun(actionName))
			.forEach(filter => pipeline.addFilter(filter.fn));

		pipeline.addFilter(actionFn);

		this.postFilters
			.filter(filter => filter.shouldRun(actionName))
			.forEach(filter => pipeline.addPostFilter(filter.fn));

		return pipeline;
	}
}

module.exports = BaseController;
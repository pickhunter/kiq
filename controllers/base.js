var ActionPipeline = require('../pipelines/action-pipeline');

class BaseController {

	constructor() {
		this._beforeActions = [];
		this._afterActions = [];
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
			.forEach(pipeline.addFilter);

		pipeline.addFilter(actionFn);

		this.postFilters
			.filter(filter => filter.shouldRun(actionName))
			.forEach(pipeline.addFilter);

		return pipeline;
	}
}

module.exports = BaseController;
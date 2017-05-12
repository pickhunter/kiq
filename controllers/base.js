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

	getActionPipeline( route, app ) {

		var actionName = route.actionName;
		var controllerName = route.controllerName;

		var actionFn = this[actionName];

		var kiqHandleFn = ( reply, error, req, res ) => {
			
			reply({
		    controller: controllerName,
		    action: actionName,
		    params: Object.assign({}, req.params, req.query)
		  });

		};

		if( typeof actionFn != 'function' ) {
			throw new Error(`Could not locate action by name '${actionName}'`);
		}

		var pipeline = new ActionPipeline(route, app);
		pipeline.context = this;

		this.preFilters
			.filter(filter => filter.shouldRun(actionName))
			.forEach(filter => pipeline.addFilter(filter.fn));

		pipeline.addFilter(actionFn);

		pipeline.addFilter(kiqHandleFn)

		this.postFilters
			.filter(filter => filter.shouldRun(actionName))
			.forEach(filter => pipeline.addPostFilter(filter.fn));

		return pipeline;
	}
}

module.exports = BaseController;
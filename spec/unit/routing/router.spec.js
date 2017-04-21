const Router = require('../../../routing/router');
const Resource = require('../../../routing/resource');

describe('Add Routes', () => {

	var router = new Router();

	beforeEach(() => {
		router = new Router();
	});

	var methods = ['get', 'put', 'post', 'delete', 'patch', 'options', 'head'];

	methods.forEach((method) => {
		it(`should add a ${method.toUpperCase()} route`, () => {
			router[method]('/rohit').to('rohit->index');
			var route = router.routes[0];
			expect(router.routes.length).toEqual(1);
			expect(route.controllerName).toEqual('rohit');
			expect(route.actionName).toEqual('index');
			expect(route.method).toEqual(method);
		})
	});
});

describe('Clear Routes', () => {

	var router = new Router();

	beforeEach(() => {
		router = new Router();
	});

	it(`should clear all the routes`, () => {
		router.get('/rohit').to('rohit->index');
		router.clear();
	})
});

describe('Router Configure', () => {

	var router = new Router();

	beforeEach(() => {
		router = new Router();
	});

	var methods = ['get', 'put', 'post', 'delete', 'patch', 'options', 'head'];

	it(`should have the configuration from the configuration function`, () => {
		var configureFn = (router) => {
			methods.forEach((method) => {
				router[method]().to('rohit->index');
			});
		};

		router.configureWith(configureFn);

		router.routes.forEach((route, i) => {
			expect(route.method).toEqual(methods[i]);
			expect(route.path).toEqual('/');
			expect(route.controllerName).toEqual('rohit');
			expect(route.actionName).toEqual('index');
		});
		
	});

});

describe('Routing for a resource', () => {
	var router = new Router();

	beforeEach(() => {
		router = new Router();
	});

	it('should create a resource', () => {
		router.resource('rohit');

		expect(router.config[0] instanceof Resource).toEqual(true);

	});
});

// Pending
// get config
// Resource

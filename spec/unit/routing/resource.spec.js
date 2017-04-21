const _ = require('lodash');
const Resource = require('../../../routing/resource');
describe('Bare Resource', () => {

	it('should create a resource', () => {
		var resource = new Resource('rohit');

		expect(resource.routes.length).toEqual(5);

		var expectations = [
			route => route.method == 'get' && route.path == '/rohits',
			route => route.method == 'post' && route.path == '/rohits',
			route => route.method == 'get' && route.path == '/rohits/:rohitId',
			route => route.method == 'put' && route.path == '/rohits/:rohitId',
			route => route.method == 'delete' && route.path == '/rohits/:rohitId'
		];

		expectations.forEach(expectation => expect(resource.routes.filter(expectation).length).toEqual(1));
	});
});

describe(`Resource name ending with 's'`, () => {
	it('should create routes ending with \'es\'', () => {
		var resource = new Resource('rohits');
		expect(resource.routes[0].path).toEqual('/rohitses');
	});
});

describe('Resource trimming', () => {
	var resource;
	
	beforeEach(() => {
		resource = new Resource('rohit');
	});

	it('should allow the routes specified in \'allow\'', () => {
		var allow = ['show', 'index'];
		resource.allow(allow);

		var routes = resource.routes;

		expect(routes.length).toEqual(2);
		expect(_.find(routes, {method: 'get', path: '/rohits'})).toBeDefined();
		expect(_.find(routes, {method: 'get', path: '/rohits/:rohitId'})).toBeDefined();
	});


	it('should block the routes specified in \'block\'', () => {
		var block = ['show', 'index'];
		resource.block(block);

		var routes = resource.routes;

		expect(routes.length).toEqual(3);
		expect(_.find(routes, {method: 'get', path: '/rohits'})).not.toBeDefined();
		expect(_.find(routes, {method: 'get', path: '/rohits/:rohitId'})).not.toBeDefined();

		expect(_.find(routes, {method: 'post', path: '/rohits'})).toBeDefined();
		expect(_.find(routes, {method: 'put', path: '/rohits/:rohitId'})).toBeDefined();
		expect(_.find(routes, {method: 'delete', path: '/rohits/:rohitId'})).toBeDefined();
	});


	it('should handle combination of allow and block', () => {
		resource
			.allow(['show', 'index'])
			.block(['index']);

		var routes = resource.routes;

		expect(routes.length).toEqual(4);
		expect(routes[0].method).toEqual('get');
		expect(routes[0].path).toEqual('/rohits/:rohitId');

		resource
			.block(['index'])
			.allow(['index']);

		expect(resource.routes.length).toEqual(1);
		expect(resource.routes[0].method).toEqual('get');
		expect(resource.routes[0].path).toEqual('/rohits');
	});

	it('should handle non arrays', () => {
		resource
			.allow('index');

		expect(resource.routes.length).toEqual(1);

		resource
			.block('index');

		expect(resource.routes.length).toEqual(4);
	});
});
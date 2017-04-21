const Route = require('../../../routing/route');

describe('Route Fallbacks and Normalizations', () => {
	it('should normalize path', () => {
		var route = new Route('get', 'rohit');

		expect(route.method).toEqual('get');
		expect(route.path).toEqual('/rohit');
	});

	it('should fallback to get and /', () => {
		var route = new Route();

		expect(route.method).toEqual('get');
		expect(route.path).toEqual('/');
	});
});
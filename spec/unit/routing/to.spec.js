const To = require('../../../routing/to');
describe('To Configuration', () => {
	var to = new To('rohit->index');

	it('should store the action name', () => {
		expect(to.actionName).toEqual('index');
	});

	it('should store the controller name', () => {
		expect(to.controllerName).toEqual('rohit');
	});

});

describe('To Under the hood', () => {
	var to;
	beforeEach(() => {
		spyOn(To.prototype, '_assignController').and.callThrough();
		spyOn(To.prototype, '_assignAction').and.callThrough();
		spyOn(To.prototype, '_loadController');
		spyOn(To.prototype, '_loadAction');
		to = new To('rohit->index');
	});

	it('should try to assign controller', () => {
		expect(to._assignController).toHaveBeenCalledWith('rohit');
	});

	it('should try to assign action', () => {
		expect(to._assignAction).toHaveBeenCalledWith('index');
	});

	it('should try to load controller', () => {
		expect(to._loadController).toHaveBeenCalledWith('rohit');
	});

	it('should try to load action', () => {
		expect(to._loadAction).toHaveBeenCalledWith('index');
	})
})
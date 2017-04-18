module.exports = {
	isClassDefinition: ( arg ) => {
		return typeof arg === 'function' && /^\s*class\s+/.test(arg.toString());
	},

	prettyPrint: ( obj ) => {
		return JSON.stringify(obj, null, 2);
	},

	proxy: ( classDef, options ) => {
		var handler = {
			construct: ( target, argumentsList, newTarget ) => {
				var h = {
					get: ( target, name ) => {
						var delegatedPropNames = [];
						var delegationTarget = {};
						
						if( options.delegate ) {
							delegatedPropNames = options.delegate.methods;
							delegationTarget = target[options.delegate.to];

							if(typeof delegationTarget == 'function') {
								delegationTarget = target[options.delegate.to]();
							}
						}

						var privateMethods = options.private;

						var prop = null;

						if(delegatedPropNames.indexOf(name) != -1) {
							prop = delegationTarget[name];
						} else if(privateMethods.indexOf(name) == -1) {
							prop = target[name];
						}

						if(typeof prop == 'function') {
							return function() {
								prop.apply(delegationTarget, arguments);
							}
						}

						return prop;
					}
				};

				var classInstance = new classDef(...argumentsList);
				
				var proxy = new Proxy(classInstance, h);
				return proxy;
			}
		}
		return new Proxy(classDef, handler);
	}
}
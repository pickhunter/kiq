module.exports = {
	isClassDefinition: ( arg ) => {
		return typeof arg === 'function' && /^\s*class\s+/.test(arg.toString());
	},

	prettyPrint: ( obj ) => {
		return JSON.stringify(obj, null, 2);
	}
}
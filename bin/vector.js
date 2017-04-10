var pug = require('pug');
var argParser = require('./args-parser');

if( process.argv.length > 2 ) {
	var arguments = process.argv.slice(2, process.argv.length - 1);
}
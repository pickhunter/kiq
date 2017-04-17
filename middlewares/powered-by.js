const package = require('../package');
const _ = require('lodash');
module.exports = ( req, res, next ) => {
	console.log('X-Powered-By', _.capitalize(package.name));
  res.setHeader( 'X-Powered-By', _.capitalize(package.name) );
  next();
};
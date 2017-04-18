const package = require('../package');
const _ = require('lodash');
module.exports = ( req, res, next ) => {
  res.setHeader( 'X-Powered-By', _.capitalize(package.name) );
  next();
};
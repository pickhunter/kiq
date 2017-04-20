/**
* Module dependencies.
*/
var debug = require('debug')(`kiq:server`);
var http = require('http');
var _ = require('lodash');
var Branding = require('./branding');
var server;

var chalk = require('chalk');

module.exports = {
  start: ( kiqApp, port ) => {

    Branding.show();
    
    var config = kiqApp.config;
    var port = port || config.port;
    var expressApp = kiqApp.expressApp;

    /**
    * Get port from environment and store in Express.
    */

    var port = normalizePort(port);
    expressApp.set('port', port);

    /**
    * Create HTTP server.
    */

    server = http.createServer(expressApp);

    /**
    * Listen on provided port, on all network interfaces.
    */

    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

    return server;
  }
}

/**
* Normalize a port into a number, string, or false.
*/

function normalizePort(val) {
  var port = parseInt(val, 10);
 
  if (isNaN(port)) {
    // named pipe
    return val;
  }
 
  if (port >= 0) {
    // port number
    return port;
  }
 
  return false;
}

/**
* Event listener for HTTP server "error" event.
*/

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
 
  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;
 
  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
* Event listener for HTTP server "listening" event.
*/

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var Kiq = require('./index');
const Request = require('./helpers/request');
const Response = require('./helpers/response');

global.Promise = Promise;

var app = express();

module.exports = {
	bind: ( routes, binder, kiqApp ) => {
		// view engine setup
		app.set('views', path.join(__dirname, 'views'));
		app.set('view engine', 'pug');

		// uncomment after placing your favicon in /public
		//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
		app.use(logger('dev'));
		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({ extended: false }));
		app.use(cookieParser());
		app.use(express.static(path.join(__dirname, 'public')));

		binder(app, routes, kiqApp);

		// catch 404 and forward to error handler
		app.use(function(req, res, next) {
		  var err = new Error('Not Found');
		  err.status = 404;
		  next(err);
		});

		// error handlers
		app.use(function(err, req, res, next) {
		 // set locals, only providing error in development
		 res.locals.message = err.message;
		 res.locals.error = req.app.get('env') === 'development' ? err : {};

		 // render the error page
		 res.status(err.status || 500);

		 var request = new Request(req);
		 var response = new Response(res);

		 kiqApp.renderers[request.format].render(response, err, {}, request);

		});

		return app;
	}
};
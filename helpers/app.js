const express = require('express');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const Paths = require('./paths');
const powerdBy = require('../middlewares/powered-by');
const Router = require('../routing/router');
const path = require('path');
const _ = require('lodash');
const DirToModule = require('./folder-to-module');
const Renderers = require('./renderers');
const Request = require('./request');
const Response = require('./response');

class KiqApp {
	constructor( config ) {
		var cwd = Paths.getCurrentWorkingDirectory();
		var appConfig = require(`${Paths.getCurrentWorkingDirectory()}/config`);
		Object.assign(this, appConfig, config);

		this.expressApp = express();
		this.router = new Router();
		this._registerFrontMiddlewares(this.expressApp);
		this._kiqify(this.expressApp, this.routes);
		this._registerRearMiddlewares(this.expressApp);

		this.viewEngines = {};
	}

	registerViewEngine( engine, name ) {
		this.viewEngines[name] = engine;
	}

	registerViewEngine( engine, name ) {
		this.viewEngines[name] = engine;
	}

	runInitializers() {
		var env = process.env.NODE_ENV || 'development';
		
		var global = DirToModule.toModule(`${Paths.getCurrentWorkingDirectory()}/init/global`);
		var envSpecific = DirToModule.toModule(`${Paths.getCurrentWorkingDirectory()}/init/${env}`);

		_.forEach(global, initializer => initializer(this));

		_.forEach(envSpecific, initializer => initializer(this));
	}

	get renderers() {
		return Renderers.getFor(this);
	}

	_kiqify( expressApp, routes	) {
		expressApp.use(powerdBy);

		if( !expressApp ) {
			throw new Error('Express app missing');
		}

		this.router.configureWith(routes);

		_.flatten(_.map(this.router.config, 'routes')).forEach(route => {
			expressApp[route.method](`${route.path}(.:format)?`, ( req, res, next ) => {

				try {

					var controller = route.makeController();

					controller.request = new Request(req);
					
					controller.response = new Response(res);
					controller.response.code = route.expectedCode;

					var pipeline = controller.getActionPipeline(route, this);
					
					pipeline.start();

				}

				catch(e) {

					console.error(e);
					throw(e);

				}
				
			});
		});
	}

	_registerFrontMiddlewares( expressApp ) {
		// uncomment after placing your favicon in /public
		//expressApp.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
		expressApp.use(logger('dev'));
		expressApp.use(bodyParser.json());
		expressApp.use(bodyParser.urlencoded({ extended: false }));
		expressApp.use(cookieParser());
		expressApp.use(express.static(path.join(__dirname, 'public')));
	}

	_registerRearMiddlewares( expressApp ) {
		// catch 404 and forward to error handler
		expressApp.all('/[^.]+(.:format)?/', function(req, res, next) {
		  var err = new Error('Not Found');
		  err.status = 404;
		  next({
		  	format: req.params.format,
		  	status: err.status,
		  	error: err
		  });
		});

		// error handlers
		expressApp.use(( err, req, res, next ) => {
		  // set locals, only providing error in development
		  res.locals.message = err.message;
		  res.locals.error = req.app.get('env') === 'development' ? err : {};

		  // render the error page
		  res.status(err.status || 500);

		  var request = new Request(req);
		  var response = new Response(res);

		  this.renderers[err.format || request.format].render(err.error, {
		  	response: response,
		  	route: {},
		  	request: request
		  });

		});
	}
}

module.exports = KiqApp;
/* 
 * @Project    My Home IoT
 * @Version    1.0.1
 * @Author     Tran Ngoc Anh
 * @Email      tran.ngoc.anh@infogram.co.jp
 * @License    MIT License
 * @Copyright  2017 Keite Tran
 */

// Module dependencies.
// -------------------------
var config = require('./config');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var compression = require('compression');

module.exports = function (app) {

	// Development mode
	// -------------------------------------
	if (app.get('env') === 'development') {
		var logger = require('morgan');
		app.use(logger('dev', {
			skip: function (req, res) {
				return res.statusCode < 400;
			}
		}));
	}

	// Setup cookie
	var cookie = require('cookie-parser');
	app.use(cookie());


	// Production mode
	// -------------------------------------
	if (app.get('env') === 'production') {
		// enable cache
		// app.set('view cache', false);
	}

	// Setup asset folder
	// -------------------------------------
	app.use('/assets', express.static(path.join(config.root, '/assets')));


	// Setup app icon
	// -------------------------------------
	app.use('/favicon.ico', express.static(path.join(config.root, 'favicon.ico')));


	// Setup EJS view engine
	// -------------------------------------
	app.engine('ejs', require('ejs-locals'));
	app.set('views', config.root + '/views');
	app.set('view engine', 'ejs');


	// Body content setup
	// -------------------------------------
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: false
	}));
};
#!/usr/bin/env node

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
const config = require('./core/config');
const express = require('express');
const app = express();

const server = require('http').createServer(app);
app.io = require('socket.io')(server, {
	'forceNew': true // Detect new client connect (F5 from client) 
});

// Setup port 
const port = process.env.PORT || config.port;
const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

// Load routes and config
// -------------------------------------
require('./core/express')(app);
require('./core/routes')(app);


// Load middlewares level application
// -------------------------------------
require('./middlewares/index')(app);


// Listen on provided port, on all network interfaces.
// -------------------------
server.listen(port);


// Event listener for HTTP server "error" event.
// -------------------------
server.on('error', (error) => {
	if (error.syscall !== 'listen') throw error;

	// handle specific listen errors with friendly messages
	switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges.');
			process.exit();
			break;

		case 'EADDRINUSE':
			console.error(bind + ' is already in use.');
			process.exit();
			break;

		default:
			throw error;
	}
});


// Event listener for HTTP server "listening" event.
// -------------------------
server.on('listening', () => {
	console.log('Listening on: ' + bind);
});
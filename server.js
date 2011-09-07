#!/usr/bin/env node
var sys = require('sys');
var uuid = require('node-uuid');
var connect = require('connect');
var ws = connect.createServer(
    connect.logger(),
    connect.bodyParser(),
		connect.static(__dirname), // Use a different static path in a production environment :P
    connect.router(function(app) {
        app.post('/', function(req, res, next) {
            res.setHeader('Content-Type', 'text/plain');
            res.end(req.rawBody);
        });
        app.get('/', function(req, res, next) {
            res.end('Try POSTing it');
        });
        app.get('/uuid', function(req, res, next) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({guid: uuid()}));
        });
    })
).listen(4000);

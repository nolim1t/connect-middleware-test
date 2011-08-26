#!/usr/bin/env node
var sys = require('sys');
var connect = require('connect');
var ws = connect.createServer(
    connect.logger(),
    connect.bodyParser(),
    connect.router(function(app) {
        app.post('/', function(req, res, next) {
            res.end(req.rawBody);
        });
        app.get('/', function(req, res, next) {
            res.end('Try POSTing it');
        });
    })
).listen(4000);

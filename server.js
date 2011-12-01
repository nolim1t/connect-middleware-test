#!/usr/bin/env node
var sys = require('sys');
var uuid = require('node-uuid');
var connect = require('connect');
var sys = require('sys')
var exec = require('child_process').exec;
var child;

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
        app.get('/pwd', function(req, res, next) {
            res.setHeader('Content-Type', 'text/plain');
            child = exec('pwd', function (err,stderr,stdout) {
                if (err) {
                    res.end('An error ' + err + ' has occured');
                } else {
                    res.end('stderr="' + stderr + '";stdout="' + stdout + '"');                
                }                
            })
        })
    })
).listen(4000);

#!/usr/bin/env node

/**
 * creates ExpressJS backend API server on port 3000
 */

const app_express = require('./server/app_express');
const debug = require('debug')('sprint-ng:server');
const http = require('http');
const api_port = 3000;

app_express.set('port', api_port);

const server = http.createServer(app_express);

server.listen(api_port);


/**
 * creates ExpressJS frontend Angular server on environment port, or 8080 (Heroku default)
 */

const express = require('express');
const path = require('path');
const app_ng = express();

app_ng.use(express.static(__dirname + '/dist/sprint'));

app_ng.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/sprint/index.html'));
});

app_ng.listen(process.env.PORT || 8080);

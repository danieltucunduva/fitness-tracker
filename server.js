#!/usr/bin/env node

/**
 * creates ExpressJS backend API server
 */

const appExpress = require('./server/app_express')
const http = require('http')
const apiPort = process.env.PORT || 8080

appExpress.set('port', apiPort)

const server = http.createServer(appExpress)

server.listen(apiPort)

console.log('Magic happens in port ' + apiPort)

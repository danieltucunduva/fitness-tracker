#!/usr/bin/env node

/**
 * Development server
 * Creates ExpressJS backend API server WITHOUT serving the production Angular app (run ng serve in parallel)
 */

const appExpressDev = require('./server/dev_app_express')
const http = require('http')
const apiPort = 8080

appExpressDev.set('port', apiPort)

const server = http.createServer(appExpressDev)

server.listen(apiPort)

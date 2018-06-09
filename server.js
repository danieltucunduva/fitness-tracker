#!/usr/bin/env node

/**
 * creates ExpressJS backend API server on port 3000
 */

const appExpress = require('./server/app_express')
const http = require('http')
const apiPort = 8080

appExpress.set('port', apiPort)

const server = http.createServer(appExpress)

server.listen(apiPort)

/**
 * creates ExpressJS frontend Angular server on environment port, or 8080 (Heroku default)
 */

// const express = require('express')
// const path = require('path')
// const appNg = express()

// appNg.use(express.static(path.join(__dirname, '/dist/sprint')))

// appNg.get('/*', function (req, res) {
//   res.sendFile(path.join(path.join(__dirname, '/dist/sprint/index.html')))
// })

// appNg.listen(process.env.PORT || 8080)

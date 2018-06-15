const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const api = require('./routes/api.route')
const bluebird = require('bluebird')
const mongoose = require('mongoose')
const app = express()

let DB_URI_LOCAL, USE_CONSOLE_FOR_LOGGING
try {
  const environmentVariables = require('./.environment_variables')
  DB_URI_LOCAL = environmentVariables.DB_URI
  USE_CONSOLE_FOR_LOGGING = environmentVariables.USE_CONSOLE_FOR_LOGGING
} catch (ex) {
  console.log('Environment variables local file not found')
}

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)

const ENV_USE_CONSOLE_FOR_LOGGING = process.env.USE_CONSOLE_FOR_LOGGING

let logger
if (USE_CONSOLE_FOR_LOGGING || ENV_USE_CONSOLE_FOR_LOGGING) {
  logger = console
  app.use((req, res, next) => {
    const now = new Date()
    logger.log('__________________________________________________________________________')
    logger.log('Request at ' + now.toLocaleString() + ' (ISO: ' + now.toISOString() + '):')
    logger.log('Origin: ' + req.headers.origin)
    logger.log('URL:    ' + req.url)
    logger.log('Method: ' + req.method)
    if (req.method === 'POST') {
      logger.log('Body:   ' + JSON.stringify(req.body, {}, 2))
    }
    logger.log('--------------------------------------------------------------------------')
    next()
  })
} else {
  const graylog = require('graylog-loging')
  graylog.init({
    graylogPort: 12201,
    graylogHostname: '127.0.0.1'
  })
  app.use(graylog.logResponse)
  app.use(graylog.logRequest)
  app.use(graylog.handleErrors)
  const graylog2 = require('graylog2')
  const Graylog2 = graylog2.graylog
  logger = new Graylog2({
    servers: [{
      host: '127.0.0.1',
      port: 12201
    }]
  })
}

// DB_URI_LOCAL = 'mongodb:// localhost:27017/db_sprint'

const ENV_DB_URI = process.env.MONGODB_URI

if (!ENV_DB_URI && !DB_URI_LOCAL) {
  throw new Error(
    'Database URI is missing, local and environment options are both undefined'
  )
}

const DB_URI = ENV_DB_URI || DB_URI_LOCAL

logger.log('ENV_DB_URI: ' + ENV_DB_URI)
logger.log('DB_URI:     ' + DB_URI)

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, User'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

//  view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(favicon(path.join(__dirname, 'public', 'favicon.png')))

app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', api)
app.use(express.static(path.join(__dirname, '../dist/sprint')))

//  catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not found')
  err.status = 404
  next(err)
})

//  error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message
  res.locals.error = err
  res.status(err.status || 500)
  res.render('error')
})

mongoose.Promise = bluebird
mongoose
  .connect(
    DB_URI, {
      useMongoClient: true
    }
  )
  .then(() => {
    logger.log(`Succesfully Connected to the Mongo database at URI: ${DB_URI}`)
  })
  .catch(() => {
    logger.log(`Error Connecting to the Mongo database at URI: ${DB_URI}`)
  })

module.exports = app

const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const api = require('./routes/api.route')
const bluebird = require('bluebird')
const mongoose = require('mongoose')

const app = express()

// /////////////////////////////////////////////////
/**
 * To use Graylog (local server)
 */
// const graylog = require('graylog-loging')
// const graylog2 = require('graylog2')
// // log management
// var logger = new graylog2.graylog({
//   servers: [{
//     host: '127.0.0.1',
//     port: 12201
//   }]
// })
// // http logs
// graylog.init({
//   graylogPort: 12201,
//   graylogHostname: '127.0.0.1'
// })
// app.use(graylog.logResponse)
// app.use(graylog.logRequest)
// app.use(graylog.handleErrors)
// /////////////////////////////////////////////////
/**
 * To use the console (for the Heroku deploy)
 */
const logger = console
// /////////////////////////////////////////////////

mongoose.Promise = bluebird

var DB_URI_LOCAL
try {
  const environmentVariables = require('./.environment_variables')
  DB_URI_LOCAL = environmentVariables.DB_URI
} catch (ex) {
  logger.log('Environment variables local file not found')
}

/**
 * To use a local database
 */
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

mongoose
  .connect(
    DB_URI, {
      useMongoClient: true
    }
  )
  .then(() => {
    logger.log(`Succesfully Connected to the Mongo database at URI: ${DB_URI}`)
    console.log(logger.log(`Succesfully Connected to the Mongo database at URI: ${DB_URI}`))
  })
  .catch(() => {
    logger.log(`Error Connecting to the Mongo database at URI: ${DB_URI}`)
  })

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

//  view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(favicon(path.join(__dirname, 'public', 'favicon.png')))

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false
  })
)
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', api)
app.use(express.static(path.join(__dirname, '../dist/sprint')))

app.get('/callback', function (req, res, next) {
  console.log('ROUTING: GET: /callback')
  res.sendFile(path.join(__dirname, '../dist/sprint/index.html'))
})

//  catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

//  error handler
app.use(function (err, req, res, next) {
  //  set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = err
  //  render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app

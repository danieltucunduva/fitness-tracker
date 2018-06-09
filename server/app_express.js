var express = require('express')
var path = require('path')
// var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var api = require('./routes/api.route')

var bluebird = require('bluebird')

var app = express()

var mongoose = require('mongoose')
mongoose.Promise = bluebird

var DB_URI_LOCAL
try {
  const environmentVariables = require('./.environment_variables')
  DB_URI_LOCAL = environmentVariables.DB_URI
} catch (ex) {
  console.log('Environment variables local file not found')
}

const ENV_DB_URI = process.env.MONGODB_URI

if (!ENV_DB_URI && !DB_URI_LOCAL) {
  throw new Error('Database URI is missing, local and environment options are both undefined')
}

const DB_URI = ENV_DB_URI || DB_URI_LOCAL

console.log('ENV_DB_URI: ' + ENV_DB_URI)
console.log('DB_URI:     ' + DB_URI)

mongoose.connect(DB_URI, { useMongoClient: true })
  .then(() => { console.log(`Succesfully Connected to the Mongodb Database at URI: ${DB_URI}`) })
  .catch(() => { console.log(`Error Connecting to the Mongodb Database at URI: ${DB_URI}`) })

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api', api)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app

// mongodb://heroku_ffrx76p6:7851i9mg0o6l66uv8kc7at5v1i@ds153890.mlab.com:53890/heroku_ffrx76p6

// mongodb://heroku_ffrx76p6:7851i9mg0o6l66uv8kc7at5v1i@ds153890.mlab.com:53890/heroku_ffrx76p6

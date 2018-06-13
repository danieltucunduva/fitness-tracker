var express = require('express')
var path = require('path')
// var favicon = require('serve-favicon')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')

var api = require('./routes/api.route')

var bluebird = require('bluebird')

var app = express()

var mongoose = require('mongoose')
mongoose.Promise = bluebird
//log management
var graylog2 = require("graylog2");
var logger = new graylog2.graylog({
  servers: [
      { 'host': '127.0.0.1', port: 12201 },
  ],
});
//http logs
var graylog = require('graylog-loging');
var graylog = require('graylog-loging');
graylog.init({
  graylogPort: 12201,
  graylogHostname: '127.0.0.1'
});
var DB_URI_LOCAL
try {
  const environmentVariables = require('./.environment_variables')
  DB_URI_LOCAL = environmentVariables.DB_URI
} catch (ex) {
  logger.log('Environment variables local file not found')
}

const ENV_DB_URI = process.env.MONGODB_URI

if (!ENV_DB_URI && !DB_URI_LOCAL) {
  throw new Error('Database URI is missing, local and environment options are both undefined')
}

const DB_URI = ENV_DB_URI || DB_URI_LOCAL

logger.log('ENV_DB_URI: ' + ENV_DB_URI)
logger.log('DB_URI:     ' + DB_URI)

mongoose
  .connect(DB_URI, {
    useMongoClient: true
  })
  .then(() => {
    logger.log(`Succesfully Connected to the Mongo database at URI: ${DB_URI}`)
  })
  .catch(() => {
    logger.log(`Error Connecting to the Mongo database at URI: ${DB_URI}`)
  })

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

// view engine setup
// app.set('views', path.join(__dirname, 'views'))
// app.set('view engine', 'ejs')

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(graylog.logResponse);
app.use(graylog.logRequest);
app.use(graylog.handleErrors)

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))
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

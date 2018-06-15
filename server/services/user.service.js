const PastSprintModel = require('../models/past-sprint.model')

let USE_CONSOLE_FOR_LOGGING
try {
  const environmentVariables = require('../.environment_variables')
  USE_CONSOLE_FOR_LOGGING = environmentVariables.USE_CONSOLE_FOR_LOGGING
} catch (ex) {
  console.log('Environment variables local file not found')
}

const ENV_USE_CONSOLE_FOR_LOGGING = process.env.USE_CONSOLE_FOR_LOGGING

let logger
if (USE_CONSOLE_FOR_LOGGING || ENV_USE_CONSOLE_FOR_LOGGING === 'true') {
  logger = console
} else {
  const graylog2 = require('graylog2')
  const Graylog2 = graylog2.graylog
  logger = new Graylog2({
    servers: [{
      host: '127.0.0.1',
      port: 12201
    }]
  })
}

exports.deleteData = async function (userId) {
  try {
    const deleted = await PastSprintModel.deleteMany({
      user: userId
    }, err => {
      if (err) {
        logger.log('Delete data: service error')
        logger.log(err)
      }
    })
    logger.log('Delete data: ' + deleted.result.n + ' past sprints deleted for user ' + userId + ' ')
    return deleted.result.n
  } catch (e) {
    logger.log('Delete data: service exception')
    logger.log(e)
  }
}

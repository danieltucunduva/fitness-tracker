const SprintTemplate = require('../models/sprint-template.model')

let USE_CONSOLE_FOR_LOGGING
try {
  const environmentVariables = require('../.environment_variables')
  USE_CONSOLE_FOR_LOGGING = environmentVariables.USE_CONSOLE_FOR_LOGGING
} catch (ex) {
  console.log('Environment variables local file not found')
}

let logger
if (USE_CONSOLE_FOR_LOGGING) {
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

exports.getSprintTemplates = async function (query, page, limit) {
  const options = {
    page,
    limit
  }
  try {
    const SprintTemplates = await SprintTemplate.paginate(query, options)
    return SprintTemplates
  } catch (e) {
    logger.log('Get sprint templates: service exception')
    logger.log(e)
  }
}

exports.getOneSprintTemplate = async function (SprintTemplateId) {
  try {
    const SprintTemplateFound = await SprintTemplate.findById(SprintTemplateId)
    if (!SprintTemplateFound) {
      return false
    }
    return SprintTemplateFound
  } catch (e) {
    logger.log('Get one sprint template: service exception')
    logger.log(e)
  }
}

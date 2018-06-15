const PastSprintModel = require('../models/past-sprint.model')

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

exports.getPastSprints = async function (query) {
  const options = {
    page: 1,
    limit: 10000
  }
  try {
    const pastSprintsFound = await PastSprintModel.paginate(query, options)
    return pastSprintsFound
  } catch (e) {
    logger.log('Get past sprints: service exception')
    logger.log(e)
  }
}

exports.createPastSprint = async function (pastSprint) {
  const newPastSprint = new PastSprintModel({
    name: pastSprint.name,
    duration: pastSprint.duration,
    status: pastSprint.status,
    progress: pastSprint.progress,
    description: pastSprint.description,
    notify: pastSprint.notify,
    user: pastSprint.user,
    createdAt: new Date(),
    startedAt: pastSprint.startedAt,
    finishedAt: pastSprint.finishedAt
  })
  try {
    const savedPastSprint = await newPastSprint.save()
    return savedPastSprint
  } catch (e) {
    logger.log('Create past sprint: service exception')
    logger.log(e)
  }
}

// exports.updateSprint = async function (sprint) {
//   const sprintId = sprint._id
//   let storedSprint = null
//   try {
//     storedSprint = await PastSprintModel.findById(sprintId)
//     if (!storedSprint) {
//       return false
//     }
//     storedSprint.title = sprint.title
//     storedSprint.description = sprint.description
//     storedSprint.status = sprint.status
//   } catch (e) {
//   }
//   try {
//     const updatedSprint = await storedSprint.save()
//     return updatedSprint
//   } catch (e) {
//   }
// }

// exports.deleteSprint = async function (sprintId) {
//   let deleted = null
//   try {
//     deleted = await PastSprintModel.remove({
//       _id: sprintId
//     })
//   } catch (e) {
//   }
//   if (deleted.result.n === 0) {
//     throw Error('Delete sprint: sprint could not be deleted')
//   }
//   return deleted
// }

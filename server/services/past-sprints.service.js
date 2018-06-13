var PastSprintModel = require('../models/past-sprint.model')

// const _this = this
var graylog2 = require("graylog2");
var logger = new graylog2.graylog({
  servers: [
      { 'host': '127.0.0.1', port: 12201 },
  ],
});



exports.getPastSprints = async function (query) {

  var options = {
    page: 1,
    limit: 10000
  }
  try {
    var pastSprintsFound = await PastSprintModel.paginate(query, options)
    return pastSprintsFound
  } catch (e) {
    throw Error('Error while Paginating Todos')
  }
}

exports.createPastSprint = async function (pastSprint) {
  var newPastSprint = new PastSprintModel({
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
    var savedPastSprint = await newPastSprint.save()
    return savedPastSprint
  } catch (e) {
    throw Error('Create past sprint: service error')
  }
}

exports.updateSprint = async function (todo) {
  var id = todo.id

  try {
    var oldTodo = await PastSprintModel.findById(id)
  } catch (e) {
    throw Error('Error occured while Finding the Todo')
  }

  if (!oldTodo) {
    return false
  }

  logger.log(oldTodo)

  oldTodo.title = todo.title
  oldTodo.description = todo.description
  oldTodo.status = todo.status

  logger.log(oldTodo)

  try {
    var savedTodo = await oldTodo.save()
    return savedTodo
  } catch (e) {
    throw Error('And Error occured while updating the Todo')
  }
}

exports.deleteTodo = async function (id) {
  try {
    var deleted = await PastSprintModel.remove({
      _id: id
    })
    if (deleted.result.n === 0) {
      throw Error('Todo Could not be deleted')
    }
    return deleted
  } catch (e) {
    throw Error('Error Occured while Deleting the Todo')
  }
}

var pastSprintModel = require('../models/past-sprint.model')

_this = this


exports.getPastSprints = async function (query, page, limit) {
  var options = {
    page,
    limit
  }
  try {
    var pastSprintsFound = await pastSprintModel.paginate(query, options);
    console.log(pastSprintsFound);
    return pastSprintsFound;
  } catch (e) {
    throw Error('Error while Paginating Todos')
  }
}

exports.createPastSprint = async function (pastSprint) {

  console.log('---///---');
  console.log(pastSprint);
  console.log('---///---');

  var newPastSprint = new pastSprintModel({
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
  });


  console.log('---///---');
  console.log(newPastSprint);
  console.log('---///---');

  try {
    var savedPastSprint = await newPastSprint.save()
    return savedPastSprint;
  } catch (e) {
    throw Error("Create past sprint: service error")
  }
}

exports.updateSprint = async function (todo) {
  var id = todo.id

  try {
    var oldTodo = await pastSprintModel.findById(id);
  } catch (e) {
    throw Error("Error occured while Finding the Todo")
  }

  if (!oldTodo) {
    return false;
  }

  console.log(oldTodo)

  oldTodo.title = todo.title
  oldTodo.description = todo.description
  oldTodo.status = todo.status


  console.log(oldTodo)

  try {
    var savedTodo = await oldTodo.save()
    return savedTodo;
  } catch (e) {
    throw Error("And Error occured while updating the Todo");
  }
}

exports.deleteTodo = async function (id) {

  try {
    var deleted = await pastSprintModel.remove({
      _id: id
    })
    if (deleted.result.n === 0) {
      throw Error("Todo Could not be deleted")
    }
    return deleted
  } catch (e) {
    throw Error("Error Occured while Deleting the Todo")
  }
}

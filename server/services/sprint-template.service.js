var SprintTemplate = require("../models/sprint-template.model");

exports.getSprintTemplates = async function(query, page, limit) {
  var options = {
    page,
    limit
  };
  try {
    var SprintTemplates = await SprintTemplate.paginate(query, options);
    return SprintTemplates;
  } catch (e) {
    throw Error("Sprint template: service error");
  }
};

exports.getOneSprintTemplate = async function(SprintTemplateId) {
  try {
    var SprintTemplateFound = await SprintTemplate.findById(SprintTemplateId);
  } catch (e) {
    throw Error("Sprint template: service error");
  }

  if (!SprintTemplateFound) {
    return false;
  }
  return SprintTemplateFound;
};

exports.createSprint = async function(todo) {
  var newTodo = new SprintTemplate({
    title: todo.title,
    description: todo.description,
    date: new Date(),
    status: todo.status
  });

  try {
    var savedTodo = await newTodo.save();
    return savedTodo;
  } catch (e) {
    throw Error("Error while Creating Todo");
  }
};

exports.updateSprint = async function(todo) {
  var id = todo.id;

  try {
    var oldTodo = await SprintTemplate.findById(id);
  } catch (e) {
    throw Error("Error occured while Finding the Todo");
  }

  if (!oldTodo) {
    return false;
  }

  logger.log(oldTodo);

  oldTodo.title = todo.title;
  oldTodo.description = todo.description;
  oldTodo.status = todo.status;

  console.log(oldTodo);

  try {
    var savedTodo = await oldTodo.save();
    return savedTodo;
  } catch (e) {
    throw Error("And Error occured while updating the Todo");
  }
};

exports.deleteTodo = async function(id) {
  try {
    var deleted = await SprintTemplate.remove({
      _id: id
    });
    if (deleted.result.n === 0) {
      throw Error("Todo Could not be deleted");
    }
    return deleted;
  } catch (e) {
    throw Error("Error Occured while Deleting the Todo");
  }
};

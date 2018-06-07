var userModel = require('../models/user.model')

_this = this


exports.getUsers = async function (query, page, limit) {
  var options = {
    page,
    limit
  }
  try {
    var users = await userModel.paginate(query, options)
    return users;
  } catch (e) {
    throw Error('Error while Paginating Todos')
  }
}

exports.createUser = async function (user) {

  var newUser = new userModel({
    username: user.username,
    password: user.password,
    createdAt: new Date(),
    sharedSprints: []
  })

  try {
    var savedUser = await newUser.save()
    console.log(savedUser);
    return savedUser;
  } catch (e) {
    throw Error("Error creating user")
  }
}

exports.loginUser = async function (user) {
  try {
    var user = await userModel.findOne({
      username: user.username,
      password: user.password
    });
  } catch (e) {
    throw Error("Login: user not found")
  }

  if (user) {
    return user;
  } else {
    return false;
  }
}

exports.updateUser = async function (user) {
  var id = user.id

  try {
    var oldTodo = await userModel.findById(id);
  } catch (e) {
    throw Error("Error occured while Finding the Todo")
  }

  if (!oldTodo) {
    return false;
  }

  console.log(oldTodo)

  oldTodo.title = user.title
  oldTodo.description = user.description
  oldTodo.status = user.status


  console.log(oldTodo)

  try {
    var savedTodo = await oldTodo.save()
    return savedTodo;
  } catch (e) {
    throw Error("And Error occured while updating the Todo");
  }
}

exports.deleteUser = async function (id) {

  try {
    var deleted = await userModel.remove({
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

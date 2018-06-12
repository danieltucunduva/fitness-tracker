var UserModel = require('../models/user.model')
var pastSprintModel = require('../models/past-sprint.model')

exports.getUsers = async function (query, page, limit) {
  var options = {
    page,
    limit
  }
  try {
    var users = await UserModel.paginate(query, options)
    return users
  } catch (e) {
    throw Error('Error while Paginating Todos')
  }
}

exports.usernameAvailable = async function (username) {
  try {
    var existingUser = await UserModel.findOne({
      username: username
    })
    if (existingUser) {
      return false
    } else {
      return true
    }
  } catch (e) {
    throw Error('User service: error at usernameAvailable')
  }
}

exports.createUser = async function (user) {
  var newUser = new UserModel({
    username: user.username,
    password: user.password,
    createdAt: new Date(),
    sharedSprints: []
  })

  try {
    var savedUser = await newUser.save()
    console.log(savedUser)
    return savedUser
  } catch (e) {
    throw Error('Error creating user')
  }
}

exports.loginUser = async function (user) {
  try {
    var loginUser = await UserModel.findOne({
      username: user.username,
      password: user.password
    })
    if (loginUser) {
      return loginUser
    } else {
      return false
    }
  } catch (e) {
    throw Error('Login: user not found')
  }
}

exports.userId = async function (user) {
  try {
    var userFound = await UserModel.findOne({
      username: user.username,
      password: user.password
    })
    if (userFound) {
      return userFound._id
    } else {
      return false
    }
  } catch (e) {
    throw Error('User id: user not found')
  }
}

exports.updateUser = async function (user) {
  var id = user.id

  try {
    var oldTodo = await UserModel.findById(id)
  } catch (e) {
    throw Error('Error occured while Finding the Todo')
  }

  if (!oldTodo) {
    return false
  }

  console.log(oldTodo)

  oldTodo.title = user.title
  oldTodo.description = user.description
  oldTodo.status = user.status

  console.log(oldTodo)

  try {
    var savedTodo = await oldTodo.save()
    return savedTodo
  } catch (e) {
    throw Error('And Error occured while updating the Todo')
  }
}

exports.deleteData = async function (userId) {
  try {
    await pastSprintModel.deleteMany({
      user: userId
    }, err => {
      console.log(err)
      throw Error('Delete data: past sprints could not be deleted')
    })
    return true
  } catch (e) {
    throw Error('Delete data: failure')
  }
}

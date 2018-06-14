var UserModel = require('../models/user.model')
var pastSprintModel = require('../models/past-sprint.model')

//log management
var graylog2 = require("graylog2");
var logger = new graylog2.graylog({
  servers: [
      { 'host': '127.0.0.1', port: 12201 },
  ],
});
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
    logger.log(savedUser)
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

  logger.log(oldTodo)

  oldTodo.title = user.title
  oldTodo.description = user.description
  oldTodo.status = user.status

  logger.log(oldTodo)

  try {
    var savedTodo = await oldTodo.save()
    return savedTodo
  } catch (e) {
    throw Error('And Error occured while updating the Todo')
  }
}

exports.deleteUser = async function (username) {
  try {
    var user = await UserModel.findOne({
      username: username
    })
    if (!user) {
      throw Error('Delete user: user not found')
    }
    const userId = user._id
    var deleted = await UserModel.deleteOne({
      _id: userId
    })
    if (deleted.result.n === 0) {
      throw Error('Delete user: user could not be deleted')
    } else {
      const pastSprintsDeleted = await pastSprintModel.deleteMany({
        user: userId
      }, err => {
        logger.log(err)
      })
      logger.log(pastSprintsDeleted.result)
      return deleted
    }
  } catch (e) {
    throw Error('Delete user: failure')
  }
}

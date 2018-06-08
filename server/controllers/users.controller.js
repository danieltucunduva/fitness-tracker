var userService = require('../services/user.service')

_this = this


exports.getUsers = async function (req, res, next) {

  var page = req.query.page ? req.query.page : 1
  var limit = req.query.limit ? req.query.limit : 10;

  console.log(page, limit)

  try {
    var todos = await userService.getUsers({}, page, limit)
    return res.status(200).json({
      status: 200,
      data: todos,
      message: "Succesfully Todos Recieved"
    });
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    });
  }
}

exports.createUser = async function (req, res, next) {

  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      status: 400,
      message: "Create user: error"
    });
  }

  var newUser = {
    username: req.body.username,
    password: req.body.password
  }

  try {
    var usernameAvailable = await userService.usernameAvailable(newUser.username);
    if (!usernameAvailable) {
      return res.status(409).json({
        status: 409,
        message: "Username already exists"
      })
    }
    var createdUser = await userService.createUser(newUser);
    return res.status(201).json({
      status: 201,
      data: createdUser,
      message: "Create user: success"
    })
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: "Create user: error"
    })
  }
}

exports.loginUser = async function (req, res, next) {

  console.log(req.body)

  var user = {
    username: req.body.username,
    password: req.body.password
  }

  try {
    var userFound = await userService.loginUser(user);
    if (userFound) {
      return res.status(200).json({
        status: 200,
        data: userFound,
        message: "Login: success"
      });
    } else {
      return res.status(406).json({
        status: 406,
        message: "Login: invalid"
      });
    }
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    })
  }
}

exports.updateUser = async function (req, res, next) {

  if (!req.body._id) {
    return res.status(400).json({
      status: 400,
      message: "Id must be present"
    })
  }

  var id = req.body._id;

  console.log(req.body)

  var todo = {
    id,
    title: req.body.title ? req.body.title : null,
    description: req.body.description ? req.body.description : null,
    status: req.body.status ? req.body.status : null
  }

  try {
    var updatedTodo = await userService.updateUser(todo)
    return res.status(200).json({
      status: 200,
      data: updatedTodo,
      message: "Success: sprint updated"
    })
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    })
  }
}

exports.removeUser = async function (req, res, next) {

  var id = req.params.id;

  try {
    var deleted = await userService.deleteUser(id);
    return res.status(200).json({
      status: 200,
      data: true,
      message: "Success: user deleted"
    })
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    })
  }

}

var userService = require('../services/user.service')

exports.getUsers = async function (req, res, next) {
  var page = req.query.page ? req.query.page : 1
  var limit = req.query.limit ? req.query.limit : 10

  console.log(page, limit)

  try {
    var todos = await userService.getUsers({}, page, limit)
    return res.status(200).json({
      status: 200,
      data: todos,
      message: 'Succesfully Todos Recieved'
    })
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    })
  }
}

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags:
 *      - users
 *     parameters:
 *       - name: user
 *         description: User
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     description: Create a new user
 *     produces:
 *      - application/json
 *     responses:
 *       201:
 *         description: created
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: number
 *             data:
 *               $ref: '#/definitions/User'
 *             message:
 *               type: string
 *       400:
 *         description: bad request
 *       409:
 *         description: conflict
 */
exports.createUser = async function (req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({
      status: 400,
      message: 'Create user: error'
    })
  }

  var newUser = {
    username: req.body.username,
    password: req.body.password
  }

  try {
    var usernameAvailable = await userService.usernameAvailable(newUser.username)
    if (!usernameAvailable) {
      return res.status(409).json({
        status: 409,
        message: 'Username already exists'
      })
    }
    var createdUser = await userService.createUser(newUser)
    return res.status(201).json({
      status: 201,
      data: createdUser,
      message: 'Create user: success'
    })
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: 'Create user: error'
    })
  }
}

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags:
 *      - users
 *     parameters:
 *       - name: user
 *         description: User
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     description: Log in a user
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: ok
 *         schema:
 *           type: object
 *           properties:
 *             status:
 *               type: number
 *             data:
 *               $ref: '#/definitions/User'
 *             message:
 *               type: string
 *       400:
 *         description: bad request
 *       406:
 *         description: not acceptable
 */
exports.loginUser = async function (req, res, next) {
  console.log(req.body)

  var user = {
    username: req.body.username,
    password: req.body.password
  }

  try {
    var userFound = await userService.loginUser(user)
    if (userFound) {
      return res.status(200).json({
        status: 200,
        data: userFound,
        message: 'Login: success'
      })
    } else {
      return res.status(406).json({
        status: 406,
        message: 'Login: invalid'
      })
    }
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    })
  }
}

exports.userId = async function (req, res, next) {
  var user = {
    username: req.body.username,
    password: req.body.password
  }
  try {
    var userId = await userService.userId(user)
    if (userId) {
      return res.status(200).json({
        status: 200,
        data: userId,
        message: 'User id: success'
      })
    } else {
      return res.status(406).json({
        status: 406,
        message: 'User: invalid'
      })
    }
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    })
  }
}

exports.deleteUser = async function (req, res, next) {
  const userId = req.params.username
  try {
    const sprintsDeleted = await userService.deleteData(userId)
    return res.status(200).json({
      status: 200,
      data: sprintsDeleted,
      message: 'Success: data deleted'
    })
  } catch (e) {
    return res.status(400).json({
      status: 400,
      message: e.message
    })
  }
}

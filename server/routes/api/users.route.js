var express = require('express')

var router = express.Router()

var usersController = require('../../controllers/users.controller')

router.delete('/:username', usersController.deleteData)

module.exports = router

var express = require('express')

var router = express.Router()

var usersController = require('../../controllers/users.controller')

// router.get('/', usersController.getUsers);
router.post('/login', usersController.loginUser)
router.post('/', usersController.createUser)
// router.put('/', usersController.updateUser);
router.delete('/:id', usersController.removeUser)

module.exports = router

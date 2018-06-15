var express = require('express')
var router = express.Router()
var pastSprintsController = require('../../controllers/past-sprints.controller')

router.post('/', pastSprintsController.getPastSprints)
router.post('/new', pastSprintsController.createPastSprint)

module.exports = router

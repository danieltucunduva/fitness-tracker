var express = require('express')
var router = express.Router()

var pastSprints = require('./api/past-sprints.route')
var sprintTemplates = require('./api/sprint-templates.route')
var users = require('./api/users.route')

router.use('/past-sprints', pastSprints)
router.use('/sprint-templates', sprintTemplates)
router.use('/users', users)

module.exports = router

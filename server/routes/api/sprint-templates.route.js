var express = require('express')
var router = express.Router()
var sprintTemplatesController = require('../../controllers/sprint-templates.controller')

router.get('/', sprintTemplatesController.getSprintTemplates)
router.get('/:id', sprintTemplatesController.getOneSprintTemplateById)

module.exports = router

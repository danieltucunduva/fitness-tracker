var express = require('express');

var router = express.Router();

var sprintTemplatesController = require('../../controllers/sprint-templates.controller');

router.get('/', sprintTemplatesController.getSprints);
router.post('/', sprintTemplatesController.createSprint);
router.put('/', sprintTemplatesController.updateSprint);
router.delete('/:id', sprintTemplatesController.removeSprint);

module.exports = router;
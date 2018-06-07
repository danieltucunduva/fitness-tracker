var express = require('express');

var router = express.Router();

var pastSprintsController = require('../../controllers/past-sprints.controller');

router.get('/', pastSprintsController.getSprints);
router.post('/', pastSprintsController.createSprint);
router.put('/', pastSprintsController.updateSprint);
router.delete('/:id', pastSprintsController.removeSprint);

module.exports = router;
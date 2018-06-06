var express = require('express');

var router = express.Router();

var sprintsController = require('../../controllers/sprints.controller');

router.get('/', sprintsController.getSprints);
router.post('/', sprintsController.createSprint);
router.put('/', sprintsController.updateSprint);
router.delete('/:id', sprintsController.removeSprint);

module.exports = router;
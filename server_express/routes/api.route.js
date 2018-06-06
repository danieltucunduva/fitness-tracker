var express = require('express');

var router = express.Router();
var sprints = require('./api/sprints.route');


router.use('/sprints', sprints);


module.exports = router;
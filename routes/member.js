var express = require('express');
var router = express.Router();

var memberController = require('../controller/memberController');

//researchFields
router.get('/', memberController.memberFunc.memberMain);

module.exports = router;
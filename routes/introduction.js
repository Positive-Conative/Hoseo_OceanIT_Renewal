var express = require('express');
var router = express.Router();

var introductionController = require('../controller/introductionController');

//introduction
router.get('/', introductionController.introductionMainFunc.introductionMain);

module.exports = router;
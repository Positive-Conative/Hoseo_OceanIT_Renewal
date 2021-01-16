var express = require('express');
var router = express.Router();

var introductionController = require('../controller/introductionController');

//researchFields
router.get('/', introductionController.introductionMainFunc.introductionMain);

module.exports = router;
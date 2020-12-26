var express = require('express');
var router = express.Router();

var introductionMain = require('../controller/introduction/introductionMain');

//researchFields
router.get('/', introductionMain.introductionMainFunc.introductionMain);

module.exports = router;
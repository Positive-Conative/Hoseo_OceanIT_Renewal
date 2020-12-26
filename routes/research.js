var express = require('express');
var router = express.Router();

var researchFields = require('../controller/researchFields/researchFields');

//researchFields
router.get('/', researchFields.researchFunc.researchFields);

module.exports = router;
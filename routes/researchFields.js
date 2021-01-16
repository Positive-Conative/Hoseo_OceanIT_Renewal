var express = require('express');
var router = express.Router();

var researchFieldsController = require('../controller/researchFieldsController');

//researchFields
router.get('/fields', researchFieldsController.researchFunc.researchFields);

module.exports = router;
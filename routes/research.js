var express = require('express');
var router = express.Router();

//research fields
var researchFieldsController = require('../controller/researchFieldsController');
router.get('/fields', researchFieldsController.researchFunc.researchFields);
router.get('/fields/detail', researchFieldsController.researchFunc.researchFieldsDetail);

//----------------------------------------------------------------------------------//
//research results
var researchResultsController = require('../controller/researchResultsController');
router.get('/results', researchResultsController.researchResultsFunc.researchResults);

module.exports = router;
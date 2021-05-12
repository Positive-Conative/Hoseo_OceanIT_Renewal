'use strict';

var express = require('express');
var router = express.Router();
var androidController = require('../controller/androidController')

//research fields
var researchFieldsController = require('../controller/researchFieldsController');
router.get('/fields', researchFieldsController.researchFields);
router.get('/fields/detail', researchFieldsController.researchFieldsDetail);
//android
router.get('/android',androidController.Android);

//----------------------------------------------------------------------------------//
//research results
var researchResultsController = require('../controller/researchResultsController');
router.get('/results', researchResultsController.researchResults);
router.get('/results/detail', researchResultsController.researchResultsDetail);

module.exports = router;
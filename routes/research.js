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
router.get('/android/fields', researchFieldsController.androidResearchFieldsAll);

router.get('/fields/write', researchFieldsController.researcFieldhWrite)

//----------------------------------------------------------------------------------//
//research results
var researchResultsController = require('../controller/researchResultsController');
router.get('/results', researchResultsController.researchResults);
router.get('/results/detail', researchResultsController.researchResultsDetail);
router.get('/android/results', researchResultsController.androidResearchResultsAll);

router.get('/results', researchResultsController.researcResultWrite);

module.exports = router;
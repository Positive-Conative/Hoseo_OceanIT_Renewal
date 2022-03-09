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
router.get('/fields/write', researchFieldsController.researchFieldhWrite);

//----------------------------------------------------------------------------------//
//research results
var researchResultsController = require('../controller/researchResultsController');

router.get('/results/patent', researchResultsController.researchResultsPatent);
router.get('/results/patent/detail', researchResultsController.researchResultsPatentDetail);

router.get('/results/treatise', researchResultsController.researchResultsTreatise);
router.get('/results/treatise/detail', researchResultsController.researchResultsTreatiseDetail);

router.get('/results/announcement', researchResultsController.researchResultsAnnouncement);
router.get('/results/announcement/detail', researchResultsController.researchResultsAnnouncementDetail);

// router.get('/results/detail', researchResultsController.researchResultsDetail);
router.get('/android/results', researchResultsController.androidResearchResultsAll);

router.get('/results/write', researchResultsController.researcResultWrite);

//----------------------------------------------------------------------------------//
//research POST
router.post('/fields/write', researchFieldsController.researchFieldhWriteP);
router.post('/results/write', researchResultsController.researcResultWriteP);

//----------------------------------------------------------------------------------//
//research DELETE

router.post('/fields/delete', researchFieldsController.researchFieldhDelete)
router.post('/results/delete',researchResultsController.researchResultDelete)

module.exports = router;
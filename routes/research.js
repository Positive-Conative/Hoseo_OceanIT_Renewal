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
//research results Patent
var researchResultsController = require('../controller/researchResultsController');
var resultsPatentController = require('../controller/results/resultsPatentController')

router.get('/results/patent', resultsPatentController.researchResultsPatent);
router.get('/results/patent/write', resultsPatentController.researchResultsPatentWrite)
router.get('/results/patent/detail', resultsPatentController.researchResultsPatentDetail);
router.get('/results/patent/update', resultsPatentController.researchResultsPatentUpdate);
router.get('/results/patent/delete', resultsPatentController.researchResultsPatentDelete);
// router.post('/results/patent/write', resultsPatentController.researchResultsPatentWriteP)

//----------------------------------------------------------------------------------//
//research results Treatise
var resultsTreatiseController = require('../controller/results/resultsTreatiseController ')

router.get('/results/treatise', resultsTreatiseController.researchResultsTreatise);
router.get('/results/treatise/write', resultsTreatiseController.researchResultsTreatiseWrite);
router.get('/results/treatise/detail', resultsTreatiseController.researchResultsTreatiseDetail);
router.get('/results/treatise/update', resultsTreatiseController.researchResultsTreatiseUpdate)
router.get('/results/treatise/delete', resultsTreatiseController.researchResultsTreatiseDelete)
// router.post('/results/treatise/write', resultsTreatiseController.researchResultsTreatiseWriteP);

//----------------------------------------------------------------------------------//
//research results Treatise
var resultsAnnouncementController = require('../controller/results/resultsAnnouncementController')

router.get('/results/announcement', resultsAnnouncementController.researchResultsAnnouncement);
router.get('/results/announcement/write', resultsAnnouncementController.researchResultsAnnouncementWrite)
router.get('/results/announcement/detail', resultsAnnouncementController.researchResultsAnnouncementDetail);
router.get('/results/announcement/update', resultsAnnouncementController.researchResultsAnnouncementUpdate)
router.get('/results/announcement/delete', resultsAnnouncementController.researchResultsAnnouncementDelete)
// router.post('/results/announcement/write', resultsAnnouncementController.researchResultsAnnouncementWriteP)

//----------------------------------------------------------------------------------//
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
// router.post('/results/delete',researchResultsController.researchResultDelete)

module.exports = router;
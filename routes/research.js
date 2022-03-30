'use strict';

var express             = require('express');
var router              = express.Router();
var AppCtrl             = require('../controller/androidController')
var ResultCtrl          = require('../controller/researchResultsController');
var FieldCtrl           = require('../controller/researchFieldsController');
var PatentCtrl          = require('../controller/research/resultsPatentController')
var TreatiseCtrl        = require('../controller/research/resultsTreatiseController ')
var AnnouncementCtrl    = require('../controller/research/resultsAnnouncementController')

//WEB
//research fields
//----------------------------------------------------------------------------------//

router.get('/fields', FieldCtrl.researchFields);
router.get('/fields/detail', FieldCtrl.researchFieldsDetail);

//App
//research fields
//----------------------------------------------------------------------------------//

router.get('/android',AppCtrl.Android);
router.get('/android/fields', FieldCtrl.androidResearchFieldsAll);
router.get('/fields/write', FieldCtrl.researchFieldhWrite);

//----------------------------------------------------------------------------------//

//research results Patent
router.get('/results/patent', PatentCtrl.researchResultsPatent);
router.get('/results/patent/write', PatentCtrl.researchResultsPatentWrite)
router.get('/results/patent/detail', PatentCtrl.researchResultsPatentDetail);
router.get('/results/patent/delete', PatentCtrl.researchResultsPatentDelete);
router.get('/results/patent/modify', PatentCtrl.researchResultsPatentModify)
router.post('/results/patent/write', PatentCtrl.researchResultsPatentWriteP);
router.post('/results/patent/modify', PatentCtrl.researchResultsPatentModifyP);


//----------------------------------------------------------------------------------//

//research results Treatise
router.get('/results/treatise', TreatiseCtrl.researchResultsTreatise);
router.get('/results/treatise/write', TreatiseCtrl.researchResultsTreatiseWrite);
router.get('/results/treatise/detail', TreatiseCtrl.researchResultsTreatiseDetail);
router.get('/results/treatise/modify', TreatiseCtrl.researchResultsTreatiseModify)
router.get('/results/treatise/delete', TreatiseCtrl.researchResultsTreatiseDelete)
router.post('/results/treatise/write', TreatiseCtrl.researchResultsTreatiseWriteP);
router.post('/results/treatise/modify', TreatiseCtrl.researchResultsTreatiseModifyP)

//----------------------------------------------------------------------------------//

//research results Announcement
router.get('/results/announcement', AnnouncementCtrl.researchResultsAnnouncement);
router.get('/results/announcement/write', AnnouncementCtrl.researchResultsAnnouncementWrite)
router.get('/results/announcement/detail', AnnouncementCtrl.researchResultsAnnouncementDetail);
router.get('/results/announcement/modify', AnnouncementCtrl.researchResultsAnnouncementModify)
router.get('/results/announcement/delete', AnnouncementCtrl.researchResultsAnnouncementDelete)
router.post('/results/announcement/write', AnnouncementCtrl.researchResultsAnnouncementWriteP)
router.post('/results/announcement/modify', AnnouncementCtrl.researchResultsAnnouncementModifyP)

//----------------------------------------------------------------------------------//

// router.get('/results/detail', ResultCtrl.researchResultsDetail);
router.get('/android/results', ResultCtrl.androidResearchResultsAll);

router.get('/results/write', ResultCtrl.researcResultWrite);

//----------------------------------------------------------------------------------//
//research POST
router.post('/fields/write', FieldCtrl.researchFieldhWriteP);
router.post('/results/write', ResultCtrl.researcResultWriteP);

//----------------------------------------------------------------------------------//
//research DELETE

router.post('/fields/delete', FieldCtrl.researchFieldhDelete)
// router.post('/results/delete',ResultCtrl.researchResultDelete)

module.exports = router;
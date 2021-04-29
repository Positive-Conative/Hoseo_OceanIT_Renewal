'use strict';

const { query } = require('express');
var express = require('express');
const db = require('../config/kyjdb');
var router = express.Router();

//research fields
var researchFieldsController = require('../controller/researchFieldsController');
router.get('/fields', researchFieldsController.researchFields);
router.get('/fields/detail', researchFieldsController.researchFieldsDetail);


router.get('/android/fields', researchFieldsController.androidResearchFieldsAll);

//----------------------------------------------------------------------------------//
//research results
var researchResultsController = require('../controller/researchResultsController');
router.get('/results', researchResultsController.researchResults);

router.get('/android/results', researchResultsController.androidResearchResultsAll);


//--------------------------------------------------------------------
// router.get('/android/results', function(req, res){
//     var querys = req.query.classify
//     db.query(`SELECT * FROM Research_Results where classify_ko = '${querys}'`, function (error, result) {
//         if (error) {
//             throw error;
//         }   
//         else{
//             res.send(result)
//         }
          
//       });
// })
// router.get('/android/fields', function(req, res){
//     var querys = req.query.classify
//     var sql = ""

//     if(querys == "all")
//         sql = `SELECT * from Research_Fields`
//     else if(querys == "progress")
//         sql = `SELECT * FROM Research_Fields WHERE date_end > NOW()`
//     else
//         sql = `SELECT * FROM Research_Fields WHERE date_end < NOW()`

//     db.query(sql, function(error, result){
//         if(error){
//             throw error;
//         }   
//         else{
//             res.send(result)
//         }
//     })
// })

module.exports = router;
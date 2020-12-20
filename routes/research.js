var express = require('express');
var router = express.Router();
var researchDAO = require('../model/bus/researchDAO');

//router.get('/stop', researchDAO.getDBFunction.selectAll);
// router.get('/stop', function(req, res, next) {
//   res.fdsa = 1;
//   console.log("fdsa",req.db_result);
//   res.send(req.db_result);
// });

// router.get('/stop', researchDAO.getDBFunction.selectAll, function(req, res, next) {
//   res.fdsa = 1;
//   console.log("fdsa",req.db_result);
//   res.send(req.db_result);
// });

router.get('/stop', researchDAO.getDBFunction.selectAll);
router.get('/stop', function(req, res, next) {
  res.fdsa = 1;
  console.log("fdsa",req.db_result);
  res.send(req.db_result);
});
module.exports = router;
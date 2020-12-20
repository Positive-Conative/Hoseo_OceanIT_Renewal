var express = require('express');
var router = express.Router();
var testDAO = require('../model/testDAO');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/qqq', function(req, res, next) {
  testDAO.getDBFunction.selectAll(req, res, next, "2");
})
router.get('/qqq', function(req, res, next) {
  console.log(req.db_result);
  res.send(req.db_result);
});

module.exports = router;
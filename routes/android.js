var express = require('express');
var router = express.Router();
var db = require('../config/kyjDB');
var androidController = require('../controller/androidController')

router.get('/',androidController.Android);

module.exports = router;

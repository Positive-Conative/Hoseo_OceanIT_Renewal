'use strict';

var express = require('express');
var router = express.Router();
var indexController = require('../controller/indexController');

router.get('/', indexController.indexMain );

router.get('/app', indexController.indexMainApp);

// var tc = require('../controller/testController');
// router.get('/test', tc.test);
module.exports = router;

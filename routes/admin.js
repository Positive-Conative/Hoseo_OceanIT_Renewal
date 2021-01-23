'use strict';

var express = require('express');
var router = express.Router();

var adminController = require('../controller/adminController');

//admin
router.get('/', adminController.adminFunc.adminMain);

module.exports = router;
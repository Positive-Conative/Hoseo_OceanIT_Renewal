'use strict';

var express = require('express');
var router = express.Router();

var adminController = require('../controller/adminController');

//admin
router.get('/', adminController.adminMain);

// router.get('/list',adminController.adminList)

module.exports = router;
'use strict';

var express = require('express');
var router = express.Router();

var galleryController = require('../controller/galleryController');

//gallery
router.get('/', galleryController.galleryMain);

//gallery detail
router.get('/detail', galleryController.galleryDetail);

module.exports = router;
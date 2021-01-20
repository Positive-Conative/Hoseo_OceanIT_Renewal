var express = require('express');
var router = express.Router();

var galleryController = require('../controller/galleryController');

//gallery
router.get('/', galleryController.galleryFunc.galleryMain);

//gallery detail
router.get('/detail', galleryController.galleryFunc.galleryDetail);

module.exports = router;
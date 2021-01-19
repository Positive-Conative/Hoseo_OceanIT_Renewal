var express = require('express');
var router = express.Router();

var galleryController = require('../controller/galleryController');

//gallery
router.get('/', galleryController.galleryFunc.galleryMain);

module.exports = router;
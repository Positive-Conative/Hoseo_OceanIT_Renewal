'use strict';
var express = require('express');
var router = express.Router();

var boardController = require('../controller/boardController');

//공지사항 게시판
router.get('/notice', boardController.noticeMain);

//문의게시판(1:1)
router.get('/inquiry', boardController.inquiryMain);

// 자유게시판
router.get('/free', boardController.freeBoardMain);


module.exports = router;
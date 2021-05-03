'use strict';
var express = require('express');
var router = express.Router();
var boardController = require('../controller/boardController');
//git test
//공지사항 게시판
router.get('/notice', boardController.noticeMain);
router.get('/notice/noticeWrite', boardController.noticeWrite);
router.get('/notice/noticeDetail',boardController.noticeDetail);
router.post('/notice/noticeWrite', boardController.noticeWritePost);

//문의게시판(1:1)
router.get('/inquiry', boardController.inquiryMain);
router.get('/inquiry/inquiryWrite', boardController.inquiryWrite);
router.get('/inquiry/inquiryDetail',boardController.inquiryDetail);
router.post('/inquiry/inquiryWrite', boardController.inquiryWritePost);


// 자유게시판
router.get('/free', boardController.freeBoardMain);
router.get('/free/freeBoardWrite', boardController.freeBoardWrite);
router.get('/free/freeBoardDetail', boardController.freeBoardDetail);
router.post('/free/freeBoardWrite', boardController.freeBoardWritePost);



module.exports = router;

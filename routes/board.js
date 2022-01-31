'use strict';
var express = require('express');
var randomstring = require('randomstring');
var router = express.Router();
var boardController = require('../controller/boardController');
var multer = require('./multer')

//공지사항 게시판
router.get('/notice', boardController.noticeMain);
router.get('/notice/noticeWrite', boardController.noticeWrite);
router.get('/notice/noticeDetail', boardController.noticeDetail);
router.get('/notice/noticeModify', boardController.noticeModify);
router.post('/notice/noticeModify', boardController.noticeModifyPost);
router.post('/notice/noticeWrite', boardController.noticeWritePost);
router.post('/notice/delete', boardController.noticeDelete);

//문의게시판(1:1)
router.get('/inquiry', boardController.inquiryMain);
router.get('/inquiry/inquiryWrite', boardController.inquiryWrite);
router.get('/inquiry/inquiryDetail', boardController.inquiryDetail);
router.get('/inquiry/inquiryModify', boardController.inquiryModify);
router.post('/inquiry/inquiryModify', boardController.inquiryModifyPost);
router.post('/inquiry/inquiryWrite', multer.uploadBoard.single('newFile'), boardController.inquiryWritePost);
router.post('/inquiry/delete', boardController.inquiryDelete);
router.post('/inquiry/inquiryComment', boardController.inquiryComment);

// 자유게시판
router.get('/free', boardController.freeBoardMain);
router.get('/free/freeBoardWrite', boardController.freeBoardWrite);
router.get('/free/freeBoardDetail', boardController.freeBoardDetail);
router.get('/free/freeBoardModify', boardController.freeBoardModify);
router.post('/free/freeBoardModify', boardController.freeBoardModifyPost);
router.post('/free/freeBoardWrite', boardController.freeBoardWritePost);
router.post('/free/delete', boardController.freeBoardDelete);
router.post('/free/freeBoardComment', boardController.freeBoardComment);

module.exports = router;

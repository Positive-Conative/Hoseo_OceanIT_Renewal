'use strict';
var express = require('express');
var randomstring = require('randomstring');
var router = express.Router();
var boardController = require('../controller/boardController');
var multer = require('multer');
var storage = multer.diskStorage({ // 2
    destination(req, file, cb) {
        cb(null, 'public/images/board');
    },
    filename(req, file, cb) {
        var fileName = randomstring.generate(25);
        var mimeType;
        switch (file.mimetype) {
            case 'image/jpeg':
                mimeType = 'jpg';
                break;
            case 'image/png':
                mimeType = 'png';
                break;
            case 'image/gif':
                mimeType = 'gif';
                break;
            case 'image/bmp':
                mimeType = 'bmp';
                break;
            default:
                mimeType = 'jpg';
                break;
        }
        cb(null, fileName + '.' + mimeType);
    },
});
var upload = multer({ storage: storage });

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
router.post('/inquiry/inquiryWrite', upload.single('newFile'), boardController.inquiryWritePost);
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

module.exports = router;

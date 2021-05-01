'use strict';

var jwtmiddle = require('../middleware/jwt');
var boardDAO = require('../model/boardDAO');

function noticeMain(req, res, next) {
    let token = req.cookies.user;
    jwtmiddle.jwtCerti(token).then(
        (permission)=>{
            res.render('board/notice/noticeMain', { permission })
        }
    ).catch(err=>res.send("<script>alert('jwt err');</script>"));
}
function noticeWrite(req, res, next) {
    let token = req.cookies.user;
    jwtmiddle.jwtCerti(token).then(
        (permission)=>{
            res.render('board/notice/noticeWrite', { permission })
        }
    ).catch(err=>res.send("<script>alert('jwt err');</script>"));
}

function inquiryMain(req, res, next) {
    let token = req.cookies.user;
    jwtmiddle.jwtCerti(token).then(
        (permission)=>{
            res.render('board/inquiry/inquiryMain', { permission })
        }
    ).catch(err=>res.send("<script>alert('jwt err');</script>"));
}
function inquiryWrite(req, res, next) {
    let token = req.cookies.user;
    jwtmiddle.jwtCerti(token).then(
        (permission)=>{
            res.render('board/inquiry/inquiryWrite', { permission })
        }
    ).catch(err=>res.send("<script>alert('jwt err');</script>"));
}

function freeBoardMain(req, res, next) {
    let token = req.cookies.user;
    jwtmiddle.jwtCerti(token).then(
        (permission)=>{
            res.render('board/free/FreeBoardMain', { permission })
        }
    ).catch(err=>res.send("<script>alert('jwt err');</script>"));
}
function freeBoardWrite(req, res, next) {
    let token = req.cookies.user;
    jwtmiddle.jwtCerti(token).then(
        (permission)=>{
            res.render('board/free/FreeBoardWrite', { permission })
        }
    ).catch(err=>res.send("<script>alert('jwt err');</script>"));
}

module.exports = {
    noticeMain,
    noticeWrite,
    inquiryMain,
    inquiryWrite,
    freeBoardMain,
    freeBoardWrite
}
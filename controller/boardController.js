'use strict';

var dayjs = require('dayjs');
const db = require('../config/kyjdb');
var jwtmiddle = require('../middleware/jwt');
var boardDAO = require('../model/boardDAO');
var logger = require('../config/logger');

//notice
function noticeMain(req, res, next) {
    var queryPage = req.query.page;
    var parameters = {
        "page": queryPage
    }
    boardDAO.count_noticeBoard(parameters).then(
        (db_data) => {
            console.log("db_data : " + db_data)
            let token = req.cookies.user;
            jwtmiddle.jwtCerti(token).then(
                (permission) => {
                    res.render('board/notice/noticeMain', { db_data, dayjs, permission, parameters })
                }
            ).catch(err => res.send("<script>alert('jwt err');</script>"));
        }
    ).catch(err => res.send("<script>alert('" + err + "');location.href='/';</script>"))
}

function noticeWrite(req, res, next) {
    let token = req.cookies.user;
    jwtmiddle.jwtCerti(token).then(
        (permission) => {
            res.render('board/notice/noticeWrite', { permission })
        }
    ).catch(err => res.send("<script>alert('jwt err');</script>"));
}
function noticeDetail(req, res, next) {
    var queryNum = req.query.num;
    console.log("queryNum : " + queryNum)
    var parameters = {
        "qid": queryNum
    };
    var db_values = {};
    Promise.resolve(db_values)
        .then(
            (db_values) => {
                return boardDAO.count_noticeBoardDetail(parameters)
                    .then((detailData) => { db_values.detailData = detailData; })
            }
        )
        .then(
            () => {
                let token = req.cookies.user;
                jwtmiddle.jwtCerti(token).then(
                    (permission) => {
                        console.log("db_values : " + db_values.detailData)
                        console.log(db_values["detailData"]);
                        res.render('board/notice/noticeDetail', {
                            dayjs, permission,
                            detailData: db_values["detailData"]
                        });
                    }
                ).catch(err => res.send("<script>alert('jwt err');</script>"));
            }
        )
        .catch(err => res.send("<script>alert('jwt err');</script>"));
}
function noticeWritePost(req, res, next) {
    var content = req.body.content;
    var title = req.body.title;
    console.log("title : " + title);
    console.log("content : " + content);
    let token = req.cookies.user;
    jwtmiddle.jwtCerti(token).then(
        (permission) => {
            var date = new dayjs();
            var datetime = date.format('YYYY-MM-DD HH:mm:ss');
            var user_id = permission.user_id;
            var datas = { user_id: user_id, title: title, content: content, date: datetime };
            db.query('INSERT INTO Notice_Board SET ?', datas, function (error, row) {
                //console.log("db_data : " + row)
                if (error) {
                    logger.error(
                        "DB error [Notice_Board]" +
                        "\n \t" + error);
                    rejcet('DB ERR');
                }
                else { res.redirect("/board/notice?page=1"); }
            })
        }
    ).catch(err => res.send("<script>alert('jwt err');</script>"));
}

//inquiry
function inquiryMain(req, res, next) {
    var queryPage = req.query.page;
    var parameters = {
        "page": queryPage
    }
    boardDAO.count_questionBoard(parameters).then(
        (db_data) => {
            let token = req.cookies.user;
            jwtmiddle.jwtCerti(token).then(
                (permission) => {
                    res.render('board/inquiry/inquiryMain', { db_data, dayjs, permission,parameters })
                }
            ).catch(err => res.send("<script>alert('jwt err');</script>"));
        }
    ).catch(err => res.send("<script>alert('" + err + "');location.href='/';</script>"))
}
function inquiryWrite(req, res, next) {
    let token = req.cookies.user;
    jwtmiddle.jwtCerti(token).then(
        (permission) => {
            res.render('board/inquiry/inquiryWrite', { permission })
        }
    ).catch(err => res.send("<script>alert('jwt err');</script>"));
}

function inquiryDetail(req, res, next) {
    var queryNum = req.query.num;
    console.log("queryNum : " + queryNum)
    var parameters = {
        "qid": queryNum
    };
    var db_values = {};
    Promise.resolve(db_values)
        .then(
            (db_values) => {
                return boardDAO.count_questionBoardDetail(parameters)
                    .then((detailData) => { db_values.detailData = detailData; })
            }
        )
        .then(
            () => {
                let token = req.cookies.user;
                jwtmiddle.jwtCerti(token).then(
                    (permission) => {
                        console.log("db_values : " + db_values.detailData)
                        console.log(db_values["detailData"]);
                        res.render('board/inquiry/inquiryDetail', {
                            dayjs, permission,
                            detailData: db_values["detailData"]
                        });
                    }
                ).catch(err => res.send("<script>alert('jwt err');</script>"));
            }
        )
        .catch(err => res.send("<script>alert('jwt err');</script>"));
}
function inquiryWritePost(req, res, next) {
    var content = req.body.content;
    var title = req.body.title;
    console.log("title : " + title);
    console.log("content : " + content);
    let token = req.cookies.user;
    jwtmiddle.jwtCerti(token).then(
        (permission) => {
            var date = new dayjs();
            var datetime = date.format('YYYY-MM-DD HH:mm:ss');
            var user_id = permission.user_id;
            var datas = { user_id: user_id, title: title, content: content, date: datetime };
            db.query('INSERT INTO Inquiry_Board SET ?', datas, function (error, row) {
                //console.log("db_data : " + row)
                if (error) {
                    logger.error(
                        "DB error [Inquiry_Board]" +
                        "\n \t" + error);
                    rejcet('DB ERR');
                }
                else { res.redirect("/board/inquiry"); }
            })
        }
    ).catch(err => res.send("<script>alert('jwt err');</script>"));
}

//free
function freeBoardMain(req, res, next) {
    var queryPage = req.query.page;
    var parameters = {
        "page": queryPage
    }
    boardDAO.count_freeBoard(parameters).then(
        (db_data) => {
            let token = req.cookies.user;
            jwtmiddle.jwtCerti(token).then(
                (permission) => {
                    res.render('board/free/FreeBoardMain', { db_data, dayjs, permission,parameters })
                }
            ).catch(err => res.send("<script>alert('jwt err');</script>"));

        }
    ).catch(err => res.send("<script>alert('" + err + "');location.href='/';</script>"))
}
function freeBoardWrite(req, res, next) {
    let token = req.cookies.user;
    jwtmiddle.jwtCerti(token).then(
        (permission) => {
            res.render('board/free/FreeBoardWrite', { permission })
        }
    ).catch(err => res.send("<script>alert('jwt err');</script>"));
}

function freeBoardDetail(req, res, next) {
    var queryNum = req.query.num;
    console.log("queryNum : " + queryNum)
    var parameters = {
        "qid": queryNum
    };
    var db_values = {};
    Promise.resolve(db_values)
        .then(
            (db_values) => {
                return boardDAO.count_freeBoardDetail(parameters)
                    .then((detailData) => { db_values.detailData = detailData; })
            }
        )
        .then(
            () => {
                let token = req.cookies.user;
                jwtmiddle.jwtCerti(token).then(
                    (permission) => {
                        console.log("db_values : " + db_values.detailData)
                        console.log(db_values["detailData"]);
                        res.render('board/free/freeBoardDetail', {
                            dayjs, permission,
                            detailData: db_values["detailData"]
                        });
                    }
                ).catch(err => res.send("<script>alert('jwt err');</script>"));
            }
        )
        .catch(err => res.send("<script>alert('jwt err');</script>"));
}
function freeBoardWritePost(req, res, next) {
    var content = req.body.content;
    var title = req.body.title;
    console.log("title : " + title);
    console.log("content : " + content);
    let token = req.cookies.user;
    jwtmiddle.jwtCerti(token).then(
        (permission) => {
            var date = new dayjs();
            var datetime = date.format('YYYY-MM-DD HH:mm:ss');
            var user_id = permission.user_id;
            var datas = { user_id: user_id, title: title, content: content, date: datetime };
            db.query('INSERT INTO Free_Board SET ?', datas, function (error, row) {
                //console.log("db_data : " + row)
                if (error) {
                    logger.error(
                        "DB error [Free_Board]" +
                        "\n \t" + error);
                    rejcet('DB ERR');
                }
                else { res.redirect("/board/free"); }
            })
        }
    ).catch(err => res.send("<script>alert('jwt err');</script>"));
}

module.exports = {
    noticeMain,
    noticeWrite,
    noticeDetail,
    noticeWritePost,
    inquiryMain,
    inquiryWrite,
    inquiryDetail,
    inquiryWritePost,
    freeBoardMain,
    freeBoardWrite,
    freeBoardDetail,
    freeBoardWritePost

}
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
            let token = req.cookies.user;
            jwtmiddle.jwtCerti(token).then(
                (permission) => {
                    res.render('board/notice/noticeMain', { db_data, dayjs, permission, parameters })
                }
            ).catch(err => res.send("<script>alert('jwt err');history.back();</script>"));
        }
    ).catch(err => res.send("<script>alert('" + err + "');location.href='/';</script>"))
}
function noticeWrite(req, res, next) {
    let token = req.cookies.user;
    jwtmiddle.jwtCerti(token).then(
        (permission) => {
            if (permission.user_id != undefined) {
                res.render('board/notice/noticeWrite', { permission })
            }
            else {
                res.send("<script>alert('Inaccessible');history.back();</script>")
            }
        }
    ).catch(err => res.send("<script>alert('jwt err');history.back();</script>"));
}
function noticeDetail(req, res, next) {
    var queryNum = req.query.num;
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
                        res.render('board/notice/noticeDetail', {
                            dayjs, permission,
                            detailData: db_values["detailData"]
                        });
                    }
                ).catch(err => res.send("<script>alert('jwt err');history.back();</script>"));
            }
        )
        .catch(err => res.send("<script>alert('jwt err');history.back();</script>"));
}
function noticeModify(req, res, next) {
    var queryNum = req.query.num;
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
                        if (permission.user_id == db_values["detailData"][0].user_id) {
                            res.render('board/notice/noticeModify', {
                                dayjs, permission,
                                detailData: db_values["detailData"]
                            });
                        }
                        else {
                            res.send("<script>alert('You do not have permission');history.back();</script>");
                        }
                    }
                ).catch(err => res.send("<script>alert('jwt err');history.back();</script>"));
            }
        )
        .catch(err => res.send("<script>alert('jwt err');history.back();</script>"));
}
function noticeModifyPost(req, res, next) {
    var queryNum = req.query.num;
    console.log("queryNum : " + queryNum)
    var parameters = {
        "qid": queryNum
    };
    let token = req.cookies.user;
    if (req.body.title == "") res.send("<script>alert('제목을입력하세요.');history.back();</script>")
    else if (req.body.content == "") res.send("<script>alert('내용을입력하세요.');history.back();</script>")
    else {
        jwtmiddle.jwtCerti(token).then(
            (permission) => {
                console.log(req.body.title)
                console.log(req.body.content)
                var date = new dayjs();
                var datetime = date.format('YYYY-MM-DD HH:mm:ss');
                db.query(`UPDATE Notice_Board SET title=?, content=?,date=? where qid=${parameters.qid}`, [req.body.title, req.body.content, datetime], function (error, results) {
                    if (error) {
                        logger.error(
                            "DB error [Notice_Board]" +
                            "\n \t" + queryData +
                            "\n \t" + error);
                        rejcet('DB ERR');
                    }
                    else {
                        res.redirect('/board/notice?page=1')
                    }
                })
            }
        ).catch(err => res.send("<script>alert('jwt err');history.back();</script>"));
    }
}
function noticeWritePost(req, res, next) {
    var content = req.body.content;
    var title = req.body.title;
    console.log("title : " + title);
    console.log("content : " + content);
    let token = req.cookies.user;
    if (title == "") res.send("<script>alert('제목을입력하세요.');history.back();</script>")
    else if (content == "") res.send("<script>alert('내용을입력하세요.');history.back();</script>")
    else {
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
        ).catch(err => res.send("<script>alert('jwt err');history.back();</script>"));
    }
}
function noticeDelete(req, res, next) {
    var queryNum = req.query.num;
    console.log("queryNum : " + queryNum)
    var parameters = {
        "qid": queryNum
    };
    let token = req.cookies.user;
    jwtmiddle.jwtCerti(token).then(
        (permission) => {
            db.query(`DELETE FROM Notice_Board WHERE qid=${parameters.qid} and user_id=${permission.user_id}`, function (error, row) {
                if (error) {
                    logger.error(
                        "DB error [Notice_Board]" +
                        "\n \t" + error);
                    rejcet('DB ERR');
                }
                if (row.affectedRows == 0) {
                    res.send("<script>alert('You do not have permission');history.back();</script>");
                }
                else {
                    res.redirect("/board/notice?page=1")
                }
            })
        }
    ).catch(err => res.send("<script>alert('jwt err');history.back();</script>"));
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
                    res.render('board/inquiry/inquiryMain', { db_data, dayjs, permission, parameters })
                }
            ).catch(err => res.send("<script>alert('jwt err');history.back();</script>"));
        }
    ).catch(err => res.send("<script>alert('" + err + "');location.href='/';</script>"))
}
function inquiryWrite(req, res, next) {
    let token = req.cookies.user;
    jwtmiddle.jwtCerti(token).then(
        (permission) => {
            if (permission.user_id != undefined) {
                res.render('board/inquiry/inquiryWrite', { permission })
            }
            else {
                res.send("<script>alert('Inaccessible');history.back();</script>")
            }
        }
    ).catch(err => res.send("<script>alert('jwt err');history.back();</script>"));
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
                    .then(() => { return db_values })
                    .catch(err => res.send("<script>alert('" + err + "');history.back();</script>"))
            }
        )
        .then(
            (db_values) => {
                return boardDAO.count_questionBoardComment(parameters)
                    .then((commentData) => { db_values.commentData = commentData; })
                    .then(() => { return db_values })
                    .catch(err => res.send("<script>alert('" + err + "');history.back();</script>"))
            }
        )
        .then(
            () => {
                let token = req.cookies.user;
                jwtmiddle.jwtCerti(token).then(
                    (permission) => {
                        console.log("detailData : " + db_values["detailData"]);
                        console.log(db_values["commentData"]);
                        res.render('board/inquiry/inquiryDetail', {
                            dayjs, permission,
                            detailData: db_values["detailData"],
                            commentData: db_values["commentData"]
                        });
                    }
                ).catch(err => res.send("<script>alert('jwt err');history.back();</script>"));
            }
        )
        .catch(err => res.send("<script>alert('jwt err');history.back();</script>"));
}
function inquiryComment(req, res, next) {
    var queryNum = req.query.num;
    console.log("queryNum : " + queryNum)
    var parameters = {
        "qid": queryNum
    };
    var comment = req.body.comment;
    if (comment == "") res.send("<script>alert('댓글을 입력하세요.');history.back();</script>")
    else {
        let token = req.cookies.user;
        jwtmiddle.jwtCerti(token).then(
            (permission) => {
                var date = new dayjs();
                var datetime = date.format('YYYY-MM-DD HH:mm:ss');
                db.query(`INSERT inquiryComment SET qid=?, comment=?, date=?, user_id=?`, [parameters.qid, comment, datetime, permission.user_id], function (error, results) {
                    if (error) {
                        logger.error(
                            "DB error [inquiryComment]" +
                            "\n \t" + error);
                        rejcet('DB ERR');
                    }
                    else {
                        res.redirect(`/board/inquiry/inquiryDetail?num=${parameters.qid}`)
                    }
                })
            })
    }
}
function inquiryModify(req, res, next) {
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
                        console.log("C : " + db_values["detailData"][0].user_id)
                        if (permission.user_id == db_values["detailData"][0].user_id) {
                            res.render('board/inquiry/inquiryModify', {
                                dayjs, permission,
                                detailData: db_values["detailData"]
                            });
                        }
                        else {
                            res.send("<script>alert('You do not have permission');history.back();</script>");
                        }
                    }
                ).catch(err => res.send("<script>alert('jwt err');</script>"));
            }
        )
        .catch(err => res.send("<script>alert('jwt err');</script>"));
}
function inquiryModifyPost(req, res, next) {
    var queryNum = req.query.num;
    console.log("queryNum : " + queryNum)
    var parameters = {
        "qid": queryNum
    };
    let token = req.cookies.user;
    if (req.body.title == "") res.send("<script>alert('제목을입력하세요.');history.back();</script>")
    else if (req.body.content == "") res.send("<script>alert('내용을입력하세요.');history.back();</script>")
    else {
        jwtmiddle.jwtCerti(token).then(
            (permission) => {
                var date = new dayjs();
                var datetime = date.format('YYYY-MM-DD HH:mm:ss');
                db.query(`UPDATE Inquiry_Board SET title=?, content=?,date=? where qid=${parameters.qid}`, [req.body.title, req.body.content, datetime], function (error, results) {
                    if (error) {
                        logger.error(
                            "DB error [Inquiry_Board]" +
                            "\n \t" + queryData +
                            "\n \t" + error);
                        rejcet('DB ERR');
                    }
                    else {
                        res.redirect('/board/inquiry?page=1')
                    }
                })
            }
        ).catch(err => res.send("<script>alert('jwt err');</script>"));
    }
}
function inquiryWritePost(req, res, next) {
    var content = req.body.content;
    var title = req.body.title;
    let token = req.cookies.user;
    var file = req.file;
    if (title == "") res.send("<script>alert('제목을입력하세요.');history.back();</script>")
    else if (content == "") res.send("<script>alert('내용을입력하세요.');history.back();</script>")
    else {
        jwtmiddle.jwtCerti(token).then(
            (permission) => {
                var date = new dayjs();
                var datetime = date.format('YYYY-MM-DD HH:mm:ss');
                var user_id = permission.user_id;
                if (file != undefined) {
                    var datas = { user_id: user_id, title: title, content: content, date: datetime, img: file.filename };
                }
                else {
                    var datas = { user_id: user_id, title: title, content: content, date: datetime };
                }
                db.query('INSERT INTO Inquiry_Board SET ?', datas, function (error, row) {
                    //console.log("db_data : " + row)
                    if (error) {
                        logger.error(
                            "DB error [Inquiry_Board]" +
                            "\n \t" + error);
                        rejcet('DB ERR');
                    }
                    else { res.redirect("/board/inquiry?page=1"); }
                })
            }
        ).catch(err => res.send("<script>alert('jwt err');history.back();</script>"));
    }
}
function inquiryDelete(req, res, next) {
    var queryNum = req.query.num;
    console.log("queryNum : " + queryNum)
    var parameters = {
        "qid": queryNum
    };
    let token = req.cookies.user;
    jwtmiddle.jwtCerti(token).then(
        (permission) => {
            db.query(`DELETE FROM Inquiry_Board WHERE qid=${parameters.qid} and user_id=${permission.user_id}`, function (error, row) {
                if (error) {
                    logger.error(
                        "DB error [Inquiry_Board]" +
                        "\n \t" + error);
                    rejcet('DB ERR');
                }
                if (row.affectedRows == 0) {
                    res.send("<script>alert('You do not have permission');history.back();</script>");
                }
                else {
                    res.redirect("/board/inquiry?page=1")
                }
            })
        }
    ).catch(err => res.send("<script>alert('jwt err');history.back();</script>"));
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
                    res.render('board/free/FreeBoardMain', { db_data, dayjs, permission, parameters })
                }
            ).catch(err => res.send("<script>alert('jwt err');history.back();</script>"));

        }
    ).catch(err => res.send("<script>alert('" + err + "');location.href='/';</script>"))
}
function freeBoardWrite(req, res, next) {
    let token = req.cookies.user;
    jwtmiddle.jwtCerti(token).then(
        (permission) => {
            if (permission.user_id != undefined) {
                res.render('board/free/FreeBoardWrite', { permission })
            }
            else {
                res.send("<script>alert('Inaccessible');history.back();</script>")
            }
        }
    ).catch(err => res.send("<script>alert('jwt err');history.back();</script>"));
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
                        res.render('board/free/freeBoardDetail', {
                            dayjs, permission,
                            detailData: db_values["detailData"]
                        });
                    }
                ).catch(err => res.send("<script>alert('jwt err');history.back();</script>"));
            }
        )
        .catch(err => res.send("<script>alert('jwt err');history.back();</script>"));
}
function freeBoardModify(req, res, next) {
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
                        if (permission.user_id == db_values["detailData"][0].user_id) {
                            res.render('board/free/freeBoardModify', {
                                dayjs, permission,
                                detailData: db_values["detailData"]
                            });
                        }
                        else {
                            res.send("<script>alert('You do not have permission');history.back();</script>");
                        }
                    }
                ).catch(err => res.send("<script>alert('jwt err');history.back();</script>"));
            }
        )
        .catch(err => res.send("<script>alert('jwt err');history.back();</script>"));
}
function freeBoardModifyPost(req, res, next) {
    var queryNum = req.query.num;
    console.log("queryNum : " + queryNum)
    var parameters = {
        "qid": queryNum
    };
    let token = req.cookies.user;
    if (req.body.title == "") res.send("<script>alert('제목을입력하세요.');history.back();</script>")
    else if (req.body.content == "") res.send("<script>alert('내용을입력하세요.');history.back();</script>")
    else {
        jwtmiddle.jwtCerti(token).then(
            (permission) => {
                console.log(req.body.title)
                console.log(req.body.content)
                var date = new dayjs();
                var datetime = date.format('YYYY-MM-DD HH:mm:ss');
                db.query(`UPDATE Free_Board SET title=?, content=?,date=? where qid=${parameters.qid}`, [req.body.title, req.body.content, datetime], function (error, results) {
                    if (error) {
                        logger.error(
                            "DB error [Free_Board]" +
                            "\n \t" + queryData +
                            "\n \t" + error);
                        rejcet('DB ERR');
                    }
                    else {
                        res.redirect('/board/free?page=1')
                    }
                })
            }
        ).catch(err => res.send("<script>alert('jwt err');history.back();</script>"));
    }
}
function freeBoardWritePost(req, res, next) {
    var content = req.body.content;
    var title = req.body.title;
    let token = req.cookies.user;
    if (title == "") res.send("<script>alert('제목을입력하세요.');history.back();</script>")
    else if (content == "") res.send("<script>alert('내용을입력하세요.');history.back();</script>")
    else {
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
                    else { res.redirect("/board/free?page=1"); }
                })
            }
        ).catch(err => res.send("<script>alert('jwt err');history.back();</script>"));
    }
}
function freeBoardDelete(req, res, next) {
    var queryNum = req.query.num;
    console.log("queryNum : " + queryNum)
    var parameters = {
        "qid": queryNum
    };
    let token = req.cookies.user;
    jwtmiddle.jwtCerti(token).then(
        (permission) => {
            db.query(`DELETE FROM Free_Board WHERE qid=${parameters.qid} and user_id=${permission.user_id}`, function (error, row) {
                if (error) {
                    logger.error(
                        "DB error [Free_Board]" +
                        "\n \t" + error);
                    rejcet('DB ERR');
                }
                if (row.affectedRows == 0) {
                    res.send("<script>alert('You do not have permission');history.back();</script>");
                }
                else {
                    res.redirect("/board/free?page=1")
                }
            })
        }
    ).catch(err => res.send("<script>alert('jwt err');history.back();</script>"));
}
module.exports = {
    noticeMain,
    noticeWrite,
    noticeDetail,
    noticeWritePost,
    noticeModify,
    noticeModifyPost,
    noticeDelete,
    inquiryMain,
    inquiryDetail,
    inquiryComment,
    inquiryWrite,
    inquiryWritePost,
    inquiryModify,
    inquiryModifyPost,
    inquiryDelete,
    freeBoardMain,
    freeBoardWrite,
    freeBoardDetail,
    freeBoardWritePost,
    freeBoardModify,
    freeBoardModifyPost,
    freeBoardDelete
}
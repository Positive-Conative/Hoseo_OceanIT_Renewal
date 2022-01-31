'use strict';
//test
var db = require("../config/kyjdb");
var logger = require('../config/logger');

function count_questionBoard(parameters) {
    let queryData = `SELECT * FROM Inquiry_Board ORDER BY date desc`;
    return new Promise(function (resolve, reject) {
        db.query(queryData, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [Inquiry_Board]" +
                    "\n \t" + queryData +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            }
            resolve(db_data);
        });
    })
}
function count_questionBoardDetail(parameters){
    var queryData = `SELECT * FROM Inquiry_Board where qid="${parameters.qid}"`;
    return new Promise(function (resolve, reject) {
        db.query(queryData, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [Inquiry_Board]"+
                    "\n \t" + queryData +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            }
            resolve(db_data);
        });
    })
}
function count_questionBoardComment(parameters){
    var queryData = `SELECT * FROM inquiryComment where qid="${parameters.qid}"`;
    return new Promise(function (resolve, reject) {
        db.query(queryData, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [inquiryComment]"+
                    "\n \t" + queryData +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            }
            resolve(db_data);
        });
    })
}
function count_noticeBoard(parameters) {
    return new Promise(function (resolve, reject) {
        let queryData = `SELECT * From Notice_Board ORDER BY date desc`;
        db.query(queryData, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [Notice_Board]" +
                    "\n \t" + queryData +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            }
            resolve(db_data);
        })
    })
}
function count_noticeBoardDetail(parameters){
    var queryData = `SELECT * FROM Notice_Board where qid="${parameters.qid}"`;
    return new Promise(function (resolve, reject) {
        db.query(queryData, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [Notice_Board]"+
                    "\n \t" + queryData +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            }
            resolve(db_data);
        });
    })
}
function count_freeBoard(parameters){
    return new Promise(function(resolve,reject){
        let queryData = `SELECT * FROM Free_Board ORDER BY date desc`;
        db.query(queryData, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [Free_Board]" +
                    "\n \t" + queryData +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            }
            resolve(db_data);
        })
    })
}function count_freeBoardDetail(parameters){
    var queryData = `SELECT * FROM Free_Board where qid="${parameters.qid}"`;
    return new Promise(function (resolve, reject) {
        db.query(queryData, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [Free_Board]"+
                    "\n \t" + queryData +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            }
            resolve(db_data);
        });
    })
}
function count_freeBoardComment(parameters){
    var queryData = `SELECT * FROM freeBoardComment where qid="${parameters.qid}"`;
    return new Promise(function (resolve, reject) {
        db.query(queryData, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [freeBoardComment]"+
                    "\n \t" + queryData +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            }
            resolve(db_data);
        });
    })
}
function count_noticeBoardApp(parameters){
    let queryData = `SELECT * FROM Notice_Board ORDER BY date desc LIMIT 1`;
    return new Promise(function (resolve, reject) {
        db.query(queryData, function (error, db_data) {
            console.log(db_data);
            if (error) {
                logger.error(
                    "DB error [Notice_Board]"+
                    "\n \t" + queryData +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            }
            resolve(db_data);
        })
    })
}
module.exports = {
    count_questionBoard,
    count_questionBoardDetail,
    count_questionBoardComment,
    count_noticeBoard,
    count_noticeBoardDetail,
    count_freeBoard,
    count_freeBoardDetail,
    count_freeBoardComment,
    count_noticeBoardApp,
}
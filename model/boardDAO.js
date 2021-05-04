'use strict';
//test
var db = require("../config/kyjdb");
var logger = require('../config/logger');

function count_questionBoard(parameters) {
    let queryData = `SELECT * FROM Inquiry_Board ORDER BY date desc`;
    return new Promise(function (resolve, rejcet) {
        db.query(queryData, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [Inquiry_Board]" +
                    "\n \t" + queryData +
                    "\n \t" + error);
                rejcet('DB ERR');
                //throw error;
            }
            resolve(db_data);
        });
    })
}function count_questionBoardDetail(parameters){
    console.log("parameters : " + parameters.qid);
    var queryData = `SELECT * FROM Inquiry_Board where qid="${parameters.qid}"`;
    console.log("queryData : " + queryData);
    return new Promise(function (resolve, rejcet) {
        db.query(queryData, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [Inquiry_Board]"+
                    "\n \t" + queryData +
                    "\n \t" + error);
                rejcet('DB ERR');
                //throw error;
            }
            resolve(db_data);
        });
    })
}
function count_noticeBoard(parameters) {
    return new Promise(function (resolve, rejcet) {
        let queryData = `SELECT * From Notice_Board ORDER BY date desc`;
        db.query(queryData, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [Notice_Board]" +
                    "\n \t" + queryData +
                    "\n \t" + error);
                rejcet('DB ERR');
                //throw error;
            }
            resolve(db_data);
        })
    })
}
function count_noticeBoardDetail(parameters){
    console.log("parameters : " + parameters.qid);
    var queryData = `SELECT * FROM Notice_Board where qid="${parameters.qid}"`;
    console.log("queryData : " + queryData);
    return new Promise(function (resolve, rejcet) {
        db.query(queryData, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [Notice_Board]"+
                    "\n \t" + queryData +
                    "\n \t" + error);
                rejcet('DB ERR');
                //throw error;
            }
            resolve(db_data);
        });
    })
}
function count_freeBoard(parameters){
    return new Promise(function(resolve,rejcet){
        let queryData = `SELECT * FROM Free_Board ORDER BY date desc`;
        db.query(queryData, function (error, db_data) {
            console.log(db_data)
            if (error) {
                logger.error(
                    "DB error [Free_Board]" +
                    "\n \t" + queryData +
                    "\n \t" + error);
                rejcet('DB ERR');
                //throw error;
            }
            resolve(db_data);
        })
    })
}function count_freeBoardDetail(parameters){
    console.log("parameters : " + parameters.qid);
    var queryData = `SELECT * FROM Free_Board where qid="${parameters.qid}"`;
    console.log("queryData : " + queryData);
    return new Promise(function (resolve, rejcet) {
        db.query(queryData, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [Free_Board]"+
                    "\n \t" + queryData +
                    "\n \t" + error);
                rejcet('DB ERR');
                //throw error;
            }
            resolve(db_data);
        });
    })
}
module.exports = {
    count_questionBoard,
    count_questionBoardDetail,
    count_noticeBoard,
    count_noticeBoardDetail,
    count_freeBoard,
    count_freeBoardDetail
}
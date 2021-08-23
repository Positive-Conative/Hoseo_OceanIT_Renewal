'use strict';

var db = require("../config/kyjdb");
var logger = require('../config/logger');

function researchFields_selectAll(parameters) {
    var queryData = `SELECT * FROM Research_Fields`;
    if (parameters.type == "progress") {
        queryData += ` WHERE date_end > NOW()`;
    } else if (parameters.type == "finish") {
        queryData += ` WHERE date_end < NOW()`;
    }
    queryData += ` ORDER BY date_end desc`;
    if (!(parameters.limit == undefined)) queryData += ` LIMIT 0,${parameters.limit}`;
    return new Promise(function (resolve, reject) {
        db.query(queryData, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [Research_Fields]" +
                    "\n \t" + queryData +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            }
            console.log(db_data)
            resolve(db_data);
        });
    })
}

function researchFields_selectDetail(parameters) {
    var queryData = `SELECT * FROM Research_Fields where rfid="${parameters.rfid}"`;
    return new Promise(function (resolve, reject) {
        db.query(queryData, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [Research_Fields]" +
                    "\n \t" + queryData +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            }
            resolve(db_data);
        });
    })
}

function researchFields_selectDetailLinks(parameters) {
    var queryData = `SELECT * FROM Research_Fields_Links where rfid="${parameters.rfid}"`;
    return new Promise(function (resolve, reject) {
        db.query(queryData, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [Research_Fields]" +
                    "\n \t" + queryData +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            }
            resolve(db_data);
        });
    })
}

function researchFields_selectDetailPhotos(parameters) {
    var queryData = `SELECT * FROM Research_Fields_Photos where rfid="${parameters.rfid}"`;
    return new Promise(function (resolve, reject) {
        db.query(queryData, function (error, db_data) {
            if (error) {
                console.log("db_data : ")
                console.log(db_data)
                logger.error(
                    "DB error [Research_Fields]" +
                    "\n \t" + queryData +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            }
            resolve(db_data);
        });
    })
}

function researchFields_android_all(parameters) {
    var queryData = ""
    if(parameters.querys == "all")
        queryData = `SELECT * from Research_Fields`
    else if(parameters.querys == "progress")
        queryData = `SELECT * FROM Research_Fields WHERE date_end > NOW()`
    else
        queryData = `SELECT * FROM Research_Fields WHERE date_end < NOW()`

    return new Promise(function (resolve, reject) {
        db.query(queryData, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [Research_Fields]"+
                    "\n \t" + queryData +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            }
            resolve(db_data);
        });
    })
}

module.exports = {
    researchFields_selectAll,
    researchFields_selectDetail,
    researchFields_selectDetailLinks,
    researchFields_selectDetailPhotos,
    researchFields_android_all
}

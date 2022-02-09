'use strict';

var db = require("../config/kyjdb");
var logger = require('../config/logger');

function researchResults_selectAll(parameters) {
    var queryData = `SELECT * FROM Research_Results`
    if (parameters.search !== '') {
        queryData += ` WHERE (title_ko LIKE '%${parameters.search}%')`;
    }
    if (parameters.type == "patent" && parameters.search != '') {
        queryData += ` AND classify_ko = "특허"`;
    } else if (parameters.type == "patent" && parameters.search == '') {
        queryData += ` WHERE classify_ko = "특허"`;
    } else if (parameters.type == "treatise" && parameters.search != '') {
        queryData += ` AND classify_ko = "논문"`;
    } else if (parameters.type == "treatise" && parameters.search == '') {
        queryData += ` WHERE classify_ko = "논문"`;
    } else if (parameters.type == "announcement" && parameters.search != '') {
        queryData += ` AND classify_ko = "발표"`;
    } else if (parameters.type == "announcement" && parameters.search == '') {
        queryData += ` WHERE classify_ko = "발표"`;
    }

    queryData += ` ORDER BY date desc`;
    if (!(parameters.limit == undefined)) queryData += ` LIMIT 0,${parameters.limit}`;
    return new Promise(function (resolve, reject) {
        db.query(queryData, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [Research_Results]" +
                    "\n \t" + queryData +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            }
            resolve(db_data);
        });
    })
}


function researchResults_selectDetail(parameters) {
    var queryData = `SELECT * FROM Research_Results where rrid="${parameters.rrid}"`;

    return new Promise(function (resolve, reject) {
        db.query(queryData, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [Research_Results]" +
                    "\n \t" + queryData +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            }
            resolve(db_data);
        });
    })
}
function researchResults_android_all(parameters) {
    var queryData = `SELECT * FROM Research_Results where classify_ko = '${parameters.querys}'`

    return new Promise(function (resolve, reject) {
        db.query(queryData, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [Research_Results]" +
                    "\n \t" + queryData +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            }
            resolve(db_data);
        });
    })
}
function researchResults_MainApp() {
    let queryData = `SELECT * FROM Research_Results ORDER BY date desc LIMIT 5`;
    return new Promise(function (resolve, reject) {
        db.query(queryData, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [Research_Results]" +
                    "\n \t" + queryData +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            }
            resolve(db_data);
        })
    })
}
function researchResults_check(parameters) {
    let queryData = `SELECT * FROM Research_Results WHERE title_ko = ?`;
    return new Promise(function (resolve, reject) {
        db.query(queryData, [parameters.title_ko], function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [Research_Results]" +
                    "\n \t" + queryData +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            }
            resolve(db_data);
        })
    })
}
function researchResults_insert(parameters) {
    console.log(parameters)
    let queryData = `INSERT Research_Results SET group_id = ?, classify_ko = ?,title_ko = ?, writer_ko = ?, announe_nation_ko = ?, date = ?, application_num = ?;`;
    // let queryData = `INSERT INTO Research_Results (group, classify_ko, title_ko, writer_ko, announe_nation_ko, date, application_num) VALUES (?, ?, ?, ?, ?, ?, ?)`
    return new Promise(function (resolve, reject) {
        db.query(queryData, [parameters.group, parameters.classify_ko, parameters.title_ko, parameters.writer_ko, parameters.announe_nation_ko, parameters.date, parameters.application_num], function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [Research_Results]" +
                    "\n \t" + queryData +
                    "\n \t" + error);
                reject('DB ERR');
            }
            resolve('데이터 추가 완료');
        })
    })
}
module.exports = {
    researchResults_selectAll,
    researchResults_selectDetail,
    researchResults_android_all,
    researchResults_MainApp,
    researchResults_check,
    researchResults_insert
}

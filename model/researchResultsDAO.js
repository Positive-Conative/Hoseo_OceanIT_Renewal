'use strict';

var db = require("../config/kyjdb");
var logger = require('../config/logger');

function researchResults_selectAll(parameters) {
    var queryData = `SELECT * FROM Research_Results`
    if(parameters.search!==''){
        queryData += ` WHERE (title_ko LIKE '%${parameters.search}%')`;
    }
    if(parameters.type=="patent" && parameters.search!=''){
        queryData += ` AND classify_ko = "특허"`;
    } else if(parameters.type=="patent" && parameters.search==''){
        queryData += ` WHERE classify_ko = "특허"`;
    } else if(parameters.type=="treatise" && parameters.search!=''){
        queryData += ` AND classify_ko = "논문"`;
    } else if(parameters.type=="treatise" && parameters.search==''){
        queryData += ` WHERE classify_ko = "논문"`;
    } else if(parameters.type=="announcement" && parameters.search!=''){
        queryData += ` AND classify_ko = "발표"`;
    } else if(parameters.type=="announcement" && parameters.search==''){
        queryData += ` WHERE classify_ko = "발표"`;
    }

    queryData += ` ORDER BY date desc`;
    if(!(parameters.limit==undefined)) queryData+=` LIMIT 0,${parameters.limit}`;
    return new Promise(function (resolve, reject) {
        db.query(queryData, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [Research_Results]"+
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
                    "DB error [Research_Results]"+
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
                    "DB error [Research_Results]"+
                    "\n \t" + queryData +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            }
            resolve(db_data);
        });
    })
}
function researchResults_MainApp(){
    let queryData = `SELECT * FROM Research_Results ORDER BY date desc LIMIT 5`;
    return new Promise(function (resolve, reject) {
        db.query(queryData, function (error, db_data){
            if (error) {
                logger.error(
                    "DB error [Research_Results]"+
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
    researchResults_selectAll,
    researchResults_selectDetail,
    researchResults_android_all,
    researchResults_MainApp
}

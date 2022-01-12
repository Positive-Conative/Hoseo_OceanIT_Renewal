'use strict';

const e = require("express");
var db = require("../config/kyjdb");
var logger = require('../config/logger');

function researchFields_selectAll(parameters) {
    
    var queryData = `SELECT * FROM Research_Fields`;
    if(parameters.search!==''){
        queryData += ` WHERE (research_name_ko LIKE '%${parameters.search}%' OR business_name_ko LIKE '%${parameters.search}%')`;
    }
    if (parameters.type == "progress" && parameters.search!='') {
        queryData += ` AND date_end > NOW()`;
    }
    else if(parameters.type == "progress" && parameters.search==''){
        queryData += ` WHERE date_end > NOW()`;
    } else if (parameters.type == "finish" && parameters.search!='') {
        console.log(1)
        queryData += ` AND date_end < NOW()`;
    }
    else if(parameters.type == "finish" && parameters.search==''){
        console.log(2)
        queryData += ` WHERE date_end < NOW()`;
    }
    queryData += ` ORDER BY date_end desc`;
    if (!(parameters.limit == undefined)) queryData += ` LIMIT 0,${parameters.limit}`;
    return new Promise(function (resolve, reject) {
        console.log(queryData)
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
function researchFields_insert(parameters){
    return new Promise(function (resolve, reject) {
        const queryData = `INSERT INTO Research_Fields (classify_ko, research_name_ko,
            business_name_ko, department_name_ko, subjectivity_agency_ko, 
            support_agency_ko, participation_agency_ko, research_goal_ko,
            research_content_ko, expectation_result_ko, research_manager_ko,
            research_belong_ko, date_start, date_end)`
    })
}

function researchFields_search(parameters){
    return new Promise(function (resolve, reject) {
        const queryData = `SELECT * FROM Research_Fields WHERE `
    })
}
module.exports = {
    researchFields_selectAll,
    researchFields_selectDetail,
    researchFields_selectDetailLinks,
    researchFields_selectDetailPhotos,
    researchFields_android_all,
    researchFields_insert,
    researchFields_search
}

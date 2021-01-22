'use strict';

var db = require("../config/kyjdb");
var logger = require('../config/logger');

function Member_selectAll(parameters) {
    return new Promise(function (resolve, rejcet) {
        //SELECT * FROM Member LEFT OUTER JOIN Member_Career ON Member.mid = Member_Career.mid
        db.query(`SELECT DISTINCT * FROM  Member left JOIN Member_Career ON Member.mid = Member_Career.mid;`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [Research_Fields]"+
                    "\n \t" + `SELECT DISTINCT * FROM  Member left JOIN Member_Career ON Member.mid = Member_Career.mid;` +
                    "\n \t" + error);
                rejcet('DB ERR');
                //throw error;
            }
            if(db_data === undefined)
                resolve("<script>" +
                "alert('No Data');" +
                "window.history.go(-1);"+
                "</script>");
            resolve(db_data);
        });
    })
}

module.exports.memberDBFunc = {
    Member_selectAll
}
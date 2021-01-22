'use strict';

var db = require("../config/kyjdb");
var logger = require('../config/logger');

function researchFields_selectAll(parameters) {
    return new Promise(function (resolve, rejcet) {
        db.query(`SELECT * FROM Research_Results`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [Research_Results]"+
                    "\n \t" + `SELECT * FROM Research_Results` +
                    "\n \t" + error);
                rejcet('DB ERR');
                //throw error;
            }
            resolve(db_data);
        });
    })
}
module.exports.researchResultsFunc = {
    researchFields_selectAll
}

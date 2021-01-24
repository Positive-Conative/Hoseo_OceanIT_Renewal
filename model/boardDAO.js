'use strict';

var db = require("../config/kyjdb");
var logger = require('../config/logger');

function count_questionBoard(parameters) {
    return new Promise(function (resolve, rejcet) {
        let queryData = `SELECT DATE(write_date) AS write_date, COUNT(write_date) AS count FROM Inquiry_Board group BY DATE(write_date) ORDER BY DATE(write_date) desc`;
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
module.exports.boardDBFunc = {
    count_questionBoard
}

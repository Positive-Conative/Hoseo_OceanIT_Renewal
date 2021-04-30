'use strict';

var db = require("../config/kyjdb");
var logger = require('../config/logger');

function researchResults_selectAll(parameters) {
    var queryData = `SELECT * FROM Research_Results`
    if(parameters.type=="patent"){
        queryData += ` WHERE classify_ko = "특허"`;
    }else if(parameters.type=="treatise"){
        queryData += ` WHERE classify_ko = "논문"`;
    }else if(parameters.type=="announcement"){
        queryData += ` WHERE classify_ko = "발표"`;
    }

    queryData += ` ORDER BY date desc`;
    if(!(parameters.limit==undefined)) queryData+=` LIMIT 0,${parameters.limit}`;
    return new Promise(function (resolve, rejcet) {
        db.query(queryData, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [Research_Results]"+
                    "\n \t" + queryData +
                    "\n \t" + error);
                rejcet('DB ERR');
                //throw error;
            }
            resolve(db_data);
        });
    })
}


function researchResults_selectDetail(parameters) {
    var queryData = `SELECT * FROM Research_Results where rrid="${parameters.rrid}"`;

    return new Promise(function (resolve, rejcet) {
        db.query(queryData, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [Research_Results]"+
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
    researchResults_selectAll,
    researchResults_selectDetail
}

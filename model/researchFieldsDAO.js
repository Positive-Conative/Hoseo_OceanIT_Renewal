var db = require("../config/kyjdb");
var logger = require('../config/logger');

function researchFields_selectAll(parameters) {
    var queryData = `SELECT * FROM Research_Fields `;
    if(parameters.type=="progress"){
        queryData += `WHERE date_end > NOW()`;
    }else if(parameters.type=="finish"){
        queryData += `WHERE date_end < NOW()`;
    }
    return new Promise(function (resolve, rejcet) {
        db.query(queryData, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [Research_Fields]"+
                    "\n \t" + queryData +
                    "\n \t" + error);
                rejcet('DB ERR');
                //throw error;
            }
            resolve(db_data);
        });
    })
}
module.exports.researchFieldsFunc = {
    researchFields_selectAll
}

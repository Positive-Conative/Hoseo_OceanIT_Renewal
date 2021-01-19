var db = require("../config/kyjdb");
var logger = require('../config/logger');

function gallery_selectAll(parameters) {
    return new Promise(function (resolve, rejcet) {
        db.query(`SELECT * FROM Gallery`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [Gallery]"+
                    "\n \t" + `SELECT * FROM Gallery` +
                    "\n \t" + error);
                rejcet('DB ERR');
                //throw error;
            }
            resolve(db_data);
        });
    })
}
module.exports.galleryDBFunc = {
    gallery_selectAll
}

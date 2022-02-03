'use strict'

var db = require("../config/kyjdb");
var logger = require('../config/logger');

function admin_list(parameters){
    return new Promise(function (resolve, reject) {
        let queryData = `SELECT * FROM User WHERE role > '${parameters.role}'`;
        db.query(queryData, function (error, db_data){
            if (error) {
                logger.error(
                    "DB error [User]" +
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
    admin_list
}
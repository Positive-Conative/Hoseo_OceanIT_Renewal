'use strict';

var db = require("../config/kyjdb");
var logger = require('../config/logger');

function search_UserDetail(parameters) {
    return new Promise(function (resolve, rejcet) {
        db.query(`SELECT * FROM UserInfo where user_id="${parameters.user_id}" && user_pw="${parameters.user_pw}"`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [UserInfo]"+
                    "\n \t" + `SELECT * FROM UserInfo where user_id="${parameters.user_id}" && user_pw="${parameters.user_pw}"` +
                    "\n \t" + error);
                rejcet('DB ERR');d
                //throw error;
            }
            if(db_data[0]==undefined){
                rejcet("ID/PW를 확인하세요.")
            }
            else{
                resolve(db_data);
            }
        });
    })
}
module.exports = {
    search_UserDetail
}

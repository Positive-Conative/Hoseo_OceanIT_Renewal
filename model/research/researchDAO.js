var db = require("../../config/kyjDB");

function selectAll(req, res, next) {
    db.query(`SELECT * FROM research_fields`, function (error, db_data) {
        if (error) {
            throw error;
        }
        console.log(req.fdsa);
        console.log("rows : " + JSON.stringify(db_data));
        req.db_result = db_data;
        next();
    });
}

function selectAll1(req, res, next) {
    db.query(`SELECT * FROM research_fields where rid=1`, function (error, db_data) {
        if (error) {
            throw error;
        }
        console.log("rows : " + JSON.stringify(db_data));
        req.db_result = db_data;
        next();
    });
}
module.exports.getDBFunction = {
    selectAll,
    selectAll1
}
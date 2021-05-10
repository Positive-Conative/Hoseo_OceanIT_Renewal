var express = require('express');
var router = express.Router();
var db = require('../config/kyjDB');

router.get('/researchResultes', (req, res) => {
    var queryData = `SELECT frid,research_content_ko,research_name_ko FROM Research_Fields LIMIT 1 ORDER BY date desc`;
    db.query(queryData, function (err, fields) {
        var queryData1 = `SELECT img_src FROM Research_Fields_Photo WHERE qid=${fields.rfid}`;
        db.query(queryData1, function (err, fields1) {
            if (err) {
                throw err;
            }
            else {
                console.log(fields)
                console.log(fields1)
                res.json(fields, fields1);
            }
        })
    })
})
module.exports = router;

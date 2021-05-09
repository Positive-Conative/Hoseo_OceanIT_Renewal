var express = require('express');
var router = express.Router();
var db = require('../config/kyjDB');

router.get('/researchResultes',(req,res)=>{
    var queryData = `SELECT * FROM Research_Resultes LIMIT 1 ORDER BY date desc `;
    db.query(queryData,function(err,fields){
        if(err){throw err;}
        else{
            res.send(fields);
        }
    })
})

module.exports = router;

'use strict';

var express = require('express');
const db = require('../config/kyjdb');
var router = express.Router();

var memberController = require('../controller/memberController');

//member
router.get('/', memberController.memberMain);

router.post('/android/memberALL', (req, res)=>{
    db.query('select * from Member', (error, result)=>{
        if(error){
            throw error;
        }else{
            res.send(result);
        }
    })
})

module.exports = router;
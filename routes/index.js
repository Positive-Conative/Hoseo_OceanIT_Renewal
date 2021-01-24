'use strict';

var jwtmiddle = require('../middleware/jwt');
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  
  let token = req.cookies.user;
  jwtmiddle.jwtModule.jwtCerti(token).then(
    (permission)=>{
      res.render('index', { title: 'Express' , permission});
    }
  ).catch(err=>res.send("<script>alert('jwt err');</script>"));
});

var tc = require('../controller/testController');
router.get('/test', tc.myTest.test);
module.exports = router;
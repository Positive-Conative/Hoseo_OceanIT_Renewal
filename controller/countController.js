'use strict';

// var jwt = require('jsonwebtoken');
var jwtmiddle = require('../middleware/jwt');
var counterDAO = require('../model/counterDAO')

function counter(req, res, next) {
    if(!req.cookies.count && req.cookies['userId']){
        res.cookies('count',"",{maxAge:3600000,httpOnly:true});
        var now = new Date();
        var date = now.hetFullYear() + "/" + now.getMonth() + "/" + now.getDate();
        var parameters = {
            name : 'vistors',
            totalCount: 1,
            todayCount: 1,
            date:date,
        }
        counterDAO.insertCount(parameters).then(
            () => {
                console.log("Counter Success")
            }
        ).catch(err => res.send("<script>alert('Counter ERR')"))
    }
    return next();
}
module.exports = {
    counter
}
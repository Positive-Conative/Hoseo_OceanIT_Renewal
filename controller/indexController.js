'use strict';

var jwtmiddle = require('../middleware/jwt');
var memberDAO = require('../model/memberDAO');

function indexMain(req, res, next) {
    let token = req.cookies.user;
    var parameters = {
      "limit" : 4
    }
    var db_results = {};
    Promise.resolve()
    .then(
      ()=>{
        return memberDAO.Member_selectAll(parameters)
        .then(
          (db_data)=>{db_results.member = db_data;}
        )
      }
    )
    .then(
      ()=>{
        return jwtmiddle.jwtCerti(token).then(
          (permission)=>{
            res.render('index', {permission, db_results});
          }
        )
      }
    )
    .catch((err)=>res.send(err));
    
}
module.exports = {
    indexMain
}
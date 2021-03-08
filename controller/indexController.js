'use strict';

var jwtmiddle = require('../middleware/jwt');
var memberDAO = require('../model/memberDAO');
var researchFieldsDAO = require('../model/researchFieldsDAO');
var researchResultsDAO = require('../model/researchResultsDAO');

function indexMain(req, res, next) {
    let token = req.cookies.user;
    var parameters = {
      "limit" : 4
    }
    var db_results = {};
    Promise.resolve()
    .then(  //MEMBER
      ()=>{
        return memberDAO.Member_selectAll(parameters)
        .then(
          (db_data)=>{db_results.member = db_data;}
        )
      }
    )
    .then(  //research Fields
      ()=>{
        return researchFieldsDAO.researchFields_selectAll(parameters)
        .then(
          (db_data)=>{db_results.research_fields = db_data;}
        )
      }
    )
    .then(  //research Results
      ()=>{
        return researchResultsDAO.researchResults_selectAll(parameters)
        .then(
          (db_data)=>{db_results.research_results = db_data;}
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
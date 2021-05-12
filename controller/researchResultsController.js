'use strict';
 
var dayjs = require('dayjs');
var jwtmiddle = require('../middleware/jwt');
var researchResultsDAO = require('../model/researchResultsDAO');

function researchResults(req, res, next) {
    var queryType = req.query.type;
    var queryPage = req.query.page;
    var parameters={
        "type":queryType,
        "page":queryPage
    };
    researchResultsDAO.researchResults_selectAll(parameters).then(
        (db_data) => {
            let token = req.cookies.user;
            jwtmiddle.jwtCerti(token).then(
                (permission)=>{
                    res.render('research_results/researchResultsMain', { db_data, permission, parameters, dayjs});
                }
            ).catch(err=>res.send("<script>alert('jwt err');</script>"));
        }
    ).catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))
}

function researchResultsDetail(req, res, next) {
    var queryNum = req.query.num;
    var parameters={
        "rrid":queryNum
    };
    researchResultsDAO.researchResults_selectDetail(parameters).then(
        (db_data) => {
            let token = req.cookies.user;
            jwtmiddle.jwtCerti(token).then(
                (permission)=>{
                    res.render('research_results/researchResultsDetail', { db_data, permission, parameters, dayjs});
                }
            ).catch(err=>res.send("<script>alert('jwt err');</script>"));
        }
    ).catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))
}

module.exports = {
    researchResults,
    researchResultsDetail
}
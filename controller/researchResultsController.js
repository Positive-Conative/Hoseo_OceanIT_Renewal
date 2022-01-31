'use strict';

var dayjs = require('dayjs');
var jwtmiddle = require('../middleware/jwt');
var researchResultsDAO = require('../model/researchResultsDAO');
var counterDAO = require('../model/counterDAO')

async function researchResults(req, res, next){
    let token = req.session.user;
    var queryType = req.query.type;
    var queryPage = req.query.page;
    var parameters = {
        "type": queryType,
        "page": queryPage,
        "name": 'vistors'
    }
    try {
        const permission = await jwtmiddle.jwtCerti(token);
        const count_data = await counterDAO.findCount(parameters);
        const db_data = await researchResultsDAO.researchResults_selectAll(parameters);
        res.render('research_results/researchResultsMain', { db_data, permission, parameters, dayjs, count_data });
    } catch (error) {
        res.send("<script>alert('" + error + "');location.href='/';</script>")
    }
}

async function researchResultsDetail(req, res, next) {
    let token = req.session.user;
    var queryNum = req.query.num;
    var parameters = {
        "rrid": queryNum,
        "name": 'vistors'
    };
    try {
        const permission = await jwtmiddle.jwtCerti(token);
        const count_data = await counterDAO.findCount(parameters);
        const db_data = await researchResultsDAO.researchResults_selectDetail(parameters);
        res.render('research_results/researchResultsDetail', { db_data, permission, parameters, dayjs,count_data });
    } catch (error) {
        res.send("<script>alert('" + error + "');location.href='/';</script>")
    }
}
async function androidResearchResultsAll(req, res, next) {
    var parameters = {
        "querys": req.query.classify
    };
    try {
        const db_data = await researcFieldsDAO.researchResults_android_all(parameters);
        res.json(db_data);
    } catch (error) {
        res.send("<script>alert('" + err + "');location.href='/';</script>")
    }
}
async function researcResultWrite(req, res, next){
    let token = req.session.user;
    var queryNum = req.query.num;
    var parameters = {
        "rrid": queryNum,
        "name": 'vistors'
    };
    try {
        const count_data = await counterDAO.findCount(parameters);
        const permission = await jwtmiddle.jwtCerti(token);
        return res.render('research_results/researchResultsWrite',{count_data, permission});
    } catch (error) {
        res.send("<scripte>alert('" + error + "');history.back();")
    }
}


module.exports = {
    researchResults,
    researchResultsDetail,
    androidResearchResultsAll,
    researcResultWrite,
}
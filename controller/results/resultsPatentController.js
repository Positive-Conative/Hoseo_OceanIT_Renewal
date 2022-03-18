'use strict';

var dayjs = require('dayjs');
var jwtmiddle = require('../../middleware/jwt');
var researchResultsDAO = require('../../model/researchResultsDAO');
var counterDAO = require('../../model/counterDAO')

// Patent
async function researchResultsPatent(req, res, next) {
    let token = req.session.user;
    var queryPage = req.query.page;
    var querySearch = req.query.schKeyword;
    var parameters = {
        "type": 'patent',
        "page": queryPage,
        "search": querySearch,
        "name": 'vistors'
    }
    try {
        const permission = await jwtmiddle.jwtCerti(token);
        const count_data = await counterDAO.findCount(parameters);
        const db_data = await researchResultsDAO.researchResults_selectPatent(parameters)
        res.render('research_results/researchResultsMain', { db_data, permission, parameters, dayjs, count_data });
    } catch (error) {
        res.send("<script>alert('" + error + "');location.href='/';</script>")
    }
}
async function researchResultsPatentWrite(req, res, next) {
    try {
        let parameters = {
            "name": 'vistors'
        }
        let token = req.session.user;
        if (token == undefined) throw "Parameter ERR."
        const permission = await jwtmiddle.jwtCerti(token)
        if (permission.userRole >= 5) throw "권한이없습니다."
        const count_data = await counterDAO.findCount(parameters);
        res.render('research_results/researchResultsWritePatent',{count_data,permission})
    } catch (error) {
        res.send("<script>alert('" + error + "');location.href='/';</script>")
    }
}
async function researchResultsPatentDetail(req, res, next) {
    let token = req.session.user;
    var queryNum = req.query.num;
    var parameters = {
        "rrid": queryNum,
        "name": 'vistors'
    };
    try {
        const permission = await jwtmiddle.jwtCerti(token);
        const count_data = await counterDAO.findCount(parameters);
        const db_data = await researchResultsDAO.researchResults_selectDetailPatent(parameters);
        res.render('research_results/researchResultsDetailPatent', { db_data, permission, parameters, dayjs, count_data });
    } catch (error) {
        res.send("<script>alert('" + error + "');location.href='/';</script>")
    }
}
async function researchResultsPatentUpdate(req, res, next) {
    try {
        let token = req.session.user
        let queryNum = req.query.num;
        let parameters = {
            "rrid": queryNum,
            "name": 'vistors'
        }
        if (token == undefined) throw "Parameter ERR."
        const permission = await jwtmiddle.jwtCerti(token)
        if (permission.userRole >= 5) throw "권한이없습니다."
        const count_data = await counterDAO.findCount(parameters);
        const db_data = await researchResultsDAO.researchResults_selectDetailPatent(parameters);
        console.log(db_data)
        res.render('research_results/researchResultsModifyPatent', { db_data, count_data, permission })
    } catch (error) {
        res.send("<script>alert('" + error + "');location.href='/';</script>")
    }
}
async function researchResultsPatentDelete(req, res, next){
    try {
        let token = req.session.user
        let queryNum = req.query.num;
        let parameters = {
            "rrid": queryNum,
        }
        if (token == undefined) throw "Parameter ERR."
        const permission = await jwtmiddle.jwtCerti(token)
        if (permission.userRole >= 5) throw "권한이없습니다."
        const db_data = await researchResultsDAO.researchResults_DeletePatent(parameters);
        res.redirect('/research/results/patent?schKeyword=&page=1');
    } catch (error) {
        res.send("<script>alert('" + error + "');location.href='/';</script>")
    }
}
async function researchResultsPatentWriteP(req,res,next){
    try {
        let parameters = {
            "group_id":req.body.group,
            "announe_nation_ko":req.body.announe_nation_ko,
            "title_ko": req.body.title_ko,
            "application_num": req.body.application_num,
            "date": req.body.date,
            // "등록번호??":res.body.?,
            // "등록일자??":res.body.?,
            "writer_ko": req.body.writer_ko,
        }
        let token = req.session.user;
        if (token == undefined) throw "Parameter ERR."
        const permission = await jwtmiddle.jwtCerti(token)
        if (permission.userRole >= 5) throw "권한이없습니다."
    } catch (error) {
        
    }
}
module.exports = {
    researchResultsPatent,
    researchResultsPatentWrite,
    researchResultsPatentDetail,
    researchResultsPatentUpdate,
    researchResultsPatentDelete,
    // researchResultsPatentWriteP
}
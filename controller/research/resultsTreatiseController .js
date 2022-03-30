'use strict';

var dayjs = require('dayjs');
var jwtmiddle = require('../../middleware/jwt');
var researchResultsDAO = require('../../model/researchResultsDAO');
var counterDAO = require('../../model/counterDAO')

// Treatise
async function researchResultsTreatise(req, res, next) {
    let token = req.session.user;
    var queryPage = req.query.page;
    var querySearch = req.query.schKeyword;
    var parameters = {
        "type": 'treatise',
        "page": queryPage,
        "search": querySearch,
        "name": 'vistors'
    }
    try {
        const permission = await jwtmiddle.jwtCerti(token);
        const count_data = await counterDAO.findCount(parameters);
        const db_data = await researchResultsDAO.researchResults_selectTreatise(parameters)
        res.render('research_results/researchResultsMain', { db_data, permission, parameters, dayjs, count_data });
    } catch (error) {
        res.send("<script>alert('" + error + "');location.href='/';</script>")
    }
}

async function researchResultsTreatiseWrite(req, res, next) {
    try {
        let parameters = {
            "name": 'vistors'
        }
        let token = req.session.user;
        if (token == undefined) throw "Parameter ERR."
        const permission = await jwtmiddle.jwtCerti(token)
        if (permission.userRole >= 5) throw "권한이없습니다."
        const count_data = await counterDAO.findCount(parameters);
        res.render('research_results/researchResultsWriteTreatise', { count_data, permission })
    } catch (error) {
        res.send("<script>alert('" + error + "');location.href='/';</script>")
    }
}
async function researchResultsTreatiseDetail(req, res, next) {
    let token = req.session.user;
    var queryNum = req.query.num;
    var parameters = {
        "rrid": queryNum,
        "name": 'vistors'
    };
    try {
        const permission = await jwtmiddle.jwtCerti(token);
        const count_data = await counterDAO.findCount(parameters);
        const db_data = await researchResultsDAO.researchResults_selectDetailTreatise(parameters);
        res.render('research_results/researchResultsDetailTreatise', { db_data, permission, parameters, dayjs, count_data });
    } catch (error) {
        res.send("<script>alert('" + error + "');location.href='/';</script>")
    }
}
async function researchResultsTreatiseUpdate(req, res, next) {
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
        const db_data = await researchResultsDAO.researchResults_selectDetailTreatise(parameters);
        console.log(db_data)
        res.render('research_results/researchResultsModifyTreatise', { db_data, count_data, permission })
    } catch (error) {
        res.send("<script>alert('" + error + "');location.href='/';</script>")
    }
}
async function researchResultsTreatiseDelete(req, res, next) {
    try {
        let token = req.session.user
        let queryNum = req.query.num;
        let parameters = {
            "rrid": queryNum,
        }
        if (token == undefined) throw "Parameter ERR."
        const permission = await jwtmiddle.jwtCerti(token)
        if (permission.userRole >= 5) throw "권한이없습니다."
        const db_data = await researchResultsDAO.researchResults_DeleteTreatise(parameters);
        res.redirect('/research/results/treatise?schKeyword=&page=1');
    } catch (error) {
        res.send("<script>alert('" + error + "');location.href='/';</script>")
    }
}
async function researchResultsTreatiseWriteP(req, res, next) {
    try {
        let token = req.session.user;
        if (token == undefined) throw "Parameter ERR."
        const permission = await jwtmiddle.jwtCerti(token)
        if (permission.userRole >= 5) throw "권한이없습니다."
        let parameters = {
            "title_ko": req.body.title_ko,
            // "학술지명??": req.body.?,
            // "발행기간??":req.body.?,
            "writer_ko": req.body.writer_ko,
            "group_id": req.body.group_id,
            // "Vol(NO)??": req.body.?,
            "date":req.body.date,
            "announe_nation_ko": req.body.announe_nation_ko,
        }
    } catch (error) {

    }
}

module.exports = {
    researchResultsTreatise,
    researchResultsTreatiseWrite,
    researchResultsTreatiseDetail,
    researchResultsTreatiseUpdate,
    researchResultsTreatiseDelete,
    // researchResultsTreatiseWriteP,
}
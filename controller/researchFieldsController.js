'use strict';

var dayjs = require('dayjs');
var jwtmiddle = require('../middleware/jwt');
var researcFieldsDAO = require('../model/researchFieldsDAO');
var counterDAO = require('../model/counterDAO')

async function researchFields(req, res, next) {
    var queryType = req.query.type;
    var queryPage = req.query.page;
    var querySearch = req.query.schKeyword;
    var parameters = {
        "type": queryType,
        "page": queryPage,
        "search": querySearch,
        "name": 'vistors',
    };
    let token = req.session.user;
    try {
        const db_data = await researcFieldsDAO.researchFields_selectAll(parameters);
        const count_data = await counterDAO.findCount(parameters);
        const permission = await jwtmiddle.jwtCerti(token);
        res.render('research_fields/researchFieldsMain', { db_data, permission, count_data, dayjs, parameters });
    } catch (error) {
        res.send("<script>alert('" + error + "');location.href='/';</script>")
    }
}

async function researchFieldsDetail(req, res, next) {
    var queryNum = req.query.num;
    var parameters = {
        "rfid": queryNum,
        "name": 'vistors'
    };
    let token = req.session.user;
    try {
        const detailData = await researcFieldsDAO.researchFields_selectDetail(parameters);
        const linkData = await researcFieldsDAO.researchFields_selectDetailLinks(parameters);
        const photoData = await researcFieldsDAO.researchFields_selectDetailPhotos(parameters);
        const count_data = await counterDAO.findCount(parameters);
        const permission = await jwtmiddle.jwtCerti(token);
        res.render('research_fields/researchFieldsDetail', { dayjs, permission, detailData, linkData, photoData, count_data });
    } catch (error) {
        res.send("<script>alert('" + error + "');history.go(-1);</script>")
    }
}

async function androidResearchFieldsAll(req, res, next) {
    var querys = req.query.classify
    var sql = ""
    var parameters = {
        "querys": querys,
    };
    try {
        const db_data = await researcFieldsDAO.researchFields_android_all(parameters)
        res.json(db_data)
    } catch (error) {
        res.send("DBDRR", err)
    }
}

async function researchFieldhWrite(req, res, next) {
    let token = req.get('token')
    var parameters = {
        "name": 'vistors'
    };
    try {
        const count_data = await counterDAO.findCount(parameters);
        const permission = await jwtmiddle.jwtCerti(token);
        console.log(permission)
        if (permission.userRole < 5)
            return res.render('research_fields/researchFieldsWrite', { count_data, permission });
        else throw "권한이없습니다.";
    } catch (error) {
        res.send("<script>alert('" + error + "');location.href='/';</script>")
    }
}

async function researchFieldhWriteP(req, res, next) {
    let body = req.body
    let parameters = {
        classify_ko: body.classify_ko,
        research_name_ko: body.research_name_ko,
        business_name_ko: body.business_name_ko,
        department_name_ko: body.department_name_ko,
        subjectivity_agency_ko: body.subjectivity_agency_ko,
        support_agency_ko: body.support_agency_ko,
        participation_agency_ko: body.participation_agency_ko,
        research_goal_ko: body.research_goal_ko,
        research_content_ko: body.research_content_ko,
        expectation_result_ko: body.expectation_result_ko,
        research_manager_ko: body.research_manager_ko,
        research_belong_ko: body.research_belong_ko,
        date_start: body.date_start,
        date_end: body.date_end,
    }
    try {
        const searchFields = await researcFieldsDAO.researchFields_check(parameters);
        if (searchFields[0] !== undefined) throw "이미 존재하는 과제명입니다.";
        const results = await researcFieldsDAO.researchFields_insert(parameters);
        res.send("<script>alert('" + results + "');location.href='/research/fields?type=all&schKeyword=&page=1';</script>")
    } catch (error) {
        res.send("<script>alert('" + error + "');history.go(-1);</script>")
    }
}

module.exports = {
    researchFields,
    researchFieldsDetail,
    androidResearchFieldsAll,
    researchFieldhWrite,
    researchFieldhWriteP,
}
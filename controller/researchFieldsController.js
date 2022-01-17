'use strict';

var dayjs = require('dayjs');
var jwtmiddle = require('../middleware/jwt');
var researcFieldsDAO = require('../model/researchFieldsDAO');
var counterDAO = require('../model/counterDAO')

function researchFields(req, res, next) {
    var queryType = req.query.type;
    var queryPage = req.query.page;
    var querySearch = req.query.schKeyword;
    var parameters = {
        "type": queryType,
        "page": queryPage,
        "search": querySearch,
        "name": 'vistors',
    };
    researcFieldsDAO.researchFields_selectAll(parameters).then(
        (db_data) => {
            counterDAO.findCount(parameters).then(
                (count_data) => {
                    let token = req.session.user;
                    jwtmiddle.jwtCerti(token).then(
                        (permission) => {
                            res.render('research_fields/researchFieldsMain', { db_data, dayjs, parameters, permission, count_data });
                        }
                    ).catch(err => res.send("<script>alert('jwt err');</script>"));
                })
        }).catch(err => res.send("<script>alert('" + err + "');location.href='/';</script>"))
}

function researchFieldsDetail(req, res, next) {
    var queryNum = req.query.num;
    var parameters = {
        "rfid": queryNum,
        "name": 'vistors'
    };
    var db_values = {};
    Promise.resolve(db_values)
        .then(
            (db_values) => {
                return researcFieldsDAO.researchFields_selectDetail(parameters)
                    .then((detailData) => { db_values.detailData = detailData; })
                    .then(() => { return db_values })
                    .catch(err => res.send("<script>alert('" + err + "');location.href='/';</script>"))
            }
        )
        .then(
            (db_values) => {
                return researcFieldsDAO.researchFields_selectDetailLinks(parameters)
                    .then((linkData) => { db_values.linkData = linkData; })
                    .then(() => { return db_values })
                    .catch(err => res.send("<script>alert('" + err + "');location.href='/';</script>"))
            }
        )
        .then(
            (db_values) => {
                return researcFieldsDAO.researchFields_selectDetailPhotos(parameters)
                    .then((photoData) => { db_values.photoData = photoData; })
                    .then(() => { return db_values })
                    .catch(err => res.send("<script>alert('" + err + "');location.href='/';</script>"))
            }
        )
        .then(
            () => {
                counterDAO.findCount(parameters).then(
                    (count_data) => {
                        let token = req.session.user;
                        jwtmiddle.jwtCerti(token).then(
                            (permission) => {
                                res.render('research_fields/researchFieldsDetail', {
                                    dayjs, permission,
                                    detailData: db_values["detailData"],
                                    linkData: db_values["linkData"],
                                    photoData: db_values["photoData"],
                                    count_data
                                });
                            }
                        ).catch(err => res.send("<script>alert('jwt err');</script>"));
                    }
                )
            }
        )
        .catch(err => res.send("<script>alert('jwt err');</script>"));
}

function androidResearchFieldsAll(req, res, next) {
    var querys = req.query.classify
    var sql = ""
    var parameters = {
        "querys": querys,
    };

    researcFieldsDAO.researchFields_android_all(parameters).then(
        (db_data) => {
            res.json(db_data)
        }
    ).catch(err => res.send("DBDRR", err))
}
async function researchFieldhWrite(req, res, next){
    let token = req.session.user;
    var parameters = {
        "name": 'vistors'
    };
    try {
        const count_data = await counterDAO.findCount(parameters);
        const permission = await jwtmiddle.jwtCerti(token);
        console.log(permission)
        if(permission.userRole<5)
            return res.render('research_fields/researchFieldsWrite',{count_data, permission});
        else throw "권한이없습니다.";
    } catch (error) {
        res.send("<script>alert('" + error + "');location.href='/';</script>")
    }
}

async function researchFieldhWriteP(req, res, next){
    let body = req.body
    let parameters ={
        classify_ko:body.classify_ko,
        research_name_ko:body.research_name_ko,
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
        if(searchFields[0]!== undefined) throw "이미 존재하는 과제명입니다.";
        const results = await researcFieldsDAO.researchFields_insert(parameters);
        res.send("<script>alert('"+ results +"');location.href='/research/fields?type=all&schKeyword=&page=1';</script>")
    } catch (error) {
        res.send("<script>alert('" + error +"');history.go(-1);</script>")
    }
}

module.exports = {
    researchFields,
    researchFieldsDetail,
    androidResearchFieldsAll,
    researchFieldhWrite,
    researchFieldhWriteP,
}
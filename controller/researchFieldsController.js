'use strict';

var dayjs = require('dayjs');
var jwtmiddle = require('../middleware/jwt');
var researcFieldsDAO = require('../model/researchFieldsDAO');

function researchFields(req, res, next) {
    var queryType = req.query.type;
    var queryPage = req.query.page;
    var parameters={
        "type":queryType,
        "page":queryPage
    };
    researcFieldsDAO.researchFieldsFunc.researchFields_selectAll(parameters).then(
        (db_data) => {
            let token = req.cookies.user;
            jwtmiddle.jwtModule.jwtCerti(token).then(
                (permission)=>{
                    res.render('research_fields/researchFieldsMain', { db_data, dayjs, parameters, permission });
                }
            ).catch(err=>res.send("<script>alert('jwt err');</script>"));
        }
    ).catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))
}

function researchFieldsDetail(req, res, next) {
    //req.session.userid = req.body.id;
    var queryNum = req.query.num;
    var parameters={
        "rfid":queryNum
    };
    researcFieldsDAO.researchFieldsFunc.researchFields_selectDetail(parameters).then(
        (detailData) => { 
            researcFieldsDAO.researchFieldsFunc.researchFields_selectDetailLinks(parameters).then(
                (linkData) => {  
                     researcFieldsDAO.researchFieldsFunc.researchFields_selectDetailPhotos(parameters).then(
                        (photoData) => {
                            let token = req.cookies.user;
                            jwtmiddle.jwtModule.jwtCerti(token).then(
                                (permission)=>{
                                    res.render('research_fields/researchFieldsDetail', { dayjs, detailData, linkData, photoData, permission });
                                }
                            ).catch(err=>res.send("<script>alert('jwt err');</script>"));
                        }
                    ).catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))
                }
            ).catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))
        }
    ).catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))
}

module.exports.researchFunc = {
    researchFields,
    researchFieldsDetail
}
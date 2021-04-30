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
    researcFieldsDAO.researchFields_selectAll(parameters).then(
        (db_data) => {
            let token = req.cookies.user;
            jwtmiddle.jwtCerti(token).then(
                (permission)=>{
                    res.render('research_fields/researchFieldsMain', { db_data, dayjs, parameters, permission });
                }
            ).catch(err=>res.send("<script>alert('jwt err');</script>"));
        }
    ).catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))
}

function researchFieldsDetail(req, res, next) {
    var queryNum = req.query.num;
    var parameters={
        "rfid":queryNum
    };    
    var db_values={};
    Promise.resolve(db_values)
    .then(
        (db_values)=>{
            return researcFieldsDAO.researchFields_selectDetail(parameters)
            .then((detailData) => {db_values.detailData = detailData;})
            .then(()=> {return db_values})
            .catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))
        }
    )
    .then(
        (db_values)=>{
            return researcFieldsDAO.researchFields_selectDetailLinks(parameters)
            .then((linkData) => {db_values.linkData = linkData;})
            .then(()=> {return db_values})
            .catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))
        }
    )
    .then(
        (db_values)=>{
            return researcFieldsDAO.researchFields_selectDetailPhotos(parameters)
            .then((photoData) => {db_values.photoData = photoData;})
            .then(()=> {return db_values})
            .catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))
        }
    )
    .then(
        ()=>{
            let token = req.cookies.user;
            jwtmiddle.jwtCerti(token).then(
                (permission)=>{
                    console.log(db_values["detailData"])
                    res.render('research_fields/researchFieldsDetail', { 
                        dayjs, permission,
                        detailData : db_values["detailData"],
                        linkData : db_values["linkData"],
                        photoData : db_values["photoData"]
                    });
                }
            ).catch(err=>res.send("<script>alert('jwt err');</script>"));
        }
    )
    .catch(err=>res.send("<script>alert('jwt err');</script>"));
}

function androidResearchFieldsAll(req, res, next) {
    var querys = req.query.classify
    var sql = ""

    var parameters={
        "querys":querys,
    };

    researcFieldsDAO.researchFields_android_all(parameters).then(
        (db_data) => {
            res.json(db_data)
        }
    ).catch(err=>res.send("DBDRR",err))
}
module.exports = {
    researchFields,
    researchFieldsDetail,
    androidResearchFieldsAll
}
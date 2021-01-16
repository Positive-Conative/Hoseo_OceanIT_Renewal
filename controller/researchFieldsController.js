var dayjs = require('dayjs');
var researcFieldsDAO = require('../model/researchFieldsDAO');

function researchFields(req, res, next) {
    //req.session.userid = req.body.id;
    var queryType = req.query.type;
    var researchType="all";
    if(queryType=="progress"){
        researchType = "진뢩 과줴"
        console.log("1")
    }else if(queryType=="finish"){
        console.log("2")
    }else{
        console.log("3")
    }
    researcFieldsDAO.researchFieldsFunc.researchFields_selectAll().then(
        (db_data) => {
            //console.log(db_data);
            res.render('research_fields/researchFieldsMain', { db_data, dayjs, researchType });
        }
    ).catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))
}

function researchFieldsDetail(req, res, next) {
    //req.session.userid = req.body.id;

    researcFieldsDAO.researchFieldsFunc.researchFields_selectAll().then(
        (db_data) => {
            //console.log(db_data);
            res.render('research_fields/researchFieldsDetail', { db_data });
        }
    ).catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))
}

module.exports.researchFunc = {
    researchFields,
    researchFieldsDetail
}
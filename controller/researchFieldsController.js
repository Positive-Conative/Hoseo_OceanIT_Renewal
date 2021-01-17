var dayjs = require('dayjs');
var researcFieldsDAO = require('../model/researchFieldsDAO');

function researchFields(req, res, next) {
    //req.session.userid = req.body.id;
    var queryType = req.query.type;
    var queryPage = req.query.page;
    var parameters={
        "type":queryType,
        "page":queryPage
    };
    researcFieldsDAO.researchFieldsFunc.researchFields_selectAll(parameters).then(
        (db_data) => {
            //console.log(db_data);
            res.render('research_fields/researchFieldsMain', { db_data, dayjs, parameters });
        }
    ).catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))
}

function researchFieldsDetail(req, res, next) {
    //req.session.userid = req.body.id;

    researcFieldsDAO.researchFieldsFunc.researchFields_selectOne().then(
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
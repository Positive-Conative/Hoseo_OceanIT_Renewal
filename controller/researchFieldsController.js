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
    var queryNum = req.query.num;
    var parameters={
        "rfid":queryNum
    };
    var detailData, linkData, photoData;
    researcFieldsDAO.researchFieldsFunc.researchFields_selectDetail(parameters).then(
        (db_data) => { detailData = db_data }
    ).catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))

    researcFieldsDAO.researchFieldsFunc.researchFields_selectDetailLinks(parameters).then(
        (db_data) => { linkData = db_data  }
    ).catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))

    researcFieldsDAO.researchFieldsFunc.researchFields_selectDetailPhotos(parameters).then(
        (db_data) => { photoData = db_data  }
    ).catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))

    res.render('research_fields/researchFieldsDetail', { dayjs, detailData, detailData, photoData });
}

module.exports.researchFunc = {
    researchFields,
    researchFieldsDetail
}
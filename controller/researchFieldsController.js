var researchDAO = require('../model/researchDAO');

function researchFields(req, res, next) {
    //req.session.userid = req.body.id;

    var parameters={"adminID":1, "adminPW":2}
    researchDAO.adminDBFunc.researchFields_selectAll(parameters).then(
        (db_data) => {
            //console.log(db_data);
            res.render('research_fields/researchFieldsMain', { db_data });
        }
    ).catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))
}

module.exports.researchFunc = {
    researchFields
}
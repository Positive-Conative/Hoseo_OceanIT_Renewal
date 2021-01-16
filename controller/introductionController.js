var introductionDAO = require('../model/introductionDAO');

function introductionMain(req, res, next) {
    //req.session.userid = req.body.id;

    var parameters={"adminID":1, "adminPW":2}
    introductionDAO.introductionDBFunc.introduction_selectAll(parameters).then(
        (db_data) => {
            //console.log(db_data);
            res.render('introduction/introductionMain', { db_data });
        }
    ).catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))
}

module.exports.introductionMainFunc = {
    introductionMain
}
var memberDAO = require('../../model/member/memberDAO');

function memberMain(req, res, next) {
    //req.session.userid = req.body.id;

    var parameters={"adminID":1, "adminPW":2}
    memberDAO.memberDBFunc.Member_selectAll(parameters).then(
        (db_data) => {
            //console.log(db_data);
            res.send(db_data)
        }
    ).catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))
}

module.exports.memberFunc = {
    memberMain
}
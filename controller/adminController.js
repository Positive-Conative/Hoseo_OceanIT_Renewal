'use strict';

var jwtmiddle = require('../middleware/jwt');
var boardDAO = require('../model/boardDAO');

function adminMain(req, res, next) {
    boardDAO.boardDBFunc.count_questionBoard().then(
        (db_data) => {
            let token = req.cookies.user;
            jwtmiddle.jwtModule.jwtCerti(token).then(
                (permission)=>{
                    res.render('admin/adminMain', { db_data, permission});
                }
            ).catch(err=>res.send("<script>alert('jwt err');</script>"));
        }
    ).catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))

}
module.exports.adminFunc = {
    adminMain
}
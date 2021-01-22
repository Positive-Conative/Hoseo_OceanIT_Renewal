'use strict';

var jwtmiddle = require('../middleware/jwt');
var memberDAO = require('../model/memberDAO');

function memberMain(req, res, next) {
    memberDAO.memberDBFunc.Member_selectAll().then(
        (db_data) => {
            let token = req.cookies.user;
            jwtmiddle.jwtModule.jwtCerti(token).then(
                (permission)=>{
                    res.render('member/memberMain', { db_data, permission });
                }
            ).catch(err=>res.send("<script>alert('jwt err');</script>"));
        }
    ).catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))
}

module.exports.memberFunc = {
    memberMain
}
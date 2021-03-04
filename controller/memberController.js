'use strict';

var jwtmiddle = require('../middleware/jwt');
var memberDAO = require('../model/memberDAO');

function memberMain(req, res, next) {
    var db_data;
    memberDAO.Member_selectAll().then((recv_data) => { db_data = recv_data; })
    .then(
        ()=>{
            let token = req.cookies.user;
            jwtmiddle.jwtCerti(token).then(
                (permission)=>{
                    res.render('member/memberMain', { db_data, permission });
                }
            ).catch(err=>res.send("<script>alert('jwt err');</script>"));
        }
    )
    .catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))
}

module.exports = {
    memberMain
}
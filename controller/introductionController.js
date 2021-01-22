'use strict';

var jwtmiddle = require('../middleware/jwt');
var introductionDAO = require('../model/introductionDAO');

function introductionMain(req, res, next) {
    introductionDAO.introductionDBFunc.introduction_selectAll().then(
        (db_data) => {
            let token = req.cookies.user;
            jwtmiddle.jwtModule.jwtCerti(token).then(
                (permission)=>{
                    res.render('introduction/introductionMain', { db_data, permission });
                }
            ).catch(err=>res.send("<script>alert('jwt err');</script>"));
        }
    ).catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))
}

module.exports.introductionMainFunc = {
    introductionMain
}
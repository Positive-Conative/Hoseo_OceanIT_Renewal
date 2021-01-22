'use strict';

var jwtmiddle = require('../middleware/jwt');
var galleryDAO = require('../model/galleryDAO');

function galleryMain(req, res, next) {

    galleryDAO.galleryDBFunc.gallery_selectAll().then(
        (db_data) => {
            let token = req.cookies.user;
            jwtmiddle.jwtModule.jwtCerti(token).then(
                (permission)=>{
                    res.render('gallery/galleryMain', { db_data, permission});
                }
            ).catch(err=>res.send("<script>alert('jwt err');</script>"));
        }
    ).catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))
}

function galleryDetail(req, res, next) {
    var queryNum = req.query.num;
    var parameters={
        "gid":queryNum
    };
    galleryDAO.galleryDBFunc.gallery_selectOneDetail(parameters).then(
        (db_data) => {
            let token = req.cookies.user;
            jwtmiddle.jwtModule.jwtCerti(token).then(
                (permission)=>{
                    res.render('gallery/galleryDetail', { db_data, permission });
                }
            ).catch(err=>res.send("<script>alert('jwt err');</script>"));
        }
    ).catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))
}
module.exports.galleryFunc = {
    galleryMain,
    galleryDetail
}
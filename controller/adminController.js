'use strict';

var jwtmiddle = require('../middleware/jwt');
function adminMain(req, res, next) {
    let token = req.cookies.user;
    jwtmiddle.jwtModule.jwtCerti(token).then(
        (permission)=>{
            res.render('admin/adminMain', { permission })
        }
    ).catch(err=>res.send("<script>alert('jwt err');</script>"));

    
    // var queryNum = req.query.num;
    // var parameters={
    //     "gid":queryNum
    // };
    // galleryDAO.galleryDBFunc.gallery_selectOneDetail(parameters).then(
    //     (db_data) => {
    //         let token = req.cookies.user;
    //         jwtmiddle.jwtModule.jwtCerti(token).then(
    //             (permission)=>{
    //                 res.render('gallery/galleryDetail', { db_data, permission });
    //             }
    //         ).catch(err=>res.send("<script>alert('jwt err');</script>"));
    //     }
    // ).catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))
}
module.exports.adminFunc = {
    adminMain
}
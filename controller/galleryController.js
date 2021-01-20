var galleryDAO = require('../model/galleryDAO');

function galleryMain(req, res, next) {
    galleryDAO.galleryDBFunc.gallery_selectAll().then(
        (db_data) => {
            res.render('gallery/galleryMain', { db_data });
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
            res.render('gallery/galleryDetail', { db_data });
        }
    ).catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))
}
module.exports.galleryFunc = {
    galleryMain,
    galleryDetail
}
var galleryDAO = require('../model/galleryDAO');

function galleryMain(req, res, next) {
    //req.session.userid = req.body.id;

    var parameters={"adminID":1, "adminPW":2}
    galleryDAO.galleryDBFunc.gallery_selectAll().then(
        (db_data) => {
            //console.log(db_data);
            res.render('gallery/galleryMain', { db_data });
        }
    ).catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))
    console.log("FF!!");
}

module.exports.galleryFunc = {
    galleryMain
}
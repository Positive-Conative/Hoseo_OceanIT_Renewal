'use strict';

var jwtmiddle = require('../middleware/jwt');
function adminMain(req, res, next) {
    let token = req.cookies.user;
    jwtmiddle.jwtModule.jwtCerti(token).then(
        (permission)=>{
            res.render('admin/adminMain', { permission })
        }
    ).catch(err=>res.send("<script>alert('jwt err');</script>"));

}
module.exports.adminFunc = {
    adminMain
}
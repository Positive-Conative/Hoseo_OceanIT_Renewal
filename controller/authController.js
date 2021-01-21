var userInfoDAO = require('../model/userInfoDAO');

function signIn(req, res, next) {
    userInfoDAO.userInfoFunc.search_UserDetail().then(
        (db_data) => {
            res.render('auth/signIn', { db_data });
        }
    ).catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))
}

function checkUser(req, res, next) {
    console.log(req.body.inputID);
    console.log(req.body.inputPW);
}

module.exports.authFunc = {
    signIn,
    checkUser
}
'use strict';

var jwt = require('jsonwebtoken');
var userInfoDAO = require('../model/userInfoDAO');

function signIn(req, res, next) {
    let token = req.cookies.user;
    res.clearCookie('user');
    res.render('auth/signIn');
}

function checkUser(req, res, next) {
    var special_pattern = /[` ~!@#$%^&*|\\\'\";:\/?]/gi;
    
    if(special_pattern.test(req.body.inputID)|| special_pattern.test(req.body.inputPW) ||
        req.body.inputID == undefined || req.body.inputPW == undefined ||
        req.body.inputID == " " || req.body.inputPW == " "||
        req.body.inputID == null || req.body.inputPW == null){
        res.send("<script>alert('잘못된 값을 입력하셨습니다.'); history.go(-1);</script>")
    }else{
        var parameters = {
            "user_id": req.body.inputID,
            "user_pw" : req.body.inputPW
        }
    
        userInfoDAO.userInfoFunc.search_UserDetail(parameters).then(
            (db_data) => {
                if(db_data[0] != undefined){
                    const token = jwt.sign({
                        user_id: db_data[0].user_id,
                        user_name: db_data[0].user_name,
                        user_email: db_data[0].user_email,
                    }, process.env.JWT_SECRET, {
                        expiresIn: '1m',
                        issuer: 'Conative',
                    });
                    res.cookie("user", token);
                    res.redirect("/")
                }else{
                    res.send("<script>alert('JWT is wrong...');history.go(-1);</script>")
                }
            }
        ).catch(err=>res.send("<script>alert('"+ err +"');history.go(-1);</script>"))
    }    
}

function logOut(req, res, next) {
    let token = req.cookies.user;
    res.clearCookie('user');
    res.redirect('/');
}
module.exports.authFunc = {
    signIn,
    checkUser,
    logOut
}
'use strict';

// var jwt = require('jsonwebtoken');
var jwtmiddle = require('../middleware/jwt');
var userInfoDAO = require('../model/userInfoDAO');

function signIn(req, res, next) {
    let token = req.cookies.user;
    res.clearCookie('user');
    res.render('auth/signIn');
}

function checkUser(req, res, next) {
    var special_pattern = /[` ~!@#$%^&*|\\\'\";:\/?]/gi;

    if (special_pattern.test(req.body.inputID) || special_pattern.test(req.body.inputPW) ||
        req.body.inputID == undefined || req.body.inputPW == undefined ||
        req.body.inputID == " " || req.body.inputPW == " " ||
        req.body.inputID == null || req.body.inputPW == null) {
        res.send("<script>alert('잘못된 값을 입력하셨습니다.'); history.go(-1);</script>")
    } else {
        var parameters = {
            "user_id": req.body.inputID,
            "user_pw": req.body.inputPW
        }

        userInfoDAO.search_UserDetail(parameters).then(
            (db_data) => {
                if (db_data[0] != undefined) {
                    var userData = {
                        user_id: db_data[0].user_id,
                        user_name_ko: db_data[0].user_name_ko,
                        user_email: db_data[0].user_email,
                    }
                    jwtmiddle.jwtCreate(userData).then(
                        (token) => {
                            res.cookie("user", token);
                            res.redirect("/")
                        }
                    ).catch(err => res.send("<script>alert('jwt err');</script>"));
                } else {
                    res.send("<script>alert('JWT is wrong...');history.go(-1);</script>")
                }
            }
        ).catch(err => res.send("<script>alert('" + err + "');history.go(-1);</script>"))
    }
}

function revise_check(req, res, next) {
    let token = req.cookies.user;
    jwtmiddle.jwtCerti(token).then(
        (permission) => {
            res.render('auth/revise_check', { permission });
        }
    ).catch(err => res.send("<script>alert('jwt err');</script>"));
}

function revise_check_post(req, res, next) {
    let token = req.cookies.user;
    jwtmiddle.jwtCerti(token).then(
        (permission) => {
            if (permission != false) {
                console.log(permission.user_id)
                var parameters = {
                    "user_id": permission.user_id,
                    "user_pw": req.body.inputPW
                }
                userInfoDAO.search_UserDetail(parameters).then(
                    (db_data) => {
                        res.render('auth/revise', { db_data, permission });
                    }
                ).catch(err => res.send("<script>alert('" + err + "');location.href='/auth/revise_check';</script>"))
            }
            else
                res.send("<script>alert('세션이 만료되었습니다.'); location.href='/'; </script>")
        }
    ).catch(err => res.send("<script>alert('jwt err');</script>"));
}

function updateUser(req, res, next) {
    console.log("완벽허이..")
}
//우성아 이 부분 수정
function signUp(req, res, next) {
        res.render('auth/signUp');
    
}

function logOut(req, res, next) {
    let token = req.cookies.user;
    res.clearCookie('user');
    res.redirect('/');
}

module.exports = {
    signUp,
    signIn,
    checkUser,
    revise_check,
    revise_check_post,
    updateUser,
    logOut
}
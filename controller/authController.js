'use strict';

// var jwt = require('jsonwebtoken');
var jwtmiddle = require('../middleware/jwt');
var userInfoDAO = require('../model/userInfoDAO');
var authDAO = require('../model/authDAO');

function signIn(req, res, next) {
    let token = req.cookies.user;
    var userId = "";
    if(token !== undefined) {
        return res.send("<script>alert('접근할수 없습니다.'); location.href='/'; </script>")
    }
    if (req.cookies['loginId'] !== undefined) {
        console.log("로그인 정보 있음");
        userId = req.cookies['loginId'];
    }
    res.render('auth/signIn', { userId: userId });
}

function checkUser(req, res, next) {
    var special_pattern = /[` ~!@#$%^&*|\\\'\";:\/?]/gi;
    if (special_pattern.test(req.body.inputID) ||
        req.body.inputID == undefined || req.body.inputPW == undefined ||
        req.body.inputID == " " || req.body.inputPW == " " ||
        req.body.inputID == null || req.body.inputPW == null) {
        res.send("<script>alert('잘못된 값을 입력하셨습니다.'); history.go(-1);</script>")
    } else {
        var parameters = {
            "userId": req.body.inputID,
            "userPw": req.body.inputPW
        }
        authDAO.checkUser(parameters).then(
            (db_data) => {
                if (db_data[0] != undefined) {
                    var userData = {
                        userId: db_data[0].userId,
                        userName: db_data[0].userName,
                        userEmail: db_data[0].userEmail,
                    }
                    jwtmiddle.jwtCreate(userData).then(
                        (token) => {
                            if (req.body.rememberId === "checked") {
                                console.log("아이디 저장 체크!");
                                res.cookie('loginId', req.body.inputID);
                            } else {
                                console.log("아이디 저장 해제");
                                res.clearCookie('loginId')
                            }
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
                var parameters = {
                    "userId": permission.userId,
                    "userPw": req.body.inputPW
                }
                authDAO.checkUser(parameters).then(
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
    let token = req.cookies.user
    if(req.body.inputPw.length < 6){
        return res.send("<script>alert('비밀번호를 6자 이상 입력해주세요.'); history.go(-1);</script>")
    }
    if(req.body.inputPw !== req.body.checkPw){
        return res.send("<script>alert('비밀번호가 일치하지 않습니다.'); history.go(-1);</script>")
    }
    jwtmiddle.jwtCerti(token).then(
        (permission) => {
            const parameters ={
                userId:permission.userId,
                userPw:req.body.inputPw,
                userName:req.body.inputName,
                userEmail:req.body.userEmail,
                userNameEN:req.body.inputNameEN,
                userPhone:req.body.inputPhone,
                userAdd:req.body.inputAdd,
            }
            authDAO.updateToUser(parameters).then(
                () => {
                    res.redirect("/auth/logout")
                }
            ).catch(err => res.send("<script>alert('jwt err');history.go(-1);</script>"))
        }
    )
}
//우성아 이 부분 수정
function signUp(req, res, next) {
    let token = req.cookies.user;
    
    if(token !== undefined) {
        return res.send("<script>alert('접근할수 없습니다.'); location.href='/'; </script>")
    }
    res.render('auth/signUp');
}
function signUpPost(req, res, next){
    if(!isNaN(req.body.inputID)){
        return res.send("<script>alert('잘못된 아이디 값을 입력하셨습니다.'); history.go(-1);</script>")
    }
    if(req.body.inputPW.length < 6){
        return res.send("<script>alert('비밀번호를 6자 이상 입력해주세요.'); history.go(-1);</script>")
    }
    if(req.body.inputPW !== req.body.Pwcheck){
        return res.send("<script>alert('비밀번호가 일치하지 않습니다..'); history.go(-1);</script>")
    }
    let parameters = {
        userId:req.body.inputID,
        userPw:req.body.inputPW,
        userName:req.body.Name,
        userEmail:req.body.Email,
    }
    authDAO.insertUser(parameters).then(
        ()=>{
            res.redirect('/auth/sign/in')
        }
    ).catch(err => res.send("<script>alert('jwt err');</script>"))
}

function logOut(req, res, next) {
    let token = req.cookies.user;
    res.clearCookie('user');
    res.redirect('/');
}

module.exports = {
    signUp,
    signUpPost,
    signIn,
    checkUser,
    revise_check,
    revise_check_post,
    updateUser,
    logOut
}
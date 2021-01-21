var jwt = require('jsonwebtoken');
// var generateToken = require('../middleware/jwt');
var userInfoDAO = require('../model/userInfoDAO');

function signIn(req, res, next) {
    res.render('auth/signIn');
}

function checkUser(req, res, next) {
    if(req.body.inputID == undefined || req.body.inputPW == undefined ||
        req.body.inputID == "" || req.body.inputPW == ""||
        req.body.inputID == null || req.body.inputPW == null){
        res.send("<script>잘못된 값을 입력하셨습니다.</script>")
    }
    var parameters = {
        "user_id": req.body.inputID,
        "user_pw" : req.body.inputPW
    }

    userInfoDAO.userInfoFunc.search_UserDetail(parameters).then(
        (db_data) => {
            // passport.authenticate(
            //     "register",
            //     { session: false },
            //     (err, user, info) => {
            //       if (err) {
            //         res.status(400);
            //       } else if (!user) {
            //         res.status(200).send("이미 가입된 이메일입니다.");
            //       } else {
            //         res.status(200).send("정상적으로 회원가입 되었습니다.");
            //       }
            //     }
            //   )
            const token = jwt.sign({
                user_id: "asdf",
                email: "asdfa",
                nick: "asdfaa"
            }, process.env.JWT_SECRET, {
                expiresIn: '1m',
                issuer: 'nodebird',
            });

            if(db_data[0] != undefined){
                res.cookie("user", token);
                res.redirect("/")
            }else{
                res.send("nn")
            }
        }
    ).catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))
}


module.exports.authFunc = {
    signIn,
    checkUser
}
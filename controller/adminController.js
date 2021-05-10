'use strict';

const db = require('../config/kyjDB');
var jwtmiddle = require('../middleware/jwt');
var boardDAO = require('../model/boardDAO');

function adminMain(req, res, next) {
    var db_data;
    boardDAO.count_questionBoard()
    .then((recv_data) => {db_data = recv_data;})
    .then(
        ()=>{
            console.log("db_data : " + db_data)
            let token = req.cookies.user;
            jwtmiddle.jwtCerti(token).then(
                (permission)=>{
                    res.render('admin/adminMain', { db_data, permission});
                }
            ).catch(err=>res.send("<script>alert('jwt err');</script>"));
        }
    )
    .catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))

}
module.exports = {
    adminMain
}
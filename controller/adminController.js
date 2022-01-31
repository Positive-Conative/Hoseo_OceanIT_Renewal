'use strict';

var jwtmiddle = require('../middleware/jwt');
var boardDAO = require('../model/boardDAO');
var counterDAO = require('../model/counterDAO')

// function adminMain(req, res, next) {
//     var queryType = req.query.type;
//     var queryPage = req.query.page;
//     var parameters = {
//         "type": queryType,
//         "page": queryPage,
//         "name": 'vistors'
//     }
//     var db_values = {};
//     Promise.resolve(db_values)
//         .then(
//             (db_values) => {
//                 return boardDAO.count_questionBoard()
//                     .then((recv_data) => { db_values.recv_data = recv_data; })
//                     .then(() => { return db_values })
//             }
//         )
//         .then(
//             (db_values) => {
//                 return counterDAO.findCount(parameters)
//                     .then((countData) => { db_values.countData = countData; })
//                     .then(() => { return db_values })
//             }
//         )
//         .then(
//             () => {
//                 let token = req.session.user;
//                 jwtmiddle.jwtCerti(token).then(
//                     (permission) => {
//                         res.render('admin/adminMain', {
//                             countData: db_values["countData"],
//                             recv_data: db_values["recv_data"],
//                             db_values,
//                             permission
//                         });
//                     }
//                 ).catch(err => res.send("<script>alert('jwt err');</script>"));
//             }
//         ).catch(err => res.send("<script>alert('" + err + "');location.href='/'"))
// }

async function adminMain(req, res, next) {
    let token = req.session.user;
    let parameters ={
        "name" : 'vistors'
    }
    try {
        const count_data = await counterDAO.findCount(parameters);
        const permission = await jwtmiddle.jwtCerti(token);
        if(permission.userRole==0) return res.render('admin/adminMain',{count_data, permission});
        else throw "권한이없습니다"
    } catch (error) {
        res.send("<script>alert('" + error + "');location.href='/';</script>")
    }
}

module.exports = {
    adminMain
}
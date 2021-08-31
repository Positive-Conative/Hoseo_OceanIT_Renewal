'use strict';

var jwtmiddle = require('../middleware/jwt');
var boardDAO = require('../model/boardDAO');
var counterDAO = require('../model/counterDAO')

function adminMain(req, res, next) {
    var queryType = req.query.type;
    var queryPage = req.query.page;
    var parameters = {
        "type": queryType,
        "page": queryPage,
        "name": 'vistors'
    }
    var db_values = {};
    Promise.resolve(db_values)
        .then(
            (db_values) => {
                return boardDAO.count_questionBoard()
                    .then((recv_data) => { db_values.recv_data = recv_data; })
                    .then(() => { return db_values })
            }
        )
        .then(
            (db_values) => {
                return counterDAO.findCount(parameters)
                    .then((countData) => { db_values.countData = countData; })
                    .then(() => { return db_values })
            }
        )
        .then(
            () => {
                let token = req.cookies.user;
                jwtmiddle.jwtCerti(token).then(
                    (permission) => {
                        res.render('admin/adminMain', {
                            countData: db_values["countData"],
                            recv_data: db_values["recv_data"],
                            db_values,
                            permission
                        });
                    }
                ).catch(err => res.send("<script>alert('jwt err');</script>"));
            }
        ).catch(err => res.send("<script>alert('" + err + "');location.href='/'"))
}
module.exports = {
    adminMain
}
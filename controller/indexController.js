'use strict';

var jwtmiddle = require('../middleware/jwt');
var memberDAO = require('../model/memberDAO');
var researchFieldsDAO = require('../model/researchFieldsDAO');
var researchResultsDAO = require('../model/researchResultsDAO');
var counterDAO = require('../model/counterDAO')

function indexMain(req, res, next) {
  let token = req.cookies.user;
  var parameters = {
    "name": 'vistors'
  }
  return counterDAO.findCount(parameters).then(
    (db_data) => {
      jwtmiddle.jwtCerti(token).then(
        (permission) => {
          console.log(db_data)
          res.render('index', { permission, db_data });
        }
      )
    }
  )
}


module.exports = {
  indexMain
}
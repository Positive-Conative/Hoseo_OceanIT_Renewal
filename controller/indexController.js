'use strict';

var jwtmiddle = require('../middleware/jwt');
var memberDAO = require('../model/memberDAO');
var researchFieldsDAO = require('../model/researchFieldsDAO');
var researchResultsDAO = require('../model/researchResultsDAO');

function indexMain(req, res, next) {
  let token = req.cookies.user;
  return jwtmiddle.jwtCerti(token).then(
    (permission) => {
      res.render('index', { permission });
    }
  )
}
module.exports = {
  indexMain
}
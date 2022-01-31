'use strict';

var jwtmiddle = require('../middleware/jwt');
var memberDAO = require('../model/memberDAO');
var researchFieldsDAO = require('../model/researchFieldsDAO');
var researchResultsDAO = require('../model/researchResultsDAO');
var counterDAO = require('../model/counterDAO')

function indexMain(req, res, next) {
  let token = req.session.user;
  jwtmiddle.jwtCerti(token).then(
    (permission) => {
       res.render('index', { permission });
    }
  )
}

module.exports = {
  indexMain
}
'use strict';

var jwtmiddle = require('../middleware/jwt');
var memberDAO = require('../model/memberDAO');
var researchFieldsDAO = require('../model/researchFieldsDAO');
var researchResultsDAO = require('../model/researchResultsDAO');
var boardDAO = require('../model/boardDAO');
var counterDAO = require('../model/counterDAO')

function indexMain(req, res, next) {
  let token = req.session.user;
  jwtmiddle.jwtCerti(token).then(
    (permission) => {
       res.render('index', { permission });
    }
  )
}
async function indexMainApp(req, res, next){
  let token = req.get('token')
  try {
    const permission = await jwtmiddle.jwtCerti(token)
    const fields_data = await researchFieldsDAO.researchFields_MainApp()
    const results_data = await researchResultsDAO.researchResults_MainApp()
    const notice_data = await boardDAO.count_noticeBoardApp()
    res.json({
      "permission": permission,
      "notice_data": notice_data,
      "fields_data": fields_data,
      "results_data": results_data
    })
  } catch (error) {
    res.status(403).json({"message" : error})
  } 
}

module.exports = {
  indexMain,
  indexMainApp
}
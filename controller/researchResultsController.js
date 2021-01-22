'use strict';
 
var jwtmiddle = require('../middleware/jwt');
var researchResultsDAO = require('../model/researchResultsDAO');

function researchResults(req, res, next) {
    researchResultsDAO.researchResultsFunc.researchFields_selectAll().then(
        (db_data) => {
            let token = req.cookies.user;
            jwtmiddle.jwtModule.jwtCerti(token).then(
                (permission)=>{
                    res.render('research_results/researchResultsMain', { db_data, permission});
                }
            ).catch(err=>res.send("<script>alert('jwt err');</script>"));
        }
    ).catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))
}

module.exports.researchResultsFunc = {
    researchResults
}
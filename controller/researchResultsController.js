 var researchResultsDAO = require('../model/researchResultsDAO');

function researchResults(req, res, next) {
    researchResultsDAO.researchResultsFunc.researchFields_selectAll().then(
        (db_data) => {
            //console.log(db_data);
            res.render('research_results/researchResultsMain', { db_data });
        }
    ).catch(err=>res.send("<script>alert('"+ err +"');location.href='/';</script>"))
}

module.exports.researchResultsFunc = {
    researchResults
}
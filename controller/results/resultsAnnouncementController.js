'use strict';

var dayjs = require('dayjs');
var jwtmiddle = require('../../middleware/jwt');
var researchResultsDAO = require('../../model/researchResultsDAO');
var counterDAO = require('../../model/counterDAO')

// Announcement
async function researchResultsAnnouncement(req, res, next) {
    let token = req.session.user;
    var queryPage = req.query.page;
    var querySearch = req.query.schKeyword;
    var parameters = {
        "type": 'announcement',
        "page": queryPage,
        "search": querySearch,
        "name": 'vistors'
    }
    try {
        const permission = await jwtmiddle.jwtCerti(token);
        const count_data = await counterDAO.findCount(parameters);
        const db_data = await researchResultsDAO.researchResults_selectAnnouncement(parameters)
        res.render('research_results/researchResultsMain', { db_data, permission, parameters, dayjs, count_data });
    } catch (error) {
        res.send("<script>alert('" + error + "');location.href='/';</script>")
    }
}
async function researchResultsAnnouncementWrite(req, res, next) {
    try {
        let parameters = {
            "name": 'vistors'
        }
        let token = req.session.user;
        if (token == undefined) throw "Parameter ERR."
        const permission = await jwtmiddle.jwtCerti(token)
        if (permission.userRole >= 5) throw "권한이없습니다."
        const count_data = await counterDAO.findCount(parameters);
        res.render('research_results/researchResultsWriteAnnouncement',{count_data,permission})
    } catch (error) {
        res.send("<script>alert('" + error + "');location.href='/';</script>")
    }
}
async function researchResultsAnnouncementDetail(req, res, next) {
    let token = req.session.user;
    var queryNum = req.query.num;
    var parameters = {
        "rrid": queryNum,
        "name": 'vistors'
    };
    try {
        const permission = await jwtmiddle.jwtCerti(token);
        const count_data = await counterDAO.findCount(parameters);
        const db_data = await researchResultsDAO.researchResults_selectDetailAnnouncement(parameters);
        res.render('research_results/researchResultsDetailAnnouncement', { db_data, permission, parameters, dayjs, count_data });
    } catch (error) {
        res.send("<script>alert('" + error + "');location.href='/';</script>")
    }
}
async function researchResultsAnnouncementUpdate(req, res, next) {
    try {
        let token = req.session.user
        let queryNum = req.query.num;
        let parameters = {
            "rrid": queryNum,
            "name": 'vistors'
        }
        if (token == undefined) throw "Parameter ERR."
        const permission = await jwtmiddle.jwtCerti(token)
        if (permission.userRole >= 5) throw "권한이없습니다."
        const count_data = await counterDAO.findCount(parameters);
        const db_data = await researchResultsDAO.researchResults_selectDetailAnnouncement(parameters);
        console.log(db_data)
        res.render('research_results/researchResultsModifyAnnouncement', { db_data, count_data, permission })
    } catch (error) {
        res.send("<script>alert('" + error + "');location.href='/';</script>")
    }
}
async function researchResultsAnnouncementDelete(req, res, next){
    try {
        let token = req.session.user
        let queryNum = req.query.num;
        let parameters = {
            "rrid": queryNum,
        }
        if (token == undefined) throw "Parameter ERR."
        const permission = await jwtmiddle.jwtCerti(token)
        if (permission.userRole >= 5) throw "권한이없습니다."
        const db_data = await researchResultsDAO.researchResults_DeleteAnnouncement(parameters);
        res.redirect('/research/results/announcement?schKeyword=&page=1');
    } catch (error) {
        res.send("<script>alert('" + error + "');location.href='/';</script>")
    }
}

async function researchResultsAnnouncementWriteP(req,res,next){
    try {
        let parameters = {
            "group_id":req.body.group,
            "announe_nation_ko":req.body.announe_nation_ko,
            "title_ko": req.body.title_ko,
            "writer_ko": req.body.writer_ko,
            // "할술대회명?": req.body.?,
            "classify_ko":req.body.classify_ko,
        }
        let token = req.session.user;
        if (token == undefined) throw "Parameter ERR."
        const permission = await jwtmiddle.jwtCerti(token)
        if (permission.userRole >= 5) throw "권한이없습니다."
    } catch (error) {
        
    }
}
module.exports = {
    researchResultsAnnouncement,
    researchResultsAnnouncementWrite,
    researchResultsAnnouncementDetail,
    researchResultsAnnouncementUpdate,
    researchResultsAnnouncementDelete,
    // researchResultsAnnouncementWriteP
}
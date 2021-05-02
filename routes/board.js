'use strict';
var express = require('express');
var router = express.Router();
var boardController = require('../controller/boardController');

//공지사항 게시판
router.get('/notice', boardController.noticeMain);
router.get('/notice/noticeWrite', boardController.noticeWrite);
router.post('/notice/noticeWrite', boardController.noticeWritePost);
/*router.post('/notice/noticeWrite', function (req, res){
    let token = req.cookies.user;
    var content = req.body.content;
    var title = req.body.title;
    console.log(req.body);
    jwtmiddle.jwtCerti(token).then(
        (permission) => {
            var date = new dayjs();
            var datetime = date.format('YYYY-MM-DD');
            var user_id = permission.user_id;
            console.log("title : " + title)
            console.log("content : " + content);
            var datas = {user_id:user_id, title:title, content:content, date:datetime};
            db.query('INSERT INTO Notice_Board SET ?', datas, function (error, row) {
                console.log("db_data : " + row)
                if (error) { throw error; }
                else { res.redirect("/board/notice"); }
            })
        }
    ).catch(err => res.send("<script>alert('jwt err');</script>"));
})*/

//문의게시판(1:1)
router.get('/inquiry', boardController.inquiryMain);
router.get('/inquiry/inquiryWrite', boardController.inquiryWrite);
//router.post('/inquiry/inquiryWrite',boardController.inquiryWritePost);

// 자유게시판
router.get('/free', boardController.freeBoardMain);
router.get('/free/freeBoardWrite', boardController.freeBoardWrite);
//router.post('/free/freeBoardWrite',boardController.freeBoardWritePost);


module.exports = router;

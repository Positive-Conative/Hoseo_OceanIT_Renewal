var express = require('express');
var router = express.Router();

var member = require('../controller/member/member');

//researchFields
router.get('/', member.memberFunc.memberMain);

module.exports = router;
'use strict';
var express = require('express');
var router = express.Router();

var authController = require('../controller/authController');

// sign in
router.get('/sign/in', authController.authFunc.signIn);
router.post('/sign/in', authController.authFunc.checkUser);

// update info (check)
router.get('/revise_check', authController.authFunc.revise_check);


// logout
router.get('/logout', authController.authFunc.logOut);


// sign up
// router.get('/sign/up', authController.authFunc.signUp);
module.exports = router;
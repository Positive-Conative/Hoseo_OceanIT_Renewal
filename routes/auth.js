'use strict';
var express = require('express');
var router = express.Router();

var authController = require('../controller/authController');

// sign in
router.get('/sign/in', authController.authFunc.signIn);
router.post('/sign/in', authController.authFunc.checkUser);

// update info (check)
router.get('/revise_check', authController.authFunc.revise_check);
router.post('/revise_check', authController.authFunc.revise_check_post);

// update info
router.post('/revise', authController.authFunc.updateUser);


// logout
router.get('/logout', authController.authFunc.logOut);


// sign up
// router.get('/sign/up', authController.authFunc.signUp);
module.exports = router;
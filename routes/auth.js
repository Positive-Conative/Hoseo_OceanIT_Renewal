'use strict';

var express = require('express');
var router = express.Router();

var authController = require('../controller/authController');

// sign in
router.get('/sign/in', authController.signIn);
router.post('/sign/in', authController.checkUser);

// update info (check)
router.get('/revise_check', authController.revise_check);
router.post('/revise_check', authController.revise_check_post);

// update info
router.post('/revise', authController.updateUser);


// logout
router.get('/logout', authController.logOut);


// sign up
// router.get('/sign/up', authController.authFunc.signUp);
module.exports = router;
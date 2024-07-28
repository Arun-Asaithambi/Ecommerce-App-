const express = require('express');
const router = express.Router();
const{registerUser, loginUser, logout, forgotPassword, resetPassword} = require("../controlles/authController");

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').post(resetPassword);

module.exports = router; 
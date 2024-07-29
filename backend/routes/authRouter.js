const express = require('express');
const router = express.Router();
const{registerUser, loginUser, logout, forgotPassword, resetPassword, 
    getUserProfile, changePassword, updateProfile,
    getAllUsers, getUser, updateUser, deleteUser} = require("../controlles/authController");
const {isAuthenticatedUser, AuthorizationRole} = require("../middleware/authenticate");


router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logout);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').post(resetPassword);
//user crud operation
router.route('/myProfile').get(isAuthenticatedUser, getUserProfile);
router.route('/password/change').put(isAuthenticatedUser, changePassword);
router.route('/update').put(isAuthenticatedUser, updateProfile);
//admin crud operation
router.route('/admin/users').get(isAuthenticatedUser, AuthorizationRole('admin'), getAllUsers);
router.route('/admin/user/:id').get(isAuthenticatedUser, AuthorizationRole('admin'), getUser)
                               .put(isAuthenticatedUser, AuthorizationRole('admin'), updateUser)
                               .delete(isAuthenticatedUser, AuthorizationRole('admin'), deleteUser);


module.exports = router; 
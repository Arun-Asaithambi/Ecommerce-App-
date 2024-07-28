const express = require('express');
const router = express.Router();
const {getProducts,getProduct, createProduct, updateProduct, deleteProduct} = require ('../controlles/controller')
const {isAuthenticatedUser, AuthorizationRole} = require("../middleware/authenticate");


router.route('/').get(isAuthenticatedUser, getProducts);
router.route('/product/create').post(isAuthenticatedUser, AuthorizationRole("admin"), createProduct);
router.route('/product/:id')
            .get(getProduct)
            .put(isAuthenticatedUser, AuthorizationRole("admin"),updateProduct)
            .delete(isAuthenticatedUser, AuthorizationRole("admin"),deleteProduct)

module.exports = router;
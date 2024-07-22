const express = require('express');
const router = express.Router();
 const {getProducts,getProduct, createProduct, updateProduct, deleteProduct} = require ('../controlles/controller')

router.route('/').get(getProducts);
router.route('/create').post(createProduct);
router.route('/product/:id')
            .get(getProduct)
            .put(updateProduct)
            .delete(deleteProduct)

module.exports = router;
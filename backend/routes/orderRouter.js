const express = require ('express');
const router = express.Router();
const {newOrder, getSingleOrder, myOrders, orders, update, deleteOrder} = require("../controlles/orderController");
const {isAuthenticatedUser, AuthorizationRole} = require("../middleware/authenticate");


router.route("/new").post(isAuthenticatedUser, newOrder);
router.route("/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/myOrders").get(isAuthenticatedUser, myOrders);
//Admin
router.route("/orders").get(isAuthenticatedUser, AuthorizationRole('admin'), orders);
router.route("/:id").put(isAuthenticatedUser, AuthorizationRole('admin'), update);
router.route("/:id").delete(isAuthenticatedUser, AuthorizationRole('admin'), deleteOrder);


module.exports = router;
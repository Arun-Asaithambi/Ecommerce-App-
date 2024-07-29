const Order = require ("../models/order");
const catchAsyncErrors = require ("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
 

//create new order
exports.newOrder = catchAsyncErrors(async (req, res, next) =>{
    const {shippingInfo, orderItems, itemsPrice, taxPrice, shippingPrice, totalPrice, } = req.body;
    const order = await Order.create({
        shippingInfo, orderItems,
        itemsPrice, taxPrice, 
        shippingPrice, totalPrice, 
        paidAt: Date.now(),
        user: req.user.id,

    })

    res.status(200).json({order})
});

//get single order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) =>{
    // const order = await Order.findById(req.params.id).populate('user', 'username email');
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler(`order not found with this id ${req.params.id}`, 404))
    }
    res.status(200).json({order})
});

//get all orders for logged user
exports.myOrders = catchAsyncErrors(async (req, res, next) =>{
    const orders = await Order.find({user: req.user.id});
    res.status(200).json({orders})
});

//admin: get all users order
exports.orders = catchAsyncErrors(async (req, res, next) =>{
    const orders = await Order.find();

    let totalAmount =  0;
    orders.forEach(order =>{
        totalAmount += order.totalPrice
    })

    res.status(200).json({totalAmount, orders})
});
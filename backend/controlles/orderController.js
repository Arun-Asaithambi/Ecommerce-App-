const Order = require ("../models/order");
const catchAsyncErrors = require ("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const Product = require ('../models/Schema');
 

//create new order
exports.newOrder = catchAsyncErrors(async (req, res, next) =>{
    const {shippingInfo, orderItems, itemsPrice, taxPrice, shippingPrice, totalPrice} = req.body;
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
    const order = await Order.findById(req.params.id).populate('user', 'username email');
    if(!order) {
        return next(new ErrorHandler(`Order not found with this id: ${req.params.id}`, 404))
    }
    res.status(200).json({
        success: true,
        order
    })
});

//get all orders for logged user
exports.myOrders = catchAsyncErrors(async (req, res, next) =>{
    const orders = await Order.find({user: req.user.id});
    res.status(200).json({
        success: true,
        orders
    })
});

//admin: get all users order
exports.orders = catchAsyncErrors(async (req, res, next) =>{
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach(order => {
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
});

//admin: update order
exports.update =  catchAsyncErrors(async (req, res, next) =>{
    const order = await Order.findById(req.params.id);

    if(order.orderStatus == 'Delivered') {
        return next(new ErrorHandler('Order has been already delivered!', 400))
    }
    //Updating the product stock of each order item
    order.orderItems.forEach(async orderItem => {
        await updateStock(orderItem.product, orderItem.quantity)
    })

    order.orderStatus = req.body.orderStatus;
    order.deliveredAt = Date.now();
    await order.save();

    res.status(200).json({
        success: true
    })

});

async function updateStock(productId, quantity){
    const product = Product.findById(productId);
    product.stock = product.stock - quantity;
    product.save({validateBeforeSave: false})
}

//admin: delete order
exports.deleteOrder = catchAsyncErrors(async (req, res, next) =>{
    const order = await Order.findById(req.params.id);
    if(!order){
        return next(new ErrorHandler(`order not found with this id ${req.params.id}`, 404))
    } 
    await order.deleteOne();
    res.status(200).json({sucess: true})
});
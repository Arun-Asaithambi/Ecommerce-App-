const Products = require ('../models/Schema');
const ErrorHandler = require("../utils/errorHandler");
const errors = require("../middleware/errors");
const catchAsyncErrors = require ("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/api");


//get products
exports.getProducts = catchAsyncErrors(async(req, res, next) =>{
    const resPerPage = 2;
    const api = new ApiFeatures(Products.find(), req.query).search().filter().paginate(resPerPage);
    const product = await api.query;
        res.status(200).json({
        count:product.length,
        product 
    })
});

//get sindle  product
exports.getProduct = catchAsyncErrors(async (req, res, next) =>{
        const {id} = req.params;
        const product = await Products.findById(id);
            if(!product){
                return next(new ErrorHandler("product not found", 400))
            }
        res.status(200).json(product)
});

//create new products
exports.createProduct = catchAsyncErrors(async(req, res, next) =>{

        req.body.user = req.user.id;
        const product = await Products.create(req.body);
        res.status(200).json(product);
});

//update product 
exports.updateProduct = catchAsyncErrors(async(req, res, next) =>{
        let product = await Products.findById(req.params.id);
            if(!product){
               return next(new ErrorHandler("product not found", 400))
            }
        product = await Products.findByIdAndUpdate(req.params.id, req.body, {new:true, runValidators:true});
        res.status(200).json(product)
});

//delete product
exports.deleteProduct = catchAsyncErrors(async(req, res, next) =>{
        const product = await Products.findByIdAndDelete(req.params.id);
        if(!product){
            return next(new ErrorHandler("product not found", 400)) 
        }
        res.status(200).json(product)
});
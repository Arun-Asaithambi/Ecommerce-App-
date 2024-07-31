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
        res.status(200).json({
            message: "product deleted"
        })
});



// Create Review
exports.createReview = catchAsyncErrors(async (req, res, next) =>{
    const  { productId, rating, comment } = req.body;
    const review = {
        user : req.user.id,
        rating,
        comment
    }

    const product = await Products.findById(productId);
   //finding user review exists
    const isReviewed = product.reviews.find(review => {
       return review.user.toString() == req.user.id.toString()
    })

    if(isReviewed){
        //updating the  review
        product.reviews.forEach(review => {
            if(review.user.toString() == req.user.id.toString()){
                review.comment = comment
                review.rating = rating}
            })
    }else{
        //creating the review
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }
    //find the average of the product reviews
    product.ratings = product.reviews.reduce((acc, review) => {
            return review.rating + acc;
        }, 0) / product.reviews.length;
    product.ratings = isNaN(product.ratings)?0:product.ratings;
    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success: true
    })
});

//Get reviews

//Get Reviews 
exports.getReviews = catchAsyncErrors(async (req, res, next) =>{
    const product = await Products.findById(req.query.id).populate('reviews.user','username email');
    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

//Delete Review 
exports.deleteReview = catchAsyncErrors(async (req, res, next) =>{
    const product = await Products.findById(req.query.productId);
    
    //filtering the reviews which does match the deleting review id
    const reviews = product.reviews.filter(review => {
       return review._id.toString() !== req.query.id.toString()
    });
    //number of reviews  
    const numOfReviews = reviews.length;

    //finding the average with the filtered reviews
    let ratings = reviews.reduce((acc, review) => {
        return review.rating + acc;
    }, 0) / reviews.length;
    ratings = isNaN(ratings)?0:ratings;

    //save the product document
    await Products.findByIdAndUpdate(req.query.productId, {
        reviews,
        numOfReviews,
        ratings
    })
    res.status(200).json({
        success: true
    })
});

// get admin products  
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) =>{
    const products = await Products.find();
    res.status(200).send({
        success: true,
        products
    })
});



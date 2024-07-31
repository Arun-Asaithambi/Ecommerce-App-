const mongoose = require ("mongoose");
const Schema = mongoose.Schema;

const productSchema = Schema({
    name:{
        type:String,
        required:[true, "please enter product name"],
        trim:true,
        maxlength:[100, "product name must be less than 100 characters"]
    },
    price:{
        type:Number,
        default: 0.0
    },
    description:{
        type:String,
        required:[true, "please enter product description"]
    },
    ratings:{
        type:String,
        default: 0  
    },
    images:[{
            image:{
                type:String,
                required:true
            }   
        }],
    category: {
        type:String,
        required:[true, "please enter product catogery"],
        enum: {
            values:[
                'Laptops',
                'foods',
                'Smartphones',
                'Cameras',
                'Headphones',
                'Gaming',
                'TV',
                'Fashion',
                'Books',
                'Clothes' ,
                'Mobile Phones',
                "Accessories",
                "Sports"
            ],
            message: "please select correct category"
        }
    },
    seller:{
        type:String,
        required:[true, "please enter product seller"]
    },
    stock:{
        type:Number,
        required:[true, "please enter product stock"],
    },
    reviews:[{
        user:mongoose.Schema.Types.ObjectId,
        rating:{
            type:String,
            required: true
        },
        comment:{
            type:String,
            required: true
        }
    }], 
    numOfReviews:{
        type:Number,
        default:0
    },
    user:{
        type:mongoose.Schema.Types.ObjectId 
    },
    createAt:{
        type: Date,
        default: Date.now
    }

})

module.exports = mongoose.model("Product", productSchema);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = Schema({
    shippingInfo: {
        address:{
            type: String,
            required: true
        },
        country:{
            type: String,
            required: true
        },
        city:{
            type: String,
            required: true
        },
        phoneNo:{
            type: String,
            required: true
        },
        postalCode:{
            type: String,
            required: true
        },
        
    },
    user:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    orderItems:[{
        name:{
            type: String,
            required: true
        },
        quantity:{
            type: Number,
            required: true
        },
        image:{
            type: String,
            required: true
        },
        price:{
            type: Number,
            required: true
        },
        product:{
            type: Schema.Types.ObjectId,
            required: true
        }
    }],
    itemsPrice:{
        type: String,
        required: true,
        default: 0.0
    },
    taxPrice:{
        type: Number,
        required: true
    },
    // paymentInfo:{},
    shippingPrice:{
        type: Number,
        required: true,
        default: 0.0
    },
    totalPrice:{
        type: Number,
        required: true,
        default: 0.0
    },
    paidAt:{
        type: Date
    },
    deliverAt:{
        type: Date
    },
    orderStatus:{
        type: String,
        required: true,
        default: "processing"
    },
    createAt:{
        type: Date,
        default: Date.now
    }
    
})

module.exports  = mongoose.model("Order", orderSchema);

// {
//     "shippingInfo": {
//             "address": "chennai",
//             "country": "India",
//             "city": "chennai",
//             "phoneNo": "6380575537",
//             "postalCode": "613001"
//         },
//         "orderItems": [
//             {
//                 "name": "Oppo",
//                 "quantity": 1,
//                 "image": "product.image",
//                 "price": 15.46,
//                 "product": "6697d0c5e85ee9004be50e5a"
//             }
//         ],
//         "itemsPrice": "568",
//         "taxPrice": 0.14,
//         "shippingPrice": 25,
//         "totalPrice": 456
// }
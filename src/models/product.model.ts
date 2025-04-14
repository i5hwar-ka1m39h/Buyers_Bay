import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        max:[50, "max character count is 50"]
    },
    desciption:{
        type:String,
    },
    price:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        default:0
    },
    stockCount:{
        type:Number,
        default:0
    },
    category:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'Category'
    },
    vendorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Vendor'
    },
    imgUrl:{
        type:String,
        required:true,
        default:'//'
    }
}, {timestamps:true});

export const Product = mongoose.model('Product', productSchema)
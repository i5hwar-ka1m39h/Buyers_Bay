import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:[50, "max character count is 50"],
        index:true
    },
    description:{
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
        default:'https://'
    }
}, {timestamps:true});

productSchema.plugin(mongooseAggregatePaginate)
export const Product = mongoose.model('Product', productSchema)
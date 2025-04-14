import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:String,
    },
    address:{
        line1:{type:String, requied:true},
        line2:{type:String},
        city:{type:String, required:true},
        state:{type:String, required:true},
        country:{type:String, required:true},
        zipCode:{types:String, required:true},
    },
    totalProductCount:{
        type:Number,
        default:0
    },
    totalSell:{
        type:Number,
        default:0
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    ratingCount:{
        type:Number,
        default:0
    },
    avgRating:{
        type:Number,
        default:0
    },
    isVerified:{
        type:Boolean,
        default:false
    }
}, {timestamps:true})

export const Vendor = mongoose.model('Vendor', vendorSchema)
import mongoose from "mongoose";
import { OrderStatus, PaymentStatus } from "../utils/modelEnums";

const orderSchema = new mongoose.Schema({
    orderNumber:{
        type:String,
        required:true,
        unique:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    items:[{
        productId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        },
        productSnapshot:{
            name:String,
            price: Number,
            discount: Number,
            
            image:String,

        },
        quantity:Number,
        lastPrice: Number,
        vendor:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Vendor'
        },
    }],
    status:{
        type:OrderStatus,
        default:"pending"
    },
    paymentMethod:{
        type:String,
        required:true
    },
    paymentDetails:{
        status:PaymentStatus,
        transactionId:{type:String, required:true}
    },
    shippingCost:{
        type:Number,
        default:0
    },
    tax:{
        type:Number,
        default: 0
    },
    total:{
        type:Number,
        required:true,
    },
    shippingAddress:{
        line1:{type:String, requied:true},
        line2:{type:String},
        city:{type:String, required:true},
        state:{type:String, required:true},
        country:{type:String, required:true},
        zipCode:{types:String, required:true},
    },
    billingAddress:{
        line1:{type:String, requied:true},
        line2:{type:String},
        city:{type:String, required:true},
        state:{type:String, required:true},
        country:{type:String, required:true},
        zipCode:{types:String, required:true},
    },
    estDeliveryDate:{
        type: Date
    }

},{timestamps:true})

export const Order = mongoose.model("order", orderSchema)
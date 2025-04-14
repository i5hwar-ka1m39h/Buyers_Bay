import mongoose  from "mongoose";
import { PaymentStatus } from "../utils/modelEnums";

const transactionSchema = new mongoose.Schema({
    orderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Order",
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    currency:{type:String,
        default:'USD'
    },
    paymentMethod:{
        type:String,
        required:true
    },
    status:{
        type:PaymentStatus,
        default:'pending'
    }, 
    paymentGatewat:{
        type:String
    },
    refundAmount:{
        type:Number,
        default:0
    },
    refundReason:{
        type:String
    }
}, {timestamps:true});

export const Transaction = mongoose.model("transaction", transactionSchema)
import mongoose  from "mongoose";


const cartSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },

    items:[{
        productId:mongoose.Schema.Types.ObjectId,
        price: Number,
        quantity: Number,
        discount: Number,
        lastPrice: Number
    }],
    total:{
        type:Number
    },



}, {timestamps:true})


export const Cart = mongoose.model("cart", cartSchema)
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
    },
    productCount:{
        type:Number,
        default:0
    }
},{timestamps:true})


export const Category = mongoose.model('Category', categorySchema)
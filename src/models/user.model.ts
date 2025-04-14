import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        min:[3, "the username should be list 3 characters"],
        max:[50, "thats just too much characters in your name"]
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    isVendor:{
        type:Boolean,
        default:false
    },
    address:{
        line1:{type:String, requied:true},
        line2:{type:String},
        city:{type:String, required:true},
        state:{type:String, required:true},
        country:{type:String, required:true},
        zipCode:{types:String, required:true},
        
    }
},{timestamps:true});

export const User = mongoose.model("User", userSchema)


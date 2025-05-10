import mongoose from "mongoose";
import { User } from "../models/user.model";
import { Request, Response } from "express";
import { asyncHandler } from "../utils/asynHandler";
import { ApiError } from "../utils/apiErrHandler";
import { ApiResponse } from "../utils/apiResHandler";

class UserController{
    registerUser = asyncHandler(async(req:Request, res:Response)=>{
        //body with email and pass, username
        const {email, password, username} = req.body;
        
        //check if given or not
        const isThereSingleEmpty = [email, password, username].some(string  => string?.trim().length === 0);       
        if(isThereSingleEmpty){      
            throw new ApiError(400, "bad request, empty string for email , password or username")
        }

        //check for duplicate email
        const doesMailExist = await User.findOne({
            $or: [{email:email}, {name:username}]
        });
        
        if(doesMailExist) throw new ApiError(409, "email already in use");

        //create db entry
        const newUser = await User.create({
            email:email,
            name:username,
            password:password
        });


        //get response from db remove password and ref token

        const checkUser = await User.findById(newUser._id).select("-password -refreshToken");

        if(!checkUser) throw new ApiError(500,"unable to create user");

        //return response
        return res.status(201).json(
            new ApiResponse(201, "user created successfully", checkUser)
        )
        
    })
}

export default new UserController();
import mongoose from "mongoose";
import { User } from "../models/user.model";
import { Request, Response } from "express";


class UserController{
    async registerUser (req:Request, res:Response){
        try {
           const {username, email,  password} = req.body;
           const isUsed = await User.findOne({email:email})

          
        } catch (error) {
            
        }
    }
}
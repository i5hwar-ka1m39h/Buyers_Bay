import {Request, Response,  NextFunction } from "express";
import { ApiError } from "../utils/apiErrHandler";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user.model";


declare global{
    namespace Express{
        interface Request{
            user:any;
        }
    }
}




export const verifyJWT = async(req:Request, res:Response, next:NextFunction) =>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        if(!token){
            throw new ApiError(401, "unathorized no access token fount");
        }

        const decodedToken = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string) as JwtPayload;

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        req.user = user;
        next();

    } catch (error:any) {
        if(error.name === "JsonWebTokenError"){
            throw new ApiError(401, "invalid access token")
        }else if(error.name === "TokenExpiredError"){
            throw new ApiError(401, "accesstoken expired")
        }

        throw new ApiError(500, `something went wrong while verifying jwt, ${error.message}`)
    }
}
import { Request, Response, NextFunction } from "express";


class ApiError extends Error{
    stack?: string | undefined;
    statusCode:number;
    data:any;
    success:boolean;
    errors:any;


    constructor(
        statusCode:number,
        message = "Shit happened",
        errors:any[] =[],
        stack=""
    ){
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export {ApiError}
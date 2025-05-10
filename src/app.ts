import express, { ErrorRequestHandler, NextFunction } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app = express();

app.use(express.json());

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

const errHnadlerFun: ErrorRequestHandler = (err, req, res, next) => {
    console.log(`Error caught in middleware: `, {
        message: err.message,
        statusCode: err.statusCode,
        success: err.success,
        data: err.data,
        errors: err.errors
    });

    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            success: err.success,
            message: err.message,
            errors: err.errors,
            data: err.data
        })
        return;
    }

    res.status(500).json({
        success: false,
        message: err.message || "something fucked up"
    })
}




app.use(express.urlencoded({
    extended: true
}));

app.use(express.static('public'));

app.use(cookieParser())


import userRouter from './routes/user.routes'
import { ApiError } from './utils/apiErrHandler';



app.use("/api/v1/user", userRouter)


//special middle ware for sending error codes
app.use(errHnadlerFun)
export { app };



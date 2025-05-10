

import { connectDB } from './db/connect';
import { app } from './app';

// import dotenv from 'dotenv'

// dotenv.config({path:'./.env'});








const port = process.env.PORT;





connectDB().then(()=>{

    app.listen(port || 3000, ()=>{
        console.log(`server is listening of ${port}`);
        
    })
    
}).catch((err)=>{
    console.error(`error resolving db promise`, err);
    
})







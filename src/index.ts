import express from 'express';
import  'dotenv/config';






const app = express();

const port = process.env.PORT;

app.listen(3000, ()=>{
    console.log(`server is listening of ${port}`);
    
})





import mongoose from "mongoose";



export const connectDB = async() =>{
    try {
        let env = process.env.ENV;
        let dbUrl ;
        if(env === 'DEV'){
            dbUrl = process.env.DEV_DB_URL;
        }else{
            dbUrl = process.env.PROD_DB_URL;
        }

        const connetion = await mongoose.connect(`${dbUrl}/buyersBay`)

        console.log(`db connect to host: ${connetion.connection.host}`);
        
    } catch (error) {
        console.error('error connecting to the db', error);
        process.exit(1)
        
    }
}


import { v2 as cloudinary } from "cloudinary";

import fs from 'fs';


cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_API_KEY,
    api_secret:process.env.CLOUD_API_SECRET
})

const uploadImage = async(serverImagePath:string) =>{
    try {
        if(!serverImagePath) return null;

        const result = await cloudinary.uploader.upload(serverImagePath, {
            resource_type:'auto'
        })

        console.log(`file uploaded successfully`, result.url);
        return result;
        
    } catch (error) {
        fs.unlinkSync(serverImagePath);
        return null;
    }
}
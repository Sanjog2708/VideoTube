import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv';
dotenv.config();
import fs from "fs" 
cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localFilePath)=>{
    try{
        if(!localFilePath) return null;
        //Upload file on cloudinary
        const responce = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        //File has been uploaded
        // console.log("File is uploaded on cloudinary ..",responce.url);
        fs.unlinkSync(localFilePath);
        return responce;

    }catch(error){
        console.log("fail to upload file")
        fs.unlinkSync(localFilePath)//Remove the locally saved temp 
        return null
    }
}
export {uploadOnCloudinary};


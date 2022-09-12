
const expressAsyncHandler = require("express-async-handler");
const { cloudinary } = require("../config/cloudinary");
const dotenv = require('dotenv').config();



const handleImageUpload =expressAsyncHandler( async (req, res) => {
    try{
        const fileStr = await JSON.parse(JSON.stringify(req.file));
        console.log(fileStr);
        const fileUploaded = await cloudinary.uploader.upload(fileStr.path);
        res.status(200).json(fileUploaded);
    }
    catch (e) {
        res.status(403).json(e);
    }
})

module.exports = {handleImageUpload}
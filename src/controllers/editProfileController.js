const asyncHandler = require("express-async-handler");
const Profile = require("../models/profileModel");

const editProfile = asyncHandler(async (req, res) => {
    const userProfile = await req.user;
    if(!userProfile) {
        res.status(400).json({
            errCode: 5,
            errMsg: "Can not get user",
        })
    }
    else {
        const newProfile = await Profile.findOneAndUpdate(
            {username : userProfile.username}, 
            {$set: {
                description : req.body.description,
                web1 : req.body.web1,
                web2 : req.body.web2,
                web3 : req.body.web3,
                avatar : req.body.avatar,
            }})
        res.status(200).json(newProfile);
    }
})

module.exports = {editProfile};
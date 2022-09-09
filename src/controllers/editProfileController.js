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
                facebook : req.body.facebook,
                github : req.body.github,
                discord : req.body.discord,
                avatar : req.body.avatar,
            }})
        res.status(200).json(newProfile);
    }
})

module.exports = {editProfile};
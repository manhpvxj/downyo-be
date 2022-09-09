const asyncHandler = require("express-async-handler");
const Profile = require("../models/profileModel");

const getUser = asyncHandler( async (req,res) => {
    const user = await Profile.findOne({username: req.params.id});
    if(!user) {
        res.status(400).json({
            errCode: 3,
            errMsg: "User doesn't exist",
        })
    }
    else {
        res.status(200).json(user);
    }
})

module.exports = {getUser};
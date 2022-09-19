const Profile = require("../models/profileModel");
const Post = require("../models/postModel");

const createPost = async (req, res) => {
    try{
        const user = await Profile.findOne({username: req.user.username})
    const post = await Post.create({
        author: {  username: user.username,
                    avatar: user.avatar,
                },
        content: req.body.content,
    })
    res.status(200).json(post);
    }
    catch(e) {
        res.status(400).json(e);
    }
}



const getPostsByUsername = async (req, res) => {
    try {

    }
    catch(e) {

    }
}
const createComment = async (req, res) => {
    try {
        const postComment = Post.findById(req.params.id);
        if (postComment) {
                await Post.updateOne({_id : req.params.id}, {
                $push: {
                    comments: {
                        author: req.user.username,
                        content: req.body.content,
                    },
                },  

            })
            res.status(200).json("OK");
        }
        else {
            res.status(404).json("Can not find post");
        }
    }
    catch(e) {
        res.status(401).json(e);
    }
}
module.exports = { createPost, createComment, getPostsByUsername }
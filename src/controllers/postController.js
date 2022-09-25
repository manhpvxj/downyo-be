const Profile = require("../models/profileModel");
const Post = require("../models/postModel");

const createPost = async (req, res) => {
    if(!req.body.content) { 
        res.status(403).json("Please add a caption");
    }
    else {
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
}



const getPostsById = async (req, res) => {
    try {
        const post = await Post.findOne({_id: req.params.id})
        if(!post) {
            res.status(404).json("Can not find post");
        }
        else {
            res.status(200).json(post);
        }
    }
    catch(e) {
        res.status(400).json(e);
    }
}
const createComment = async (req, res) => {
    try {
        const postComment = Post.findById(req.params.id);
        if (postComment) {
            if (req.body.content) {
                const user = await Profile.findOne({username: req.user.username})
                await Post.updateOne({_id : req.params.id}, {
                $push: {
                    comments: {
                        author:user.username,
                        content: req.body.content,
                        avatar:user.avatar,
                        createdAt: Date(),
                    },
                },
            })}
            else {
                res.status(400).json("Please add comment");
            }
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

const Like = async (req, res) => {
    try {
        const postComment = Post.findById(req.params.id);
        if (postComment) {
                await Post.updateOne({_id : req.params.id}, {
                $push: {
                    likes: {
                        author: req.user.username,
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
module.exports = { createPost, createComment, getPostsById, Like }
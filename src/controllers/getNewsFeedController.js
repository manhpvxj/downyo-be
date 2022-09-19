
const Post = require("../models/postModel");
const getAllPosts = async (req, res) => {
    try {
        const all = await Post.find();
        res.status(200).json(all);
    }
    catch(e) {
        res.status(400).json(e);
    }
}

module.exports = { getAllPosts }

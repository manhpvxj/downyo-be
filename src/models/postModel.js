const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
    {
        author: {
            type: Object,
            require: [true, "Add an author"],
            default: {},
        },
        content: {
            type: String,
            require: [true, "Please add an content"],
        },
        comments: {
            type: [Object],
            default: [],
        },
        likes: {
            type: [Object],
            default: [],
        },
        
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model("Post", postSchema)
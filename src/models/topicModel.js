const mongoose = require("mongoose");

const Topic = mongoose.Schema(
    {
        author: {
            type: String,
            require: [true, "Add an author"],
        },
        content: {
            type: String,
            require: [true, "Please add an content"],
        },
        
    }
)
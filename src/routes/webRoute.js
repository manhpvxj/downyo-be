const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const { editProfile } = require("../controllers/editProfileController");
const { getUser } = require("../controllers/userController");
const { handleImageUpload } = require("../controllers/imageUploadController");
const { auth } = require("../middleware/authMiddleware");
const { verify } = require("../middleware/verifyMiddleware");
const { createPost, createComment, Like, getPostsById } = require("../controllers/postController");
const { getAllPosts } = require("../controllers/getNewsFeedController");
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const initWebRoutes = (app) => {
    router.get("/", (req, res) => {
        res.send("Welcome to my api xd");
    })

    router.post("/auth/register", registerUser);
    router.post("/auth/login", loginUser);
    router.get("/users/:id", getUser);
    router.post("/users/:id/edit", auth, verify, editProfile);
    router.get("/users/:id/edit", auth, verify, getUser);
    router.post("/users/:id/edit/upload",upload.single('avatar') ,handleImageUpload);
    router.post("/:id/posts/create", auth, verify, createPost);
    router.post("/posts/:id/comment", auth, createComment);
    router.post("/posts/:id/like", auth, Like);
    router.get("/posts/:id", getPostsById)
    router.get("/news", getAllPosts);
    
    return app.use("/api", router);
}



module.exports = initWebRoutes;

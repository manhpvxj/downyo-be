const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const { editProfile } = require("../controllers/editProfileController");
const { getUser } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const initWebRoutes = (app) => {
    router.get("/", (req, res) => {
        res.send("Hello world from route~")
    })

    router.post("/auth/register", registerUser);
    router.post("/auth/login", loginUser);
    router.get("/users/:id", getUser);
    router.post("/users/:id/edit", protect, editProfile);
    router.get("/users/:id/edit", protect, getUser);
    return app.use("/api", router);
}



module.exports = initWebRoutes;

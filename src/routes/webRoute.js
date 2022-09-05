const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");
const { getUser } = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");

const initWebRoutes = (app) => {
    router.get("/", (req, res) => {
        res.send("Hello world from route~")
    })

    router.post("/auth/register", registerUser);
    router.post("/auth/login", loginUser);
    router.get("/:id", getUser);
    router.get("/:id/edit", protect, getUser);
    return app.use("/api", router);
}



module.exports = initWebRoutes;

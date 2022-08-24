const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getMe } = require("../controllers/curdController")

const initWebRoutes = (app) => {
    router.get("/", (req, res) => {
        res.send("Hello world from route")
    })

    router.post("/register", registerUser);
    router.post("/login", loginUser);
    router.get("/me", getMe);
    return app.use("/api/users", router);
}



module.exports = initWebRoutes;

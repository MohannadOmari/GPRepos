const express = require("express");

const userController = require("../controllers/user");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/user-profile", isAuth, userController.getUserProfile);

module.exports = router;

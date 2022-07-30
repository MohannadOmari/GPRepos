const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/user-signup", authController.getUserSignup);

router.get("/user-signin", authController.getUserSignin);

router.post("/user-signin", authController.postUserSignin);

// router.get("/user-logout", authController.userLogout);

router.post("/user-signup", authController.postUserSignup);

router.get("/organizer-signup", authController.getOrganizerSignup);

router.get("/organizer-signin", authController.getOrganizerSignin);

router.post("/organizer-signin", authController.postOrganizerSignin);

router.post("/organizer-signup", authController.postOrganizerSignup);


module.exports = router;

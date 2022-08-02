const express = require("express");

const organizerController = require("../controllers/organizer");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/organizer-profile", organizerController.getOrganizerProfile);

module.exports = router;
const express = require("express");

const basicController = require("../controllers/basic");

const router = express.Router();

router.get("/", basicController.getHome);

router.get("/contact-us", basicController.getContactUs);

module.exports = router;

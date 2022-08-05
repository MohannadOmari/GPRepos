const express = require("express");

const basicController = require("../controllers/basic");

const router = express.Router();

router.get("/", basicController.getHome);

router.get("/contact-us", basicController.getContactUs);

router.get("/About-us", basicController.getAboutUs);

router.get("/Wishlist", basicController.getWishlist);

module.exports = router;

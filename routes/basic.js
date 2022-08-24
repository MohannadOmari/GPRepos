const express = require("express");

const basicController = require("../controllers/basic");
const isBidder = require("../middleware/isBidder");

const router = express.Router();

router.get("/", basicController.getHome);

router.get("/contact-us", basicController.getContactUs);

router.post("/contact-us", basicController.postContactUs);

router.get("/About-us", basicController.getAboutUs);

router.get("/Wishlist", isBidder, basicController.getWishlist);

module.exports = router;

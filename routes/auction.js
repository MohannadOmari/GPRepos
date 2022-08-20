const express = require("express");

const auctionController = require("../controllers/auction");
const isOrganizer = require("../middleware/isOrganizer");
const isBidder = require("../middleware/isBidder");
const isLoggedIn = require("../middleware/isLoggedin");
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

const router = express.Router();

router.get("/", auctionController.getIndex);

router.get("/bid", isLoggedIn, auctionController.getAuctionBid);

router.get("/Auctioninfo", auctionController.getAuctionInfo);

router.get("/carinfo", auctionController.getCarInfo);

router.get("/AddCar", isOrganizer, auctionController.getAddCar);

router.post("/AddCar", upload.array("imgs"), isOrganizer, auctionController.postAddCar);

router.get("/PreviousAuction", auctionController.getPreviousAuction);

router.get("/NextAuction", auctionController.getNextAuction);

module.exports = router;

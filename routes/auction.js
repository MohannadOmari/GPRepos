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

router.get("/auctioninfo/:auctionId", auctionController.getAuctionInfo);

router.post("/next", auctionController.postNextCar);

router.post("/nextInAuction/:auctionId", auctionController.postNextInInfo);

router.post("/prevInAuction/:auctionId", auctionController.postPrevInInfo);

router.get("/bid", isLoggedIn, auctionController.getAuctionBid);

router.post("/bidding/:id", isLoggedIn, auctionController.postAddBid);

router.get("/carinfo", auctionController.getCarInfo);

router.get("/AddCar", isOrganizer, auctionController.getAddCar);

router.post("/AddCar", upload.array("imgs"), isOrganizer, auctionController.postAddCar);

router.get("/PreviousAuction", auctionController.getPreviousAuction);

router.get("/NextAuction", auctionController.getNextAuction);




module.exports = router;

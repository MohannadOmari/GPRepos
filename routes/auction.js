const express = require("express");

const auctionController = require("../controllers/auction");
const isOrganizer = require("../middleware/isOrganizer");
const isBidder = require("../middleware/isBidder");

const router = express.Router();

router.get("/", auctionController.getIndex);

router.get("/bid", isBidder, isOrganizer, auctionController.getAuctionBid);

router.get("/Auctioninfo", auctionController.getAuctionInfo);

router.get("/carinfo", auctionController.getCarInfo);

router.get("/AddCar", isOrganizer, auctionController.getAddCar);

router.get("/PreviousAuction", auctionController.getPreviousAuction);

router.get("/NextAuction", auctionController.getNextAuction);
module.exports = router;

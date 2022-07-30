const express = require("express");

const auctionController = require("../controllers/auction");

const router = express.Router();

router.get("/", auctionController.getIndex);

router.get("/bid", auctionController.getAuctionBid);

router.get("/Auctioninfo", auctionController.getAuctionInfo);

router.get("/carinfo", auctionController.getCarInfo);

module.exports = router;

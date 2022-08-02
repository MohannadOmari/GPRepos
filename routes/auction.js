const express = require("express");

const auctionController = require("../controllers/auction");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/", auctionController.getIndex);

router.get("/bid", isAuth, auctionController.getAuctionBid);

router.get("/Auctioninfo", auctionController.getAuctionInfo);

router.get("/carinfo", auctionController.getCarInfo);

module.exports = router;

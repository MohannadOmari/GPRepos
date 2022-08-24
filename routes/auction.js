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

router.post("/AddCar",
       upload.array("imgs"),
     /*  body('car[brand]' , 'Brand must be between 2 and 15 characters with no numbers')
                .islength({ min: 2 , max:15 })
                .isalpha(),
       body('car[Model]', ' Model must be between 3 and 15 characters with no numbers')
                .isLength({ min: 3, max: 15 })
                .isAlpha(),
            body('org[lastName]', 'Last name must be between 3 and 15 characters with no numbers')
                .isLength({ min: 3, max: 15 })
                .isAlpha(),
            body('org[phoneNumber]', 'Please enter a valid phone number')
                .isLength({min: 10, max: 10}),*/
isOrganizer, auctionController.postAddCar);

router.get("/PreviousAuction", auctionController.getPreviousAuction);

router.get("/NextAuction", auctionController.getNextAuction);




module.exports = router;

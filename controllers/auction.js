const Organizer = require("../models/organizer");
const Bidder = require("../models/bidder")
const Auction = require("../models/auction");
const Car = require("../models/cars");

let nextCar = 0;
let bidHappened = false;
let moveInfo = 0;

exports.getIndex = async (req, res, next) => { //car.createdAt.toString().substring(0, car.createdAt.toString().indexOf(':') - 2)
	const auctions = await Auction.find({status: "Ready"}).sort({startDate: "asc"}).populate('cars');
	const today = new Date();	
	let date = auctions[0].startDate;
	let enterAuction = today > date ? true : false;

	// splice the date and time to match format of countdown timer script
	let dateStr =
  		("00" + (date.getMonth() + 1)).slice(-2) + "/" +
  		("00" + date.getDate()).slice(-2) + "/" +
  			date.getFullYear() + " " +
  		("00" + date.getHours()).slice(-2) + ":" +
  		("00" + date.getMinutes()).slice(-2) + ":" +
  		("00" + date.getSeconds()).slice(-2);
	dateStr = dateStr.replaceAll('/', ' ');

	if (req.session.isOrganizer) {
		const org = await Organizer.findById(req.session.org._id);
		enterAuction = today > date ? true : false;
	}
	if (req.session.isBidder) {
		const bidder = await Bidder.findById(req.session.user._id);
		enterAuction = today > date && bidder.wallet > 200 ? true : false;
	}
	
	res.render("auction/index", {
		title: "Auction Page",
		enterAuction,
		dateStr,
		auction: auctions[0]
	});
};

exports.getAuctionInfo = async (req, res, next) => {
	console.log(req.params);
	const auction = await Auction.findById(req.params.auctionId).populate('cars');
	res.render("auction/Auctioninfo", { auction, title: "Auction Info", moveInfo});
};

exports.getCarInfo = (req, res, next) => {

	res.render("auction/carinfo", { title: "Car Info" });
};

exports.getAddCar = (req, res, next) => {
	res.render("auction/AddCar", { title: " Add Car" });
};

exports.getPreviousAuction = async (req, res, next) => {
	const auctions = await Auction.find({status: "Finished"}).sort({startDate: "asc"}).populate('cars');
	res.render("auction/PreviousAuction", { title: "PreviousAuction ", auctions});
};
exports.getNextAuction = async (req, res, next) => {
	const auctions = await Auction.find( {status: "Ready"}).sort({startDate: "asc"}).populate('cars');
	res.render("auction/NextAuction", { title: "NextAuction ", auctions});
};

exports.getAuctionBid = async (req, res, next) => {
	const auctions = await Auction.find({status: "Ready"}).sort({startDate: "asc"}).populate('cars');
	const auction = auctions[0];
	if (nextCar < auction.cars.length - 1) {
		res.render("auction/bid", {
			title: "Auction Bid",
			auction,
			state: "green",
			currentBid: 200,
			nextCar
		});
	} else {
		nextCar = 0
		res.render("auction/bid", {
			title: "Auction Bid",
			auction,
			state: "green",
			currentBid: 200,
			nextCar
		});
	}
	
};

exports.postNextCar= async (req, res, next) => {

	const auctions = await Auction.find({status: "Ready"}).sort({startDate: "asc"}).populate('cars');
	// nextCar = nextCar > auctions?.cars?.length ? 0 : nextCar
	const auction = auctions[0];
	console.log(nextCar);
	if (bidHappened) {
		await Car.findByIdAndUpdate(auction.cars[nextCar]._id, { status: "Sold" });
	}
	if (nextCar < auction?.cars?.length - 1) {
		nextCar++;
		res.render("auction/bid", {
			title: "Auction Bid",
			auction,
			state: "green",
			currentBid: 200,
			nextCar
		});
	} else {
		console.log("I am here");
		await Auction.findByIdAndUpdate(auction._id, { status: "Finished" });
		res.redirect("/auction");
	}
};

exports.postNextInInfo = async (req, res, next) => {
	const auction = await Auction.findById(req.params.auctionId).populate('cars');
	console.log(moveInfo);
	if (moveInfo < auction.cars.length - 1) {
		moveInfo++;
	} else {
		moveInfo = 0;
	}
	res.render("auction/Auctioninfo", { auction, title: "Auction Info", moveInfo});
};

exports.postPrevInInfo = async (req, res, next) => {
	const auction = await Auction.findById(req.params.auctionId).populate('cars');
	console.log(moveInfo);
	if (moveInfo === 0) {
		moveInfo = auction.cars.length - 1;
	} else {
		moveInfo--;
	}
	res.render("auction/Auctioninfo", { auction, title: "Auction Info", moveInfo});
};

exports.postAddCar = async (req, res, next) => {
	const carDetails = req.body.car;
	console.log(carDetails);
	await Organizer.findById(req.session.org._id)
		.then(org => {
			const car = new Car(carDetails);
			car.author = org._id;
			car.images = req.files.map(f => ({ url: f.path, name: f.filename }));
			car.save();
			res.redirect("/auction/addcar");
		})
		.catch(err => {
			console.log(err);
		});
};

exports.postAddBid = async (req,res,next) => {
	console.log(req.body);
	const id = req.params.id;
	const car = await Car.findById(id);
	let newPrice = parseInt(car.price) + parseInt(req.body.bid);
	await Car.findByIdAndUpdate(id, {price: newPrice});
	bidHappened = true;
	res.redirect("/auction/bid");
};
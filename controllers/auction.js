const Organizer = require("../models/organizer");
const Bidder = require("../models/bidder")
const Auction = require("../models/auction");
const Car = require("../models/cars");

const car = {
	brand: "BMW",
	model: "x",
	year: 2020,
	exteriorColor: "red",
	interiorColor: "black",
	gearType: "auto",
	Fuel: 1000,
	milage: 100000,
	carInspection: "Good",
	notes: "none",
	imgs: [
		"../imgs/landing-page.jpg",
		"../imgs/landing-page.jpg",
		"../imgs/landing-page.jpg",
		"../imgs/landing-page.jpg",
		"../imgs/landing-page.jpg",
	],
};

let auctionData = [
	{
		date: new Date("July 11, 2022 03:24:00"),
		cars: [
			{
				organizerName: "Yazan",
				brand: "BMW",
				model: "x",
				year: 2020,
				exteriorColor: "red",
				interiorColor: "black",
				gearType: "auto",
				Fuel: 1000,
				milage: 100000,
				carInspection: "Good",
				notes: "none",
				imgs: [
					"../imgs/landing-page.jpg",
					"../imgs/landing-page.jpg",
					"../imgs/landing-page.jpg",
					"../imgs/landing-page.jpg",
					"../imgs/landing-page.jpg",
				],
			},
			{
				organizerName: "Ahmed",

				brand: "Honda",
				model: "Insight",
				year: 2020,
				exteriorColor: "red",
				interiorColor: "black",
				gearType: "auto",
				Fuel: 1000,
				milage: 100000,
				carInspection: "Good",
				notes: "none",
				imgs: [
					"../imgs/landing-page.jpg",
					"../imgs/landing-page.jpg",
					"../imgs/landing-page.jpg",
					"../imgs/landing-page.jpg",
					"../imgs/landing-page.jpg",
				],
			},
		],
	},
];

const user = {
	name: "Ahmed",
	wallet: 100,
};

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
		dateStr
	});
};

exports.getAuctionInfo = (req, res, next) => {
	res.render("auction/Auctioninfo", { auctionData, title: "Auction Info"});
};

exports.getCarInfo = (req, res, next) => {

	res.render("auction/carinfo", { title: "Car Info", car});
};

exports.getAddCar = (req, res, next) => {

	res.render("auction/AddCar", { title: " Add Car", car});
};

exports.getPreviousAuction = (req, res, next) => {
	res.render("auction/PreviousAuction", { title: "PreviousAuction ", car});
};
exports.getNextAuction = (req, res, next) => {
	res.render("auction/NextAuction", { title: "NextAuction ", car});
};

exports.getAuctionBid = (req, res, next) => {
	res.render("auction/bid", {
		title: "Auction Bid",
		auction,
		state: "green",
		currentBid: 200,
	});
};
let auction = {
	date: new Date("July 11, 2022 03:24:00"),
	cars: [
		{
			organizerName: "Yazan",
			brand: "BMW",
			model: "x",
			year: 2020,
			exteriorColor: "red",
			interiorColor: "black",
			gearType: "auto",
			Fuel: 1000,
			milage: 100000,
			carInspection: "Good",
			notes: "none",
			imgs: ["../imgs/bmwback.jpg", "../imgs/bmwfront.jpg", "../imgs/bmwinterior.jpg", "../imgs/bmwleft.jpg"],
		},
		{
			organizerName: "Ahmed",

			brand: "Honda",
			model: "Insight",
			year: 2020,
			exteriorColor: "red",
			interiorColor: "black",
			gearType: "auto",
			Fuel: 1000,
			milage: 100000,
			carInspection: "Good",
			notes: "none",
			imgs: [
				"../imgs/car2.jpg",
				"../imgs/car2.jpg",
				"../imgs/car2.jpg",
				"../imgs/car2.jpg",
			],
		},
	],
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

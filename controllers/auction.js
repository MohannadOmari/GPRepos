const Organizer = require("../models/organizer");
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

exports.getIndex = (req, res, next) => { //car.createdAt.toString().substring(0, car.createdAt.toString().indexOf(':') - 2)
	let today = new Date();
	console.log(today);
	let dateStr =
  		("00" + (today.getMonth() + 1)).slice(-2) + "/" +
  		("00" + today.getDate()).slice(-2) + "/" +
  			today.getFullYear() + " " +
  		("00" + today.getHours()).slice(-2) + ":" +
  		("00" + today.getMinutes()).slice(-2) + ":" +
  		("00" + today.getSeconds()).slice(-2);
	dateStr = dateStr.replaceAll('/', ' ');
	console.log(dateStr);	
	const date = "31 Aug 2042 17:00:00";
	const enterAuction = user.wallet > 200 ? true : false;
	res.render("auction/index", {
		auctionData,
		title: "Auction Page",
		enterAuction,
		date,

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
			const car = new Car({
				brand: carDetails.brand,
				model: carDetails.model,
				year: carDetails.year,
				fuel: carDetails.fuel,
				mileage: carDetails.mileage,
				gearType: carDetails.gearType,
				interiorColor: carDetails.interiorColor,
				exteriorColor: carDetails.exteriorColor,
				notes: carDetails.notes,
				author: org._id
			});
			car.save();
			res.redirect("/");
		})
		.catch(err => {
			console.log(err);
		});
};

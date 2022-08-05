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

exports.getIndex = (req, res, next) => {
	let today = new Date().toLocaleString("en-US", { timeZone: "UTC" });
	let auctionDate = auctionData[0].date.toLocaleString("en-US", {
		timeZone: "UTC",
	});

	let countDown =
		parseInt(
			auctionDate.substring(
				auctionDate.indexOf("/") + 1,
				auctionDate.lastIndexOf("/")
			)
		) -
		parseInt(
			today.substring(today.indexOf("/") + 1, today.lastIndexOf("/"))
		);

	const enterAuction = countDown === 0 && user.wallet > 200 ? true : false;
	res.render("auction/index", {
		auctionData,
		title: "Auction Page",
		countDown,
		enterAuction,
		isAuthenticated: req.session.isLoggedIn,
		isOrganizer: req.session.isOrganizer,
		isBidder: req.session.isBidder
	});
};

exports.getAuctionInfo = (req, res, next) => {
	res.render("auction/Auctioninfo", { auctionData, title: "Auction Info", isAuthenticated: req.session.isLoggedIn, isOrganizer: req.session.isOrganizer, isBidder: req.session.isBidder });
};

exports.getCarInfo = (req, res, next) => {

	res.render("auction/carinfo", { title: "Car Info", car, isAuthenticated: req.session.isLoggedIn, isOrganizer: req.session.isOrganizer, isBidder: req.session.isBidder });

};

exports.getPreviousAuction = (req, res, next) => {
	res.render("auction/PreviousAuction", { title: "PreviousAuction ", car, isAuthenticated: req.session.isLoggedIn, isOrganizer: req.session.isOrganizer, isBidder: req.session.isBidder});
};
exports.getNextAuction = (req, res, next) => {
	res.render("auction/NextAuction", { title: "NextAuction ", car, isAuthenticated: req.session.isLoggedIn, isOrganizer: req.session.isOrganizer, isBidder: req.session.isBidder});
};

exports.getAuctionBid = (req, res, next) => {
	res.render("auction/bid", {
		title: "Auction Bid",
		auction,
		state: "green",
		currentBid: 200,
		isAuthenticated: req.session.isLoggedIn,
		isOrganizer: req.session.isOrganizer,
		isBidder: req.session.isBidder
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



const Auction = require('../models/auction');

const auctionData = new Auction({
	startDate: new Date("July 26, 2022 12:30:00"),
	finishDate: new Date("July 27, 2022 05:00:00"),
	cars: [
		{
			brand: 'BMW',
			model: 'i8',
			year: '2018',
			fuel: 'electric',
			mileage: 102478,
			gearType: 'automatic',
			interiorColor: 'White',
			exteriorColor: 'White'
		},
		{
			brand: 'Mercedes',
			model: 'E200',
			year: '2012',
			fuel: 'petrol',
			mileage: 64242,
			gearType: 'automatic',
			interiorColor: 'Gray',
			exteriorColor: 'Black'
		}
	]
});

const user = {
	name: "Ahmed",
	wallet: 100,
};

exports.getIndex = (req, res, next) => {
	let today = new Date().toLocaleString("en-US", { timeZone: "UTC" });
	let auctionDate = auctionData.startDate.toLocaleString("en-US", {
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
	});
};

exports.getAuctionInfo = (req, res, next) => {
	res.render("auction/info", { auctionData, title: "Auction Info" });
};



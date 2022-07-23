const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const dbLogin = require("./connection/dbLogin");

const authRoutes = require("./routes/auth");
const auctionRoutes = require("./routes/auction");
const basicRoutes = require("./routes/basic");
const userRoutes = require("./routes/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true })); // middleware
app.use(express.static(path.join(__dirname, "public")));

// app.use("/", (req, res, next) => {
// 	res.render("basic/home", {title: "Bidha Auction"});
// });
app.use(basicRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use("/auction", auctionRoutes);

// connecting to online database cluster
mongoose.connect(dbLogin.dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((result) => console.log('connected to db'))
	.catch((err) => console.log(err));

app.listen(3000, () => {
	console.log("port 3000");
});

/**
 * Landing page (Info about webapp, Help section, org or bidder link)
 * Auth pages (org)
 * Home page (Ads, [clickable]=Count Down(), Search Bar)
 * Car Info
 * Single Auction
 * Profile page (users, Wallet) Middleware
 * Edit Profile page
 * Profile page (organizer)
 * Edit Profile Page
 * Add Car
 * Pervious Auctions (Info about cars)
 * About Us (Info about the team and tutorial for the web application)
 * Contact Us
 * Admin Panel
 */

/* // auction testing
const Auction = require('./models/auction');

app.get('/add-auction', (req, res, next) => {
	const auction = new Auction({
		startDate: new Date("July 23, 2022 11:30:00"),
		finishDate: new Date("July 24, 2022 05:00:00"),
		cars: [
			{
				brand: 'BMW',
				model: 'i8',
				year: '2018',
				fuel: 'electric',
				mileage: 102478,
				gearType: 'automatic',
				interiorColor: 'White',
				exteriorColor: 'white'
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

	auction.save()
		.then((result) => {
			res.send(result)
		})
		.catch((err) => {
			console.log(err);
		});

}); */
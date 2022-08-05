const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const dbLogin = require("./connection/dbLogin");
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const flash = require("connect-flash");
const csrf = require('csurf');

const authRoutes = require("./routes/auth");
const auctionRoutes = require("./routes/auction");
const basicRoutes = require("./routes/basic");
const userRoutes = require("./routes/user");
const organizerRoutes = require("./routes/organizer");
const adminRoutes = require("./routes/admin");

const app = express();
const store = new MongoDBStore({
	uri: dbLogin.dbURI,
	collection: 'sessions'
});
const csrfProtection = csrf();

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true })); // middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(session({
		secret: 'acdc123diokars6942069jotarofoodtruckkun',
	 	resave: false,
	 	saveUninitialized: false,
		store: store}));
app.use(flash());

app.use(csrfProtection);
app.use((req, res , next) => {
	res.locals.isAuthenticated = req.session.isLoggedIn;
	res.locals.isOrganizer = req.session.isOrganizer;
	res.locals.isBidder = req.session.isBidder;
	res.locals.csrfToken = req.csrfToken();

	next();
});

// app.use("/", (req, res, next) => {
// 	res.render("basic/home", {title: "Bidha Auction"});
// });
app.use(basicRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use(organizerRoutes);
app.use("/auction", auctionRoutes);
app.use("/admin", adminRoutes);

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
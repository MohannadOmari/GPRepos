if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}// configure dotenv if not in production mode only save locally

const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const dbLogin = require("./connection/dbLogin"); // Database URI saved in different folder
const session = require('express-session'); // API for creating and saving sessions and cookies
const MongoDBStore = require('connect-mongodb-session')(session); // API to store sessions in the database
const flash = require("connect-flash"); // error messages for validation
const csrf = require('csurf'); // cross-site forgery 

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
		cookie: {maxAge: 604800000},
	 	saveUninitialized: false,
		store: store}));
app.use(flash());

app.use(csrfProtection);
app.use((req, res , next) => {
	res.locals.isAuthenticated = req.session.isLoggedIn;
	res.locals.isOrganizer = req.session.isOrganizer;
	res.locals.isBidder = req.session.isBidder;
	res.locals.isAdmin = req.session.isAdmin;
	res.locals.csrfToken = req.csrfToken();

	next();
});


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


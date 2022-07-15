const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const auctionRoutes = require("./routes/auction");
const basicRoutes = require("./routes/basic");

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
app.use("/auction", auctionRoutes);

//connection to the mongo atlas DB
mongoose
  .connect("mongodb+srv://mohannadalomari:Mohannad_2@bidhaauction.y4bgeky.mongodb.net/bidhaauction?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });

/**
 * Landing page
 * Auth pages
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

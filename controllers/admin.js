const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator");
const Auction = require('../models/auction');
const Car = require('../models/cars');
const Organizer = require("../models/organizer");
const { populate } = require('../models/admin');

exports.getDashboard = (req, res, next) => {
	res.render("admin/dashboard", { title: "Dashboard" });
};
exports.getProfile = async (req, res, next) => {
	const admin = await Admin.findById(req.session.admin._id);
	res.render("profile/admin-profile", { title: "Admin Profile", errorMessage: req.flash('error'), admin });
};
exports.getOrganizerRequests = async (req, res, next) => {
	const orgs = await Organizer.find();
	res.render("admin/Organizer-requests", { title: "Organizer Requests", orgs });
};

exports.getCarRequests = async (req, res, next) => {
	const cars = await Car.find().populate("author");
	res.render("admin/car-requests", {title: "Car Requests" , cars});
};

exports.getAddAuction = async (req, res, next) => {
	const cars = await Car.find({status: "Accepted"});
	res.render("admin/add-auction", { title: "Add Auction", cars });
};

exports.getAdminSignin = (req, res, next) => {
	res.render("admin/admin-signin", { title: "Admin sign in", errorMessage: req.flash('error') });
};

exports.postAdminSignin = (req, res, next) => {
	const admin= req.body.admin;
	Admin.findOne({email: admin.email})
		.then(adminDoc => {
			if (!adminDoc) {
				req.flash('error', 'Invalid email or password');
				return res.redirect("/admin");
			}
			bcrypt.compare(admin.password, adminDoc.password)
			.then(doMatch => {
				if (doMatch) {
					req.session.isAdmin = true;
					req.session.isLoggedIn = true;
					req.session.admin = adminDoc;
					return req.session.save(err => {
						console.log(err);
						res.redirect("admin/dashboard");
					})
				}
				req.flash('error', 'Invalid email or password');
				res.redirect("/admin");
			})
			.catch(err => {
				console.log(err);
				res.redirect("/admin");
			});
		})
};

exports.postAdminLogout = (req, res, next) => {
	req.session.destroy(err => {
		console.log(err);
		res.redirect("/admin");
	})
};

exports.postUpdateAdmin = (req, res, next) => {
	const email = req.session.admin.email;
	console.log(email);
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.array());
		return res.status(422).render("profile/admin-profile", { 
			title: "Admin Profile",
			errorMessage: errors.array()[0].msg,
			});
	}

	Admin.findOne({email: email})
	.then(admin => {
		console.log(admin);
		const newAdmin = req.body.admin;
		admin.email = newAdmin.email;
		admin.password = newAdmin.password;
		
		req.session.admin = admin;
		admin.save();
		return res.redirect("dashboard");
	})
	.catch(err => {console.log(err)})
};

exports.patchAcceptCar = async (req, res, next) => {
	const carId = req.body.carId;
	const car = await Car.findByIdAndUpdate(carId, {status: "Accepted"});
	await car.save();

	res.redirect("/admin/car-requests");
};

exports.patchRejectCar = async (req, res, next) => {
	const carId = req.body.carId;
	const car = await Car.findByIdAndUpdate(carId, {status: "rejected"});
	await car.save();

	res.redirect("/admin/car-requests");
};

exports.patchAcceptOrganizer = async (req, res, next) => {
	const orgId = req.body.orgId;
	const org = await Organizer.findByIdAndUpdate(orgId, { status: "Approved" });
	console.log(org.password);
	await org.save();
	console.log(org.password);

	res.redirect("/admin/organizer-requests");
};

exports.patchRejectOrganizer = async (req, res, next) => {
	const orgId = req.body.orgId;
	const org = await Organizer.findByIdAndUpdate(orgId, { status: "Rejected" });
	await org.save();

	res.redirect("/admin/organizer-requests");
};

exports.postAddAuction = async (req, res, next) => {
	const carsIds = req.body.chosenCar;
	const startDate = req.body.startDate;
	const startPrices = req.body.startPrice;
	const cars = [];
	const prices = [];
	const ids = [];

	for (let price of startPrices) {
		if (price) {
			prices.push(price);
		}
	}
	if ((typeof carsIds) === 'object') {
		for (let carId of carsIds) {
			ids.push(carId);
		}
	} else {
		ids.push(carsIds);
	}

	for (let i = 0; i < prices.length; i++) {
		await Car.findByIdAndUpdate(ids[i], { price: parseInt(prices[i]), status: "onAuction" });
	}
	for (let i = 0; i < prices.length; i++) {
		cars.push(await Car.findById(ids[i]));
	}
	
	const auction = new Auction({
		startDate: startDate,
		author: req.session.admin,
		cars: cars,
		status: "Ready"
	});
	
	await auction.save();
	
	res.redirect("/admin/add-auction");
};
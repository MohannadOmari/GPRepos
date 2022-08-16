const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator");
const Auction = require('../models/auction');
const Car = require('../models/cars');
const Organizer = require("../models/organizer");

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
	console.log(cars);
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

/* exports.getCarRequests = (req, res, next) => {
	res.render("admin/Car-requests", { title: "Car Requests" });
}; */

exports.patchAcceptCar = async (req, res, next) => {
	console.log("HELLO");
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
	console.log(orgId);
	const org = await Organizer.findByIdAndUpdate(orgId, { status: "Approved" });
	await org.save();

	res.redirect("/admin/organizer-requests");
};

exports.patchRejectOrganizer = async (req, res, next) => {
	const orgId = req.body.orgId;
	const org = await Organizer.findByIdAndUpdate(orgId, { status: "Rejected" });
	await org.save();

	res.redirect("/admin/organizer-requests");
};

exports.postAddAuction = (req, res, next) => {

};
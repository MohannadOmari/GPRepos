const Admin = require('../models/admin');
const bcrypt = require('bcrypt');
const { validationResult } = require("express-validator");

exports.getDashboard = (req, res, next) => {
	res.render("admin/dashboard", { title: "Dashboard" });
};
exports.getProfile = (req, res, next) => {
	res.render("profile/admin-profile", { title: "Admin Profile", errorMessage: req.flash('error') });
};
exports.getOrganizerRequests = (req, res, next) => {
	res.render("admin/Organizer-requests", { title: "Organizer Requests" });
};
exports.getCarRequests = (req, res, next) => {
	res.render("admin/Car-requests", { title: "Car Requests" });
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
					req.session.admin = admin;
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
		if (admin.email != newAdmin.email) {
			admin.email = newAdmin.email;
		}
		if (admin.password != newAdmin.password) {
			admin.password = newAdmin.password;
		}
		req.session.admin = {email: admin.email, password: admin.password};
		admin.save();
		return res.redirect("dashboard");
	})
	.catch(err => {console.log(err)})
};
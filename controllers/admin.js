const Admin = require('../models/admin');
const bcrypt = require('bcrypt');

exports.getDashboard = (req, res, next) => {
	res.render("admin/dashboard", { title: "Dashboard" });
};
exports.getProfile = (req, res, next) => {
	res.render("profile/admin-profile", { title: "Admin Profile" });
};
exports.getOrganizerRequests = (req, res, next) => {
	res.render("admin/admin-requests", { title: "Organizer Requests" });
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
				return res.redirect("admin-signin");
			}
			bcrypt.compare(admin.password, adminDoc.password)
			.then(doMatch => {
				if (doMatch) {
					req.session.isAdmin = true;
					req.session.admin = admin;
					return req.session.save(err => {
						console.log(err);
						res.redirect("dashboard");
					})
				}
				req.flash('error', 'Invalid email or password');
				res.redirect("admin-signin");
			})
			.catch(err => {
				console.log(err);
				res.redirect("admin-signin");
			});
		})
};

exports.postAdminLogout = (req, res, next) => {
	req.session.destroy(err => {
		console.log(err);
		res.redirect("admin-signin");
	})
}
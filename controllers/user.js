const Bidder = require("../models/bidder");
const { validationResult } = require("express-validator");

exports.getUserProfile = (req, res, next) => {
	res.render("profile/user-profile", { title: "User Profile", errorMessage: req.flash('error')}); // must query car from database , cars won 
};

exports.postUpdateUser = (req, res, next) => {
	const email = req.session.user.email;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.array());
		return res.status(422).render("profile/user-profile", { 
			title: "User Profile",
			errorMessage: errors.array()[0].msg,
			});
	}

	Bidder.findOne({email: email})
	.then(user => {
		const newUser = req.body.user;
		if (user.firstName != newUser.firstName) {
			user.firstName = newUser.firstName;
		}
		if (user.lastName != newUser.lastName) {
			user.lastName = newUser.lastName
		}
		if (user.email != newUser.email) {
			user.email = newUser.email;
		}
		if (user.city != newUser.city) {
			user.city = newUser.city;
		}
		if (user.phoneNumber != newUser.phoneNumber) {
			user.phoneNumber = newUser.phoneNumber
		}
		if (user.password != newUser.password) {
			user.password = newUser.password;
		}
		req.session.user = {email: user.email, password: user.password};
		user.save();
		return res.redirect("/user-profile");
	})
	.catch(err => {console.log(err)})
};
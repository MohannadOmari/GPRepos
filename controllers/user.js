const Bidder = require("../models/bidder");
const { validationResult } = require("express-validator");

exports.getUserProfile = async (req, res, next) => {
	const user = await Bidder.findById(req.session.user._id);
	res.render("profile/user-profile", { title: "User Profile", errorMessage: req.flash('error'), user}); // must query car from database , cars won 
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
		user.firstName = newUser.firstName;
		user.lastName = newUser.lastName;
		user.email = newUser.email;
		user.city = newUser.city;
		user.phoneNumber = newUser.phoneNumber;
		user.password = newUser.password;
		
		req.session.user = user;
		user.save();
		return res.redirect("/user-profile");
	})
	.catch(err => {console.log(err)})
};
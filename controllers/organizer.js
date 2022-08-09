const Organizer = require("../models/organizer");
const { validationResult } = require("express-validator");

exports.getOrganizerProfile = (req, res, next) => {
	res.render("profile/organizer-profile", { title: "organizer Profile", errorMessage: req.flash('error')});
};

exports.postUpdateOrganizer = (req, res, next) => {
	const email = req.session.org.email;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.array());
		return res.status(422).render("profile/organizer-profile", { 
			title: "organizer Profile",
			errorMessage: errors.array()[0].msg,
			});
	}

	Organizer.findOne({email: email})
	.then(org => {
		const newOrg = req.body.org;
		if (org.firstName != newOrg.firstName) {
			org.firstName = newOrg.firstName;
		}
		if (org.lastName != newOrg.lastName) {
			org.lastName = newOrg.lastName
		}
		if (org.email != newOrg.email) {
			org.email = newOrg.email;
		}
		if (org.phoneNumber != newOrg.phoneNumber) {
			org.phoneNumber = newOrg.phoneNumber
		}
		if (org.password != newOrg.password) {
			org.password = newOrg.password;
		}
		req.session.org = {email: org.email, password: org.password};
		org.save();
		return res.redirect("/organizer-profile");
	})
	.catch(err => {console.log(err)})
};
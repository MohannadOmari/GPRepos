const Organizer = require("../models/organizer");
const { validationResult } = require("express-validator");

exports.getOrganizerProfile = async (req, res, next) => {
	const org = await Organizer.findById(req.session.org._id);
	res.render("profile/organizer-profile", { title: "organizer Profile", errorMessage: req.flash('error'), org});
};

exports.postUpdateOrganizer = async (req, res, next) => {
	const email = req.session.org.email;
	const errors = validationResult(req);
	org = await Organizer.findOne({email: email})
	if (!errors.isEmpty()) {
		console.log(errors.array());
		return res.status(422).render("profile/organizer-profile", { 
			title: "organizer Profile",
			errorMessage: errors.array()[0].msg,
			org
			});
	}

	await Organizer.findOne({email: email})
	.then(org => {
		const newOrg = req.body.org;
		org.firstName = newOrg.firstName;
		org.lastName = newOrg.lastName;
		org.email = newOrg.email;
		org.phoneNumber = newOrg.phoneNumber;
		org.password = newOrg.password;

		req.session.org = org;
		org.save();
		return res.redirect("/organizer-profile");
	})
	.catch(err => {console.log(err)})
};
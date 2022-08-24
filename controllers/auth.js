const Bidder = require("../models/bidder");
const Organizer = require("../models/organizer");
const bcrypt = require('bcrypt'); //API for hashing data
const { validationResult } = require("express-validator"); //for validation

exports.getUserSignup = (req, res, next) => {
	res.render("auth/user-signup", { 
	title: "Sign Up",
	errorMessage: req.flash('error'),
	oldInput: {
		firstName: '',
		lastName: '',
		email: '',
		phoneNumber: ''
	}
	});
};

exports.getUserSignin = (req, res, next) => {
	res.render("auth/user-signin", {
		title: "Sign In",
		errorMessage: req.flash('error')
	});
};

exports.getOrganizerSignup = (req, res, next) => {
	res.render("auth/organizer-signup", { 
		title: "Sign Up", 
		errorMessage: req.flash('error'),
		oldInput: {
			firstName: '',
			lastName: '',
			email: '',
			phoneNumber: ''
		}
	});
};

exports.getOrganizerSignin = (req, res, next) => {
	res.render("auth/organizer-signin", { 
		title: "Sign In", 
		errorMessage: req.flash('error')
	});
};

// JSON => JavaScript Object Notation
// creates Bidder and saves him to the database
exports.postUserSignup = ('/', (req, res) => {
	const user = req.body.user;
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.array());
		return res.status(422).render("auth/user-signup", { 
			title: "Sign Up",
			errorMessage: errors.array()[0].msg,
			oldInput: {
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				phoneNumber: user.phoneNumber,
			}
			});
	}

	Bidder.findOne({email: user.email})
	.then(async userDoc => {
		if (userDoc) {
			req.flash(
				'error',
				'Email already exists'
			);
			return res.redirect("/user-signin");
		}
		const salt = await bcrypt.genSalt(10);
		const password = await bcrypt.hash(req.body.user.password, salt);
		const bidder = new Bidder(user);
		bidder.password = password;
		return bidder.save();
	})
	.then(result => {
		res.redirect("/user-signin");
	})
	.catch(err => {
		console.log(err);
	});
	
});

// creates Organizer and saves to the database
exports.postOrganizerSignup = (req, res) => {
	const org = req.body.org;
	console.log(org);
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors.array());
		return res.status(422).render("auth/organizer-signup", { 
			title: "Sign Up",
			errorMessage: errors.array()[0].msg,
			oldInput: {
				firstName: org.firstName,
				lastName: org.lastName,
				email: org.email,
				phoneNumber: org.phoneNumber,
			}
			});
	}
	Organizer.findOne({email: org.email})
	.then(async orgDoc => {
		if (orgDoc) {
			req.flash(
				'error',
				'Email already exists'
			);
			return res.redirect("/organizer-signin");
		}
		const salt = await bcrypt.genSalt(10);
		const password = await bcrypt.hash(req.body.org.password, salt);
		const organizer = new Organizer(org);
		organizer.password = password;
		organizer.credentials.url = req.file.path;
		organizer.credentials.name = req.file.filename;
		return organizer.save();
	})
	.then(result => {
		res.redirect("/organizer-signin");
	})
	.catch(err => {
		console.log(err);
	});

};

// bidder signin function
exports.postUserSignin = (req, res) => {
	const user= req.body.user;

	Bidder.findOne({email: user.email})
		.then(userDoc => {
			if (!userDoc) {
				req.flash('error', 'Invalid email or password');
				return res.redirect("/user-signin");
			}
			bcrypt.compare(user.password, userDoc.password)
			.then(doMatch => {
				if (doMatch) {
					req.session.isBidder = true;
					req.session.isLoggedIn = true;
					req.session.user = userDoc;
					return req.session.save(err => {
						console.log(err);
						res.redirect("/auction");
					})
				}
				req.flash('error', 'Invalid email or password');
				res.redirect("/user-signin");
			})
			.catch(err => {
				console.log(err);
				res.redirect("user-signin");
			});
		})
};

// organizer signin function
exports.postOrganizerSignin = (req, res) => {
	const org = req.body.org;

	Organizer.findOne({email: org.email})
		.then(orgDoc => {
			if (!orgDoc) {
				req.flash('error', 'Invalid email or password');
				return res.redirect("/organizer-signin");
			}
			bcrypt.compare(org.password, orgDoc.password)
			.then(doMatch => {
				if (doMatch) {
					if(orgDoc.status !== "Approved") {
						req.flash('error', 'This Organizer is not approved yet');
						return res.redirect("/organizer-signin");
					}
					req.session.isOrganizer = true;
					req.session.isLoggedIn = true;
					req.session.org = orgDoc;
					return req.session.save(err => {
						console.log(err);
						res.redirect("/auction");
					});
				}
				req.flash('error', 'Invalid email or password');
				console.log("I am password");
				res.redirect("/organizer-signin");
			})
			.catch(err => {
				console.log(err);
				res.redirect("/organizer-signin");
			});
		})

};


exports.postLogout = (req,res) => {
	req.session.destroy(err => {
		console.log(err);
		res.redirect("/");
	})
};